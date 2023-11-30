import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'

const CreatedContest = () => {

    const { pages, user } = React.useContext(AuthContext);
    const [contests, setContests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/allContest`)
            .then(res => res.json())
            .then(data => {
                setContests(data.filter(contest =>
                    contest?.creator === user?.email))
            })
    }, [])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const handleParticipants = (id) => {
        navigate(`/participants/${id}`)
    }

    const handleEdit = (id) => {
        navigate(`/editContest/${id}`)
    }

    const handleDelete = (id) => {
        fetch(`http://localhost:5000/allContest/${id}`, {
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
            <Grid container>
                <Grid item md={2}>
                    <Box sx={{ width: '100%', height: '97vh', bgcolor: 'orange' }}>
                        <nav aria-label="main mailbox folders">
                            <List >
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/addContest')}>
                                        <ListItemText primary="Add Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/createdContest')}>
                                        <ListItemText primary="My Created Contest" style={{ textAlign: "center" }} />
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
                <Grid item md={10} sx={{ mt: 5 }}>
                    <Typography variant='h3' textAlign="center">
                        My Created Contest
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
                                    <TableCell align="center">Participants</TableCell>
                                    <TableCell align="center">Edit</TableCell>
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
                                        <TableCell align="center">{contest?.category}</TableCell>
                                        <TableCell align="center">{contest?.status}</TableCell>
                                        <TableCell align="center"><Button onClick={() => handleParticipants(contest?._id)} variant="outlined" sx={{ textTransform: "none" }}>Participant</Button></TableCell>
                                        <TableCell align="center">
                                            {
                                                contest?.status === 'accept' ? <Button disabled color="success" variant="outlined" sx={{ textTransform: "none" }}>Edit</Button> :
                                                    <Button onClick={() => handleEdit(contest?._id)} color="success" variant="outlined" sx={{ textTransform: "none" }}>Edit</Button>
                                            }
                                        </TableCell>
                                        <TableCell align="center">
                                            {
                                                contest?.status === 'accept' ? <Button disabled color="error" variant="outlined" sx={{ textTransform: "none" }}>Delete</Button> :
                                                    <Button onClick={() => handleDelete(contest?._id)} color="error" variant="outlined" sx={{ textTransform: "none" }}>Delete</Button>
                                            }
                                        </TableCell>
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

export default CreatedContest;