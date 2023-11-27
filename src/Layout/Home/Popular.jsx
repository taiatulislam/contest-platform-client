import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Popular = () => {

    const [contest, setContest] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/popular')
            .then(res => res.json())
            .then(data => setContest(data))
    }, [])

    const handleDetails = id => {
        navigate(`/details/${id}`)
    }

    return (
        <div>
            <Typography variant="h3" textAlign='center' component="div" sx={{ mt: 10 }}>
                Popular Contest
            </Typography>
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
                            <CardActions>
                                <Button onClick={() => handleDetails(contest._id)} variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Popular;