import React from 'react';
import { createTheme, ThemeProvider, CssBaseline } from '@mui/material';
import App from './App'; // Assuming the provided code is in App.js

// Define a dark green and modern theme
const darkGreenModernTheme = createTheme({
    palette: {
        mode: 'dark', // Enable dark mode for a modern look
        primary: {
            main: '#43a047', // A modern shade of dark green
        },
        secondary: {
            main: '#1de9b6', // A vibrant, modern contrast color
        },
        background: {
            default: '#2e7d32', // Dark green background for a cohesive look
            paper: '#4caf50', // Slightly lighter for paper-based components
        },
    },
    typography: {
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        h1: {
            fontWeight: 300,
            fontSize: '6rem',
            letterSpacing: '-0.01562em',
        },
        h2: {
            fontWeight: 300,
            fontSize: '3.75rem',
            letterSpacing: '-0.00833em',
        },
        // Continue customizing typography for other variants as needed
    },
    components: {
        // Customize specific components for a modern look
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 8, // Rounded buttons for a modern look
                },
            },
        },
        // Add more component customizations here
    },
});

function ThemedApp() {
    return (
        <ThemeProvider theme={darkGreenModernTheme}>
            <CssBaseline /> {/* Ensures baseline styles are applied correctly */}
            <App />
        </ThemeProvider>
    );
}

export default ThemedApp;