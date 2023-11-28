import { Box, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const ManageContest = () => {

    const { pages } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [contests, setContests] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/allContest')
            .then(res => res.json())
            .then(data => setContests(data))
    }, [])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    return (
        <div>
            <Grid container >
                <Grid item md={2} style={{ position: 'fixed' }}>
                    <Box sx={{ width: '100%', height: '97vh', bgcolor: 'orange' }} >
                        <nav aria-label="main mailbox folders">
                            <List >
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/manageUsers')}>
                                        <ListItemText primary="Manage Users" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/manageContest')}>
                                        <ListItemText primary="Manage Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                            </List>
                        </nav>
                        <Divider />
                        <nav aria-label="secondary mailbox folders">
                            <List>
                                {
                                    pages.map((page) =>
                                    (
                                        <ListItem key={page.name}>
                                            <ListItemButton onClick={() => handleMenu(page.path)}>
                                                <ListItemText primary={page.name} style={{ textAlign: "center" }} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        </nav>
                    </Box>
                </Grid>
                <Grid item md={10} sx={{ mt: 5, mx: 'auto' }}>
                    <Typography variant='h3' textAlign="center">
                        All Users
                    </Typography>
                    <TableContainer component={Paper}>
                        <Table sx={{ width: '80%', margin: 'auto' }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">Id</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Image</TableCell>
                                    <TableCell align="center">Details</TableCell>
                                    <TableCell align="center">Status</TableCell>
                                    <TableCell align="center">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {contests.map((contest) => (
                                    <TableRow
                                        key={contest._id}
                                    >
                                        <TableCell component="th" scope="row">{contest?._id}</TableCell>
                                        <TableCell align="center">{contest?.name}</TableCell>
                                        <TableCell align="center">
                                            <img
                                                src={contest?.image}
                                                alt='contest'
                                                style={{ width: '250px', height: '100px' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{contest?.details}</TableCell>
                                        <TableCell align="center">{contest?.status}</TableCell>
                                        <TableCell align="center">Delete</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </div>
    );
};

export default ManageContest;