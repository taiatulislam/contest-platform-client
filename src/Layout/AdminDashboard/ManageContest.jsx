import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import Swal from 'sweetalert2'

const ManageContest = () => {

    const { pages } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const [contests, setContests] = useState([])

    useEffect(() => {
        fetch('https://contest-platform-server-rho.vercel.app/allContest')
            .then(res => res.json())
            .then(data => setContests(data))
    }, [contests])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const handleAccept = (id) => {
        const user = {
            id: id,
            status: 'accept'
        }
        fetch('https://contest-platform-server-rho.vercel.app/allContest', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success',
                        text: `Approved.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    const handleDelete = (id) => {
        fetch(`https://contest-platform-server-rho.vercel.app/allContest/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.deletedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Contest delete',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                }
            })
    }

    return (
        <div>
            <Grid container >
                <Grid item xs={12} sm={2}>
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
                <Grid item xs={12} sm={10} sx={{ mt: 5, mx: 'auto' }}>
                    <Typography variant='h3' textAlign="center">
                        All Contest
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
                                    <TableCell align="center">Accept</TableCell>
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
                                                style={{ width: '150px', height: '100px' }}
                                            />
                                        </TableCell>
                                        <TableCell align="center">{contest?.details.slice(0, 80)}</TableCell>
                                        <TableCell align="center">{contest?.status}</TableCell>
                                        <TableCell align="center">
                                            {
                                                contest?.status === 'accept' ? <Button disabled variant="outlined" sx={{ textTransform: "none" }}>Accept</Button> :
                                                    <Button onClick={() => handleAccept(contest._id)} variant="outlined" sx={{ textTransform: "none" }}>Accept</Button>
                                            }
                                        </TableCell>
                                        <TableCell onClick={() => handleDelete(contest._id)} align="center"><Button variant="outlined" color="error" sx={{ textTransform: "none" }}>Delete</Button></TableCell>
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