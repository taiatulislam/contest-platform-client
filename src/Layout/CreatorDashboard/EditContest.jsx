import Swal from 'sweetalert2'
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Button, Grid, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';



const EditContest = () => {

    const { pages, category } = React.useContext(AuthContext);
    const navigate = useNavigate();
    const contest = useLoaderData();

    console.log(contest);

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const image = form.photoURL.value;
        const price = form.price.value;
        const prize = form.prize.value;
        const category = form.category.value;
        const deadline = form.deadline.value;
        const details = form.details.value;

        const contest = { name, image, price, prize, category, deadline, details }

        fetch(`https://contest-platform-server-rho.vercel.app/editContest/${contest?._id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(contest)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Contest Updated Successfully',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset()
                }
            })
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={2}>
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
                <Grid item xs={12} sm={10} sx={{ mt: 5 }}>
                    <Typography variant='h3' textAlign="center">
                        Edit Contest
                    </Typography>
                    <form onSubmit={handleForm}>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.name} name='name' label="Contest Name" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.image} name='photoURL' label="Contest PhotoURL" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.price} name='price' label="Joining Price" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.prize} name='prize' label="Prize Money" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <InputLabel style={{ textAlign: 'center' }}>Contest Category</InputLabel>
                            <Select
                                defaultValue={contest?.category}
                                name='category'
                                style={{ backgroundColor: 'white' }} sx={{ width: '50%', borderRadius: '5px' }}
                            >
                                {
                                    category.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)
                                }
                            </Select>
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.deadline} name='deadline' label="Example - January, 01, 2025" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <TextField defaultValue={contest?.details} name='details' label="Description" variant="outlined" style={{ width: '50%' }} />
                        </Box>
                        <Box sx={{ mt: 1, textAlign: 'center' }}>
                            <Button variant="contained" type='submit' style={{ width: '50%' }}>Edit Contest</Button>
                        </Box>

                    </form>
                </Grid>
            </Grid>
        </div>
    );
};

export default EditContest;