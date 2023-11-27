import React from 'react';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Providers/AuthProvider';
import { Box, Button, Divider, Grid, List, ListItem, ListItemButton, ListItemText, TextField } from '@mui/material';
import { Form, useNavigate } from 'react-router-dom';

const UpdateProfile = () => {

    const { user, updateUser, pages } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photo = form.photoURL.value;

        updateUser(name, photo)
            .then(() => {
                Swal.fire({
                    title: 'Success!',
                    text: 'Profile Update successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                form.reset()
            }).catch((error) => {
                console.log(error);
            });
    }

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <Box sx={{ width: '100%', bgcolor: 'orange' }}>
                        <nav aria-label="main mailbox folders">
                            <List >
                                <ListItem>
                                    <ListItemButton onClick={() => handleMenu('/participated')}>
                                        <ListItemText primary="My Participated Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemText primary="My Winning Contest" style={{ textAlign: "center" }} />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem>
                                    <ListItemButton>
                                        <ListItemText onClick={() => handleMenu('/updateProfile')} primary="Update Profile" style={{ textAlign: "center" }} />
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
                    <Box style={{ textAlign: 'center' }}>
                        <img
                            src={`${user?.photoURL}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            alt='profile'
                            style={{ width: '250px' }}
                        />
                    </Box>
                    <Form onSubmit={updateProfile}>
                        <Box style={{ margin: '20px auto', width: '40%' }}>
                            <TextField defaultValue={user?.photoURL} name='photoURL' label="Photo URL" variant="outlined" fullWidth />
                        </Box>
                        <Box style={{ margin: '10px auto', width: '40%' }}>
                            <TextField defaultValue={user?.displayName} name='name' label="Display Name" variant="outlined" fullWidth />
                        </Box>
                        <Box sx={{ margin: 'auto', width: '40%' }}>
                            <Button variant="contained" type='submit' fullWidth>Update</Button>
                        </Box>
                    </Form>
                </Grid>
            </Grid>
        </div>
    );
};

export default UpdateProfile;