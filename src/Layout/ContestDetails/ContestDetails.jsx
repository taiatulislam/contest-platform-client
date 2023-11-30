import { Button, Card, CardActions, CardContent, CardMedia, Container, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProvider";

const ContestDetails = () => {

    const contest = useLoaderData();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const haveUser = contest?.participants?.filter(email => email === user.email).toString();

    const deadline = contest?.deadline;

    const [days, setDays] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    // const [seconds, setSeconds] = useState(0);

    const getTime = () => {
        const time = Date.parse(deadline) - Date.now();

        setDays(Math.floor(time / (1000 * 60 * 60 * 24)));
        setHours(Math.floor((time / (1000 * 60 * 60)) % 24));
        setMinutes(Math.floor((time / 1000 / 60) % 60));
        // setSeconds(Math.floor((time / 1000) % 60));
    };

    useEffect(() => {
        const interval = setInterval(() => getTime(deadline), 1000);

        return () => clearInterval(interval);
    }, []);

    const handleRegister = (id) => {
        navigate(`/payment/${id}`)
    }

    return (
        <Container maxWidth="lg">
            <Card sx={{ mt: 5 }}>
                <CardMedia
                    sx={{ height: 500 }}
                    image={contest?.image}
                    title={contest?.name}
                    style={{ width: 'full' }}
                />
                <CardContent>
                    <Typography variant="h5" component="div" sx={{ mb: 1 }}>
                        {contest?.name}
                    </Typography>
                    <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                        Registration Price: {contest?.price}
                    </Typography>
                    <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                        Wining Prize: {contest?.prize}
                    </Typography>
                    <Typography component="div" style={{ fontSize: '16px', marginBottom: '5px' }}>
                        Participant: {contest?.participants?.length}
                    </Typography>
                    <Typography >
                        Time Remain: {days} days {hours} hours {minutes} min
                    </Typography>
                    <Typography color="text.secondary">
                        {contest?.details}
                    </Typography>
                </CardContent>
                <CardActions>
                    {
                        haveUser === user?.email ? <Button disabled variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Already Registered</Button> :
                            <Button onClick={() => handleRegister(contest?._id)} variant="contained" fullWidth style={{ textTransform: 'none', margin: 'auto' }}>Register</Button>
                    }
                </CardActions>
            </Card>
        </Container >
    );
};

export default ContestDetails;