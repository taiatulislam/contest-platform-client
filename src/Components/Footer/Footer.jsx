import { Grid, Typography } from "@mui/material";

const pages = ['Products', 'Pricing', 'Blog'];
const links = ['Facebook', 'Instagram', 'Google'];
const condition = ['Terms & Condition', 'License', 'Contact'];

const Footer = () => {
    return (
        <div style={{ backgroundColor: 'ivory' }}>
            <Grid container justifyContent="space-evenly" alignItems="center" style={{ paddingTop: '40px' }} sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
                <Grid item>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Grid item>
                            <img
                                srcSet='https://i.ibb.co/qgvbwwc/logo.png'
                                src='https://i.ibb.co/qgvbwwc/logo.png'
                                alt='logo'
                                style={{ height: '50px', width: '100px' }}
                            />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    color: 'black',
                                    textDecoration: 'none',
                                }}
                            >
                                Contest Platform
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>

                {/* Menu */}
                <Grid item>
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '20px',
                                fontWeight: 600,
                                color: 'black',
                                textDecoration: 'none',
                                textAlign: 'center',
                                padding: '10px 0px'
                            }}
                        >
                            Menu
                        </Typography>
                        {pages.map((page) => (
                            <Grid item key={page} >
                                <Typography textAlign="center">{page}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Links */}
                <Grid item>
                    <Grid container direction="column" justifyContent="center" alignItems="center" >
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '20px',
                                fontWeight: 600,
                                color: 'black',
                                textDecoration: 'none',
                                textAlign: 'center',
                                padding: '10px 0px'
                            }}
                        >
                            Legal
                        </Typography>
                        {links.map((page) => (
                            <Grid item key={page} >
                                <Typography textAlign="center">{page}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>

                {/* Contact */}
                <Grid item>
                    <Grid container direction="column" justifyContent="center" alignItems="center">
                        <Typography
                            sx={{
                                fontFamily: 'monospace',
                                fontSize: '20px',
                                fontWeight: 600,
                                color: 'black',
                                textDecoration: 'none',
                                textAlign: 'center',
                                padding: '10px 0px'
                            }}
                        >
                            Social
                        </Typography>
                        {condition.map((page) => (
                            <Grid item key={page} >
                                <Typography textAlign="center">{page}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>

            {/* copyright */}
            <Typography
                sx={{
                    fontFamily: 'monospace',
                    fontSize: '16px',
                    fontWeight: 500,
                    color: 'black',
                    textDecoration: 'none',
                    textAlign: 'center',
                    margin: '0 auto',
                    padding: '40px 0px'
                }}
            >
                All right reserved.
            </Typography>

        </div >
    );
};

export default Footer;