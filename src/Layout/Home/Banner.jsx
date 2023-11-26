import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Form } from "react-router-dom";

const Banner = () => {

    const [contests, setContests] = useState([]);
    const [contestCategory, setContestCategory] = useState([]);

    // get search data
    const handleSearch = e => {
        e.preventDefault();
        const form = e.target;
        const category = form.category.value;
        setContestCategory(category)

        fetch(`http://localhost:5000/search/${category}`)
            .then(res => res.json())
            .then(data => setContests(data))
    }

    console.log(contests);

    return (
        <div>
            <Grid
                sx={{
                    backgroundImage: `linear-gradient(rgba(200,200,200,0.5),rgba(200,200,200,0.7)), url('https://i.ibb.co/jLt5Dk8/contest-banner-1.jpg')`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <Container maxWidth='md' style={{ color: 'black' }}>
                    <Grid sx={{ py: 18 }}>
                        <Typography variant="h2" component="h2" textAlign='center' fontWeight='700'>
                            Welcome
                        </Typography>
                        <Typography variant="h2" component="h2" textAlign='center' fontWeight='500'>
                            The Biggest contest Platform
                        </Typography>
                        <Typography variant="h6" component="h6" fontWeight='500' sx={{ mt: 2 }}>
                            Certainly! Online contest websites are platforms that host various types of competitions or contests on the internet. These contests can range from academic challenges to creative competitions, skill-based contests, and more.
                        </Typography>

                        <Box sx={{ mt: 5, textAlign: 'center' }}>
                            <Form onSubmit={handleSearch}>
                                <TextField name='category' label="Search by Category ..." variant="outlined" style={{ backgroundColor: 'white' }} sx={{ width: '50%', borderRadius: '5px' }} />
                                <Button type="submit" variant="contained" sx={{ p: 2 }}>Search</Button>
                            </Form>
                        </Box>
                    </Grid>
                </Container>
            </Grid>
            {
                contests?.length ?
                    <Grid>
                        <Typography variant="h4" textAlign='center' component="div" sx={{ mt: 10 }}>
                            Search result for `{contestCategory}`
                        </Typography>
                        <Grid container spacing={5} maxWidth='lg' sx={{ mx: 'auto', my: 10 }}>
                            {contests.map((contest) => (
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
                                                Participant: {contest.attemptCount}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {contest.details}
                                            </Typography>
                                        </CardContent>
                                        <CardActions>
                                            <Button variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Details</Button>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))}
                        </Grid>
                    </Grid> :
                    <Typography variant="h5" textAlign='center' component="div" sx={{ mt: 10 }}>
                        Type in the search box for find contest
                    </Typography>
            }
        </div>
    );
};

export default Banner;