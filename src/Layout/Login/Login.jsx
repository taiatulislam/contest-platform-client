import Swal from 'sweetalert2'
import { FcGoogle } from 'react-icons/fc';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Providers/AuthProvider';
import { Box, Button, Grid, TextField, Typography } from '@mui/material';

const Login = () => {

    const { signIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                console.log(result.user);
                navigate(location.state ? location.state : '/')
                Swal.fire({
                    title: 'Success!',
                    text: 'SignIn successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
            .catch(error => {
                Swal.fire({
                    title: 'Success!',
                    text: `${error.message}`,
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
            })
    }

    const handleGoogle = e => {
        e.preventDefault();
        googleSignIn()
            .then(result => {
                console.log(result.user);
                const user = {
                    email: result.user?.email,
                    name: result.user?.displayName,
                    photoURL: result.user?.photoURL
                }
                fetch('http://localhost:5000/users/', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        if (data.insertedId) {
                            Swal.fire({
                                title: 'Success',
                                text: `User added successfully.`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                        }
                        else {
                            return Swal.fire({
                                title: 'Error!',
                                text: `${data.message}`,
                                icon: 'error',
                                confirmButtonText: 'OK'
                            })
                        }
                    })
                navigate(location.state ? location.state : '/')
            })
            .catch(error => {
                console.log(error.code, error.message);
                Swal.fire({
                    title: 'Error!',
                    text: `${error.message}`,
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
            })
    }

    return (
        <div>
            <Grid container alignItems='center'>
                <Grid item md={6}>
                    <img
                        srcSet='https://i.ibb.co/9ZZMTqq/login.jpg'
                        src='https://i.ibb.co/qgvbwwc/logo.png'
                        alt='logo'
                        style={{ width: '100%', padding: '20px' }}
                    />
                </Grid>
                <Grid item md={6} textAlign='center' sx={{ mt: 5 }}>
                    <Typography variant="h4" component="h2">
                        Login
                    </Typography>
                    <form onSubmit={handleForm}>

                        <Box sx={{ mt: 1 }}>
                            <TextField name='email' label="Email" variant="outlined" style={{ width: '70%' }} />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField name='password' label="Password" type="password" variant="outlined" style={{ width: '70%' }} />
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Button variant="contained" type='submit' style={{ width: '70%' }}>Login</Button>
                        </Box>

                    </form>
                    <Box sx={{ mt: 1 }}>
                        <Button onClick={handleGoogle} variant="contained" style={{ width: '70%', backgroundColor: 'silver' }}><FcGoogle style={{ marginRight: '5px' }}></FcGoogle>Google Sign In</Button>
                    </Box>
                    <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
                        New to the site? <Link to="/signUp" className="text-[#FA8072]">Sign Up</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div >
    );
};

export default Login;