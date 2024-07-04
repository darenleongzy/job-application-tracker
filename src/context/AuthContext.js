// AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('jwtToken'));

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        setIsAuthenticated(!!token);
    }, [isAuthenticated]);

    return (
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};