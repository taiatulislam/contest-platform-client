import { Button, Card, CardActions, CardContent, CardMedia, Container, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Popular = () => {

    const [contests, setContests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:5000/popular')
            .then(res => res.json())
            .then(data => setContests(data))
    }, [])

    const handleDetails = id => {
        navigate(`/details/${id}`)
    }

    return (
        <Container textAlign='center'>
            <Typography variant="h3" textAlign='center' component="div" sx={{ mt: 10 }}>
                Popular Contest
            </Typography>
            <Grid container spacing={5} sx={{ my: 10 }}>
                {contests?.map((contest) => (
                    <Grid item key={contest?._id} xs={12} sm={6}>
                        <Card>
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
                                    Participant: {contest?.participants.length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {contest?.details}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button onClick={() => handleDetails(contest?._id)} variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Details</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Popular;