import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';

const Navbar = () => {

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const { user, logout, pages } = React.useContext(AuthContext);
    const navigate = useNavigate();

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handlePath = (page) => {
        navigate(`${page.path}`)
    };
    const handleLogin = () => {
        navigate('/login')
    };

    const handleLogout = () => {
        logout()
            .then(() => {

            }).catch((error) => {
                console.log(error);
            });
        setAnchorElUser(null);
    }

    const handleDashboard = (email) => {
        fetch(`http://localhost:5000/userRole/${email}`)
            .then(res => res.json())
            .then(data => {
                if (data?.role === 'admin') {
                    navigate('/adminDashboard');
                }
                else if (data?.role === 'creator') {
                    navigate('/creatorDashboard');
                }
                else {
                    navigate('/dashboard');
                }
                setAnchorElUser(null);
            })
    }

    return (
        <AppBar position='static' sx={{ backgroundColor: 'white' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box style={{ padding: '10px 0px' }} sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Box>
                            <Grid container direction="column" justifyContent="center" alignItems="center">
                                <Grid item>
                                    <img
                                        srcSet='https://i.ibb.co/qgvbwwc/logo.png'
                                        src='https://i.ibb.co/qgvbwwc/logo.png'
                                        alt='logo'
                                        style={{ height: '25px', width: '50px' }}
                                    />
                                </Grid>
                                <Grid item>
                                    <Typography
                                        noWrap
                                        component="a"
                                        href="/"
                                        sx={{
                                            display: { xs: 'none', md: 'flex' },
                                            fontSize: '16px',
                                            fontWeight: 500,
                                            color: 'black',
                                            textDecoration: 'none',
                                        }}
                                    >
                                        Contest Platform
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                    {/* Menu icon */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="black"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: 'block', md: 'none' },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} onClick={() => handlePath(page)}>
                                    <Typography textAlign="center" sx={{ fontSize: { xs: '14px' } }} > {page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* center logo for small device */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}>
                        <img
                            srcSet='https://i.ibb.co/qgvbwwc/logo.png'
                            src='https://i.ibb.co/qgvbwwc/logo.png'
                            alt='logo'
                            style={{ height: '25px', width: '50px' }}
                        />
                    </Typography>

                    {/* Page name for large device */}
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.name}
                                onClick={() => handlePath(page)}
                                sx={{ my: 2, color: 'black', display: 'block', textTransform: 'none' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>

                    {/* Profile section */}
                    {
                        user ?
                            <Box sx={{ flexGrow: 0 }}>
                                <Tooltip title="Open settings">
                                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                        <Avatar alt="Remy Sharp" src={user.photoURL} />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '45px' }}
                                    id="menu-appbar"
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >

                                    <Typography textAlign="center" sx={{ px: 2 }}>{user?.displayName}</Typography>

                                    <MenuItem onClick={() => handleDashboard(user?.email)}>
                                        <Typography textAlign="center">Dashboard</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <Typography textAlign="center">Logout</Typography>
                                    </MenuItem>
                                </Menu>
                            </Box> : <Button variant="contained" sx={{ marginRight: '5px' }} onClick={handleLogin}>Login</Button>
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );
};

export default Navbar;