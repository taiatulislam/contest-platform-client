// import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';

const Participants = () => {

    const { pages } = React.useContext(AuthContext);
    const contest = useLoaderData();
    const navigate = useNavigate();

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const handleWon = () => {
        // fetch(`https://contest-platform-server-rho.vercel.app/editContest/${contest?._id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'content-type': 'application/json'
        //     },
        //     body: JSON.stringify(contest)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data)
        //         if (data.modifiedCount > 0) {
        //             Swal.fire({
        //                 title: 'Success!',
        //                 text: 'Contest Updated Successfully',
        //                 icon: 'success',
        //                 confirmButtonText: 'OK'
        //             })
        //         }
        //     })
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
                                        <ListItem key={page?.name}>
                                            <ListItemButton onClick={() => handleMenu(page?.path)}>
                                                <ListItemText primary={page?.name} style={{ textAlign: "center" }} />
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
                        Contest participants
                    </Typography>
                    {
                        contest?.participants?.length ?
                            <TableContainer component={Paper}>
                                <Table sx={{ width: '80%', margin: 'auto' }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell align="center">Email</TableCell>
                                            <TableCell align="center">Set win</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {contest?.participants?.map((email) => (
                                            <TableRow
                                                key={email}
                                            >
                                                <TableCell component="th" scope="row">{email}</TableCell>
                                                <TableCell align="center" onClick={handleWon}><Button variant="outlined" sx={{ textTransform: "none" }}>Win</Button></TableCell>
                                            </TableRow>
                                        )
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer> :
                            <Typography variant='h5' textAlign="center" sx={{ mt: 10 }}>
                                No participants
                            </Typography>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Participants;