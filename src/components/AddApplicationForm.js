import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent, TextField, Button, MenuItem, FormControl, InputLabel, Select, DialogActions } from '@mui/material';
import JobApplicationFormData from '../models/JobApplicationFormData';
import api from '../api/api'; // Adjust the path as necessary

const AddApplicationForm = ({ handleClose, addNewApplication }) => {
    const [formData, setFormData] = useState(JobApplicationFormData);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/api/applications', formData);
            addNewApplication(response.data);
            handleClose();
            navigate('/');
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };


    return (
        <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Add Job Application</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} noValidate autoComplete="off">
                    <TextField
                        fullWidth
                        label="Company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <TextField
                        fullWidth
                        label="Position"
                        name="position"
                        value={formData.position}
                        onChange={handleChange}
                        margin="normal"
                        required
                    />
                    <FormControl fullWidth margin="normal" required>
                        <InputLabel>Status</InputLabel>
                        <Select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            label="Status"
                        >
                            <MenuItem value="applied">Applied</MenuItem>
                            <MenuItem value="recruiter screen">Interview</MenuItem>
                            <MenuItem value="phone screen">Phone screen</MenuItem>
                            <MenuItem value="technical 1">Technical 1</MenuItem>
                            <MenuItem value="technical 2">Technical 2</MenuItem>
                            <MenuItem value="technical 3">Technical 3</MenuItem>
                            <MenuItem value="design 1">Design 1</MenuItem>
                            <MenuItem value="design 2">Design 2</MenuItem>
                            <MenuItem value="hiring manager screen">Hiring Manager Round</MenuItem>
                            <MenuItem value="final interview">Final Interview</MenuItem>
                            <MenuItem value="offer">Offer</MenuItem>
                            <MenuItem value="rejected">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        fullWidth
                        label="Date Applied"
                        type="date"
                        name="dateApplied"
                        value={formData.dateApplied}
                        onChange={handleChange}
                        margin="normal"
                        InputLabelProps={{
                            shrink: true, // This ensures the label is always in the shrunk state
                        }}
                    />
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
    );
};
export default AddApplicationForm;