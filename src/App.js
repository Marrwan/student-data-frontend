import React from 'react';
import FileUpload from './components/FileUpload';
import StudentList from './components/StudentList';
import { Container, Typography } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'



function App() {
    return (
        <Container>
            <Typography variant="h4" sx={{ marginBottom: '20px' }}>
                Student Election Data System
            </Typography>
            <FileUpload />
            <Typography variant="h5" sx={{ marginTop: '40px' }}>
                Uploaded Students
            </Typography>
            <StudentList />
            <ToastContainer />
        </Container>
    );
}

export default App;
