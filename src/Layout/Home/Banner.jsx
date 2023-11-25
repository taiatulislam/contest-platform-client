import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";

const Banner = () => {

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
                            <TextField id="outlined-basic" label="Search by Category ..." variant="outlined" style={{ backgroundColor: 'white' }} sx={{ width: '50%', borderRadius: '5px' }} />
                            <Button variant="contained" sx={{ p: 2 }}>Search</Button>
                        </Box>
                    </Grid>
                </Container>
            </Grid>
        </div>
    );
};

export default Banner;