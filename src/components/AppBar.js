// src/components/AppBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom'; // Step 1: Import useNavigate from react-router-dom
import { Box } from '@mui/system';

const CustomAppBar = () => {
    const navigate = useNavigate(); // Step 2: Import useNavigate from react-router-dom
    return (
        <AppBar position="static" sx={{ bgcolor: '#004d40', margin: '0', width: '100%' }}> {/* Adjusted AppBar style */}
            <Toolbar sx={{ justifyContent: 'space-between' }}>
                <Box sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/home')}>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontFamily: 'Arial, sans-serif', fontWeight: 'bold' }}>
                        Job Applications
                    </Typography>
                </Box>
                <IconButton
                    size="large"
                    edge="end"
                    color="inherit"
                    aria-label="login"
                    sx={{ marginRight: '20px' }}
                    onClick={() => navigate('/login')} // Step 3: Add onClick event to navigate
                >
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default CustomAppBar;