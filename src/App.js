// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationsList from './components/JobApplicationsList';
import AddApplicationForm from './components/AddApplicationForm';
import { ApplicationProvider } from './context/ApplicationContext';
import LoginPage from './components/LoginPage';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import CustomAppBar from './components/AppBar'; // Import the AppBar component
import LandingPage from './components/LandingPage';


function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ApplicationProvider>
          <Router>
            <CustomAppBar /> {/* Include the AppBar component here */}
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<PrivateRoute><JobApplicationsList /></PrivateRoute>} />
              <Route path="/add" element={<PrivateRoute><AddApplicationForm /></PrivateRoute>} />
              <Route path="/login" element={<LoginPage />} />
              {/* Uncomment and adjust the following line if JobDetails component is implemented */}
              {/* <Route path="/details/:id" element={<PrivateRoute><JobDetails /></PrivateRoute>} /> */}
            </Routes>
          </Router>
        </ApplicationProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;