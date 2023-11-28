import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Box, Card, CardContent, CardMedia, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Participated = () => {

    const { user, pages } = React.useContext(AuthContext);
    const [contest, setContest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/user/${user?.email}`)
            .then(res => res.json())
            .then(data => setContest(data))
    }, [user?.email])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }

    return (
        <div>
            <Grid container>
                <Grid item md={2}>
                    <Box sx={{ width: '100%', height: '97vh', bgcolor: 'orange' }}>
                        <nav aria-label="main mailbox folders">
                            <List>
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
                <Grid item md={10} >
                    <Typography variant="h3" textAlign='center' component="div" sx={{ mt: 5 }}>
                        My participated Contest
                    </Typography>
                    {
                        <Grid container spacing={5} maxWidth='lg' sx={{ mx: 'auto', my: 10 }}>
                            {contest.map((contest) => (
                                <Grid item key={contest._id} xs={12} md={4}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={contest.image}
                                            title={contest.name}
                                            style={{ width: 'full', height: '200px' }}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                                {contest.name}
                                            </Typography>
                                            <Typography component="div" style={{ fontSize: '18px', marginBottom: '5px' }}>
                                                Category: {contest.category}
                                            </Typography>
                                            <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                                                Participant: {contest.participant.length}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {contest.details}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    }
                </Grid>
            </Grid>
        </div>
    );
};

export default Participated;