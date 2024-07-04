import React, { useState, useEffect } from 'react';
import { Typography, Button, Card, CardContent, Grid, Modal, Box } from '@mui/material';
import AddApplicationForm from './AddApplicationForm';
import api from '../api/api'; // Adjust the path as necessary
// JobApplication component for individual job applications using MUI Card
const JobApplication = ({ application }) => {
    return (
        <Card variant="outlined" sx={{ marginBottom: 2, elevation: 4, backgroundColor: '#f0f0f0' }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    {application.company}
                </Typography>
                <Typography color="textSecondary">
                    {application.position}
                </Typography>
                <Typography component="p">
                    Status: {application.status}
                </Typography>
                <Typography component="p">
                    Applied on: {application.dateApplied}
                </Typography>
            </CardContent>
        </Card>
    );
};

// JobApplicationsList component to display all job applications using MUI
const JobApplicationsList = () => {
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);



    useEffect(() => {
        const fetchApplications = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/api/applications');
                setApplications(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchApplications();
    }, []); //v

    // Function to add a new application to the state
    const addNewApplication = (newApplication) => {
        setApplications(prevApplications => [...prevApplications, newApplication]);
    };

    // Modal style
    const modalStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: '0' }}> {/* Remove padding here */}
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid item>
                    <Typography variant="h4" gutterBottom>
                        Job Applications
                    </Typography>
                    <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
                        Add New Job
                    </Button>
                    <Modal
                        open={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={modalStyle}>
                            <AddApplicationForm handleClose={() => setIsModalOpen(false)} addNewApplication={addNewApplication} />
                        </Box>
                    </Modal>
                </Grid>
                <Grid item>
                    <div>
                        {applications.map(application => (
                            <JobApplication key={application._id} application={application} />
                        ))}
                    </div>
                </Grid>
            </Grid>
        </div>

    );
};

export default JobApplicationsList;