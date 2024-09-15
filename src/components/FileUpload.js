import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Container } from '@mui/material';
import { toast } from 'react-toastify';
let BASE_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:8000/';

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
            await axios.post(`${BASE_URL}upload/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            toast.success('File uploaded successfully, processing in the background.');
        } catch (error) {
            console.error('Error uploading file:', error);
            let the_error ='Failed to upload the file. Please try again.'
            if (error.response && error.response.data) {
                if (error.response.data.file) {
                    the_error = error.response.data.file[0];
                }

            }
            toast.error(the_error);
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
