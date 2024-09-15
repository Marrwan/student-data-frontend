import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';
import { toast } from 'react-toastify';

const FileUpload = () => {
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            await axios.post('http://localhost:8000/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('File uploaded successfully, processing in the background.');
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Failed to upload the file. Please try again.');
        }
    };

    return (
        <Container>
            <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
                <TextField
                    type="file"
                    onChange={handleFileChange}
                    fullWidth
                    variant="outlined"
                    sx={{ marginBottom: '10px' }}
                />
                <Button variant="contained" color="primary" type="submit" fullWidth>
                    Upload File
                </Button>
            </form>
        </Container>
    );
};

export default FileUpload;
