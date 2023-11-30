import React, { useEffect, useState } from 'react';
import { AuthContext } from '../../Providers/AuthProvider';
import { Box, Card, CardContent, CardMedia, Divider, Grid, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Winning = () => {

    const { user, pages } = React.useContext(AuthContext);
    const [contests, setContests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`https://contest-platform-server-rho.vercel.app/allContest`)
            .then(res => res.json())
            .then(data => {
                setContests(data.filter(data => data.winner === user?.email))
            })
    }, [])

    const handleMenu = (path) => {
        navigate(`${path}`)
    }


    return (
        <div>
            <Grid container>
                <Grid item xs={12} sm={2}>
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
                                    <ListItemButton onClick={() => handleMenu('/updateProfile')}>
                                        <ListItemText primary="Update Profile" style={{ textAlign: "center" }} />
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
                <Grid item xs={12} sm={10}>
                    <Typography variant="h3" textAlign='center' component="div" sx={{ mt: 5 }}>
                        My Wining Contest
                    </Typography>
                    {
                        <Grid container spacing={5} sx={{ my: 10 }}>
                            {contests?.map((contest) => (
                                <Grid item key={contest?._id} xs={12} sm={6} md={4}>
                                    <Card sx={{ maxWidth: 345 }}>
                                        <CardMedia
                                            sx={{ height: 140 }}
                                            image={contest?.image}
                                            title={contest?.name}
                                            style={{ width: 'full', height: '200px' }}
                                        />
                                        <CardContent>
                                            <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                                                {contest?.name}
                                            </Typography>
                                            <Typography component="div" style={{ fontSize: '18px', marginBottom: '5px' }}>
                                                Category: {contest?.category}
                                            </Typography>
                                            <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                                                Participant: {contest?.participants?.length}
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

export default Winning;