import { Box, Button, Card, CardActions, CardContent, CardMedia, Container, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const Banner = () => {

    const [contests, setContests] = useState([]);
    const { category } = useContext(AuthContext);
    const [contestCategory, setContestCategory] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        const category = e.target.value;
        setContestCategory(category)
        fetch(`http://localhost:5000/search/${category}`)
            .then(res => res.json())
            .then(data => {
                setContests(data.filter(contest =>
                    contest.status !== 'pending'))
            })
    };

    const handleDetails = id => {
        navigate(`/details/${id}`)
    }

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
                            <FormControl sx={{ width: '50%' }} >
                                <InputLabel>Search by Category ...</InputLabel>
                                <Select
                                    defaultValue={''}
                                    onChange={handleChange}
                                    style={{ backgroundColor: 'white' }} sx={{ width: '100%', borderRadius: '5px', margin: 'auto' }}
                                >
                                    {
                                        category.map((category) => <MenuItem key={category} value={category}>{category}</MenuItem>)
                                    }
                                </Select>
                            </FormControl>
                        </Box>
                    </Grid>
                </Container>
            </Grid>
            <Container textAlign='center'>
                {
                    contests?.length ?
                        <Grid>
                            <Typography variant="h4" textAlign='center' component="div" sx={{ mt: 10 }}>
                                Search result for `{contestCategory}`
                            </Typography>
                            <Grid container spacing={5} sx={{ my: 10 }}>
                                {contests.map((contest) => (
                                    <Grid item key={contest._id} xs={12} sm={6}>
                                        <Card style={{ padding: 0 }}>
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
                                                <Button onClick={() => handleDetails(contest._id)} variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Details</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid> :
                        <Typography variant="h5" textAlign='center' component="div" sx={{ mt: 10 }}>
                            Select category for find contest
                        </Typography>
                }
            </Container>
        </div>
    );
};

export default Banner;