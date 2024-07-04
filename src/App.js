// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JobApplicationsList from './components/JobApplicationsList';
import AddApplicationForm from './components/AddApplicationForm';
import { ApplicationProvider } from './context/ApplicationContext';
// import LoginPage from './components/LoginPage';
import { UserProvider } from './context/UserContext';
import PrivateRoute from './PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Index from './views/Index';
import SignIn from './views/SignIn';
import Register from './views/Register';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <ApplicationProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/home" element={<PrivateRoute><JobApplicationsList /></PrivateRoute>} />
              <Route path="/add" element={<PrivateRoute><AddApplicationForm /></PrivateRoute>} />
              <Route path="/login" element={<SignIn />} />
              <Route path="/register" element={<Register />} />
              {/* <Route path="/details/:id" element={<PrivateRoute><JobDetails /></PrivateRoute>} /> */}
            </Routes>
          </Router>
        </ApplicationProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;