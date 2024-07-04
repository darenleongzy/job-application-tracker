import React, { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import api from '../api/api'; // Adjust the path as necessary
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { Button, CircularProgress, Container, Typography } from '@mui/material';

const LoginPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false); // Step 1: Add loading state
    const [user, setUser] = useState(null); // State to hold decoded user data

    useEffect(() => {
        const jwtToken = localStorage.getItem('jwtToken');
        if (jwtToken) {
            const decoded = jwtDecode(jwtToken);
            setUser(decoded); // Set decoded user data
        }
    }, []);

    const onSuccess = async (res) => {
        setIsLoading(true); // Step 2: Set loading to true before API call
        try {
            const response = await api.post('/api/login', { token: res.credential });
            const jwtToken = response.data.token;
            // Save the JWT token to local storage
            const decoded = jwtDecode(jwtToken);
            setUser(decoded);
            localStorage.setItem('jwtToken', jwtToken);
            navigate('/home');
        } catch (error) {
            console.error('Login Failed:', error);
        } finally {
            setIsLoading(false); // Step 3: Set loading to false after API call
        }

    };

    const logOut = () => {
        googleLogout();
        localStorage.removeItem('jwtToken');
        setUser(null); // Reset user state
    };

    return (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
            {user ? (
                <div>
                    <Typography variant="h4" gutterBottom>Welcome, {user.name}!</Typography>
                    <Button variant="contained" color="secondary" onClick={logOut}>Logout</Button>
                </div>
            ) : (
                isLoading ? <CircularProgress /> : (
                    <div>
                        <Typography variant="h5" gutterBottom>Sign Up or Login with Google</Typography>
                        <GoogleLogin
                            clientId={`${process.env.REACT_APP_CLIENT_ID}`}
                            onSuccess={onSuccess}
                            render={renderProps => (
                                <Button variant="contained" color="primary" onClick={renderProps.onClick} disabled={renderProps.disabled}>
                                    Login with Google
                                </Button>
                            )}
                        />
                    </div>
                )
            )}
        </Container>
    );
};

export default LoginPage;