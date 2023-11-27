import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";

const ContestDetails = () => {

    const contest = useLoaderData();
    const deadline = "November, 30, 2023";

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <Container maxWidth="lg">
            <Card sx={{ mt: 5 }}>
                <CardMedia
                    sx={{ height: 500 }}
                    image={contest.image}
                    title={contest.name}
                    style={{ width: 'full' }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {contest.name}
                    </Typography>
                    <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                        Participant: {contest.attemptCount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Time Remain: {days} days {hours} hours {minutes} min {seconds} sec
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {contest.details}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Register</Button>
                </CardActions>
            </Card>
        </Container >
    );
};

export default ContestDetails;