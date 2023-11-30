import { useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AllContest = () => {
    const categories = ['poster', 'photography', 'gaming', 'coding', 'uiux'];
    const [contests, setContests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:5000/allContest/poster`)
            .then(res => res.json())
            .then(data => {
                setContests(data.filter(contest =>
                    contest.status !== 'pending'))
            })
    }, [])

    const handleTab = (category) => {
        fetch(`http://localhost:5000/allContest/${category}`)
            .then(res => res.json())
            .then(data => setContests(data))
    }

    const handleDetails = id => {
        navigate(`/details/${id}`)
    }

    return (
        <Container style={{ textAlign: 'center', marginTop: '20px' }}>
            <Tabs>
                <TabList>
                    {
                        categories?.map(item => <Tab onClick={() => handleTab(item)} key={item}>{item}</Tab>)
                    }
                </TabList>

                {
                    categories?.map(item => (
                        <TabPanel key={item}>
                            <Grid container spacing={5} maxWidth='lg' sx={{ mx: 'auto', my: 10 }}>
                                {contests?.map(contest => (
                                    <Grid item key={contest?._id} xs={12} md={4}>
                                        <Card >
                                            <CardMedia
                                                image={contest?.image}
                                                title="Category name"
                                                component='img'
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
                                                    {contest?.details.slice(0, 130)}.....
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button onClick={() => handleDetails(contest?._id)} variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Details</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </TabPanel>
                    ))
                }
            </Tabs>
        </Container>
    );
}

export default AllContest;