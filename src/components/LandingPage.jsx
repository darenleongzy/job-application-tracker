import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const HeroSection = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    padding: theme.spacing(8, 0),
    marginBottom: theme.spacing(4),
}));

const FeatureSection = styled('div')(({ theme }) => ({
    margin: theme.spacing(4, 0),
}));

const Feature = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

const Footer = styled('footer')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
}));

const LandingPage = () => {
    return (
        <Container maxWidth="lg">
            <HeroSection elevation={0}>
                <Container>
                    <Typography variant="h2" align="center" gutterBottom>
                        Job Application Tracker
                    </Typography>
                    <Typography variant="h5" align="center" paragraph>
                        Keep track of all your job applications in one place.
                    </Typography>
                    <Box textAlign="center">
                        <Button variant="contained" color="secondary">
                            Get Started
                        </Button>
                    </Box>
                </Container>
            </HeroSection>
            <FeatureSection>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={4}>
                        <Feature>
                            <Typography variant="h5" component="h3">
                                Organize Applications
                            </Typography>
                            <Typography>
                                Easily organize and track the status of your applications.
                            </Typography>
                        </Feature>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Feature>
                            <Typography variant="h5" component="h3">
                                Dashboard Overview
                            </Typography>
                            <Typography>
                                Get a quick overview of your application statuses on your personalized dashboard.
                            </Typography>
                        </Feature>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Feature>
                            <Typography variant="h5" component="h3">
                                Reminders & Alerts
                            </Typography>
                            <Typography>
                                Set reminders for application deadlines and interviews.
                            </Typography>
                        </Feature>
                    </Grid>
                </Grid>
            </FeatureSection>
            <Footer>
                <Typography variant="body1" align="center">
                    Contact us at info@jobtracker.com
                </Typography>
            </Footer>
        </Container>
    );
};

export default LandingPage;