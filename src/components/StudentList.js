import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField, Button, Pagination, Container } from '@mui/material';
import { toast } from 'react-toastify';
let BASE_URL = process.env.REACT_APP_BASE_URL;

console.log({BASE_URL})
const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [department, setDepartment] = useState('');

    const fetchStudents = async (page, department = '') => {
        try {
            const response = await axios.get(`http://localhost:8000/students/?page=${page}&department=${department}`);
            setStudents(response.data.results);
            setTotalPages(Math.ceil(response.data.count / 10));
        } catch (error) {
            console.error('Error fetching students:', error);
            toast.error('Failed to fetch students. Please try again.');
        }
    };

    useEffect(() => {
        fetchStudents(page, department);
    }, [page, department]);

    const handleDepartmentChange = (e) => {
        setDepartment(e.target.value);
    };

    const handleSearch = () => {
        setPage(1);
        fetchStudents(1, department);
    };

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    return (
        <Container>
            <TextField
                label="Department"
                variant="outlined"
                value={department}
                onChange={handleDepartmentChange}
                sx={{ marginBottom: '10px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                sx={{ marginBottom: '20px', marginLeft: '10px' }}
            >
                Search
            </Button>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Student ID</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Email</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {students.map((student) => (
                            <TableRow key={student.id}>
                                <TableCell>{student.name}</TableCell>
                                <TableCell>{student.student_id}</TableCell>
                                <TableCell>{student.department}</TableCell>
                                <TableCell>{student.email}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                sx={{ marginTop: '20px' }}
            />
        </Container>
    );
};

export default StudentList;
