// context/JobContext.js
import React, { createContext, useState } from 'react';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
    const [applications, setApplications] = useState([]);

    const addApplication = (application) => {
        setApplications([...applications, application]);
    };

    const initiateApplications = (applications) => {
        setApplications(applications);
    };

    return (
        <ApplicationContext.Provider value={{ applications, addApplication, initiateApplications }}>
            {children}
        </ApplicationContext.Provider>
    );
};