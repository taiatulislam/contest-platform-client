import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { Grid, Typography } from "@mui/material";
import { AuthContext } from '../../Providers/AuthProvider';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {

    const { pages } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={2}>
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
                <Grid item xs={12} sm={10} sx={{ mt: 5 }}>
                    <Typography variant='h3' textAlign="center">
                        Welcome to the Admin dashboard.
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default AdminDashboard;