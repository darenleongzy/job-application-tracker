import React, { createContext, useState } from 'react';

// Create the UserContext
export const UserContext = createContext();

// Create a UserProvider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Define a login function to set the user
    const login = (userData) => {
        setUser(userData);
    };

    // Define a logout function to clear the user
    const logout = () => {
        setUser(null);
    };

    // Pass the user and login/logout functions to the context provider
    return (
        <UserContext.Provider value={{ user, setUser, login, logout }}>
            {children}
        </UserContext.Provider>
    );
};