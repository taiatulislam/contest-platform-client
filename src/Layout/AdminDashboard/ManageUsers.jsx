import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Grid, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const ManageUsers = () => {

    const { pages } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [allUser, setAllUser] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/alluser')
            .then(res => res.json())
            .then(data => setAllUser(data))
    }, [allUser])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const handleRole = (email) => {

        Swal.fire({
            title: "Select role to apply",
            showDenyButton: true,
            showCancelButton: true,
            cancelButtonText: "user",
            confirmButtonText: "admin",
            denyButtonText: "creator"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Admin role apply");
                const user = {
                    email: email,
                    role: 'admin'
                }
                fetch('http://localhost:5000/allUser', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            } else if (result.isDenied) {
                Swal.fire("Creator role apply");
                const role = {
                    email: email,
                    role: 'creator'
                }
                fetch('http://localhost:5000/alluser', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(role)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            }
            else if (result.isDismissed) {
                Swal.fire("User role apply");
                const role = {
                    email: email,
                    role: 'user'
                }
                fetch('http://localhost:5000/alluser', {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(role)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                    })
            }
        });
    }

    return (
        <div>
            <Grid container>
                <Grid item md={2} style={{ position: 'fixed' }}>
                    <Box sx={{ width: '100%', height: '97vh', bgcolor: 'orange' }}>
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
                                    <TableCell align="center">Email</TableCell>
                                    <TableCell align="center">Name</TableCell>
                                    <TableCell align="center">Role</TableCell>
                                    <TableCell align="center">Update Role</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allUser.map((user) => (
                                    <TableRow
                                        key={user._id}
                                    >
                                        <TableCell component="th" scope="row">{user?._id}</TableCell>
                                        <TableCell align="center">{user?.email}</TableCell>
                                        <TableCell align="center">{user?.displayName}</TableCell>
                                        <TableCell align="center">{user?.role}</TableCell>
                                        <TableCell align="center"><Button onClick={() => handleRole(user?.email)} variant="outlined" sx={{ textTransform: "none" }}>Role</Button></TableCell>
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

export default ManageUsers;