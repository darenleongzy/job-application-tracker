const express = require('express');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const e = require('express');
const bcrypt = require('bcrypt');

require('dotenv').config();

const app = express();
const PORT = 3001;
const dbName = process.env.DB_NAME;
const dbUri = process.env.DB_URI;
const applicationCollection = process.env.APPLICATION_COLLECTION_NAME;
const usersCollection = process.env.USERS_COLLECTION_NAME;
const jwtSecret = process.env.JWT_SECRET;
const googleClientId = process.env.GOOGLE_CLIENT_ID;


app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());

let db;
let applications;
let users;

const client = new MongoClient(dbUri, {
    serverApi: {
        version: "1",
        strict: true,
        deprecationErrors: true,
    }
});
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Define the verifyToken function
async function verifyToken(req) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Authorization token is missing or invalid');
    }
    const token = authHeader.substring(7, authHeader.length);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (error) {
        throw new Error('Failed to verify token');
    }
}
async function run() {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
    db = client.db(dbName);
    applications = db.collection(applicationCollection);
    users = db.collection(usersCollection);


}
run().catch(console.dir);

process.on('SIGINT', async () => {
    await client.close();
    console.log("MongoDB connection closed");
    process.exit();
});
// POST endpoint to submit a new application
app.post('/api/applications', async (req, res) => {
    try {
        const decoded = await verifyToken(req);
        const userId = decoded.userId;
        const { position, company, status, dateApplied } = req.body;
        if (!position || !company || !status || !dateApplied) {
            return res.status(400).send('Missing required fields');
        }
        const newApplication = {
            _id: new ObjectId(),
            userId: userId, // Reference to User Collection
            position: position,
            company: company,
            status: status,
            dateApplied: dateApplied,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        await applications.insertOne(newApplication);
        res.status(201).send(newApplication);
    } catch (error) {
        // Handle errors, for example, token expiration or verification failure
        console.error('Error verifying token:', error);
        return res.status(401).send('Invalid token');
    }
});

// GET endpoint to fetch all applications
app.get('/api/applications', async (req, res) => {
    // Extract the Authorization header
    try {
        const decoded = await verifyToken(req);
        const userId = decoded.userId;
        // Use userId for fetching applications or other operations
        const allApplications = await applications.find({ userId: userId }).toArray();
        res.status(200).json(allApplications);
    } catch (error) {
        // Handle errors, for example, token expiration or verification failure
        console.error('Error verifying token:', error);
        return res.status(401).send('Invalid token');
    }
});

// POST endpoint to register a new user. This endpoint is used for email/password registration. Hash the password before storing it in the database to ensure security.
app.post('/api/register', async (req, res) => {
    const { email, password, firstName, lastName } = req.body;
    console.log(email, password, firstName, lastName);
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).send('Email, password, and names are required');
    }
    // Check if user already exists
    let user = await users.findOne({ email: email });
    if (user) {
        return res.status(400).send('User already exists');
    }
    // Hash the password before storing it in the database
    const hashedPassword = bcrypt.hashSync(password, 10);
    user = await users.insertOne({
        _id: new ObjectId(),
        email: email,
        password: hashedPassword,
        name: firstName + ' ' + lastName,
        createdAt: new Date(),
        updatedAt: new Date()
    });
    const userToken = jwt.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '24h' });
    res.status(200).json({ token: userToken });
});

//Post endpoint to login user
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    const user = await users.findOne({ email: email });
    if (!user) {
        return res.status(404).send('User not found');
    }
    // Compare the hashed password with the password provided by the user
    if (bcrypt.compareSync(password, user.password)) {
        // Generate JWT token
        const userToken = jwt.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '24h' });
        res.status(200).json({ token: userToken });
    }
    return res.status(401).send('Invalid credentials');
});



app.post('/api/googlelogin', async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(400).send('Token is required');
    }
    try {
        // Verify Google token and extract user info
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: googleClientId,  // Specify the CLIENT_ID of the app that accesses the backend
        });
        const payload = ticket.getPayload();
        const userid = payload['sub']; // Google's user ID

        // Check if user exists in your database
        let user = await users.findOne({ googleId: userid });
        if (!user) {
            // If user doesn't exist, create a new one
            user = await users.insertOne({
                _id: new ObjectId(),
                googleId: userid,
                email: payload['email'],
                name: payload['name'],
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        }

        // Generate JWT token
        const userToken = jwt.sign({ userId: user._id, name: user.name, email: user.email }, jwtSecret, { expiresIn: '24h' });

        // Return the JWT token to the client
        res.status(200).json({ token: userToken });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error verifying Google token');
    }
});

// Basic error handling
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

