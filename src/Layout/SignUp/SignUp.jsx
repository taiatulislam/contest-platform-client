import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";
import Swal from 'sweetalert2'
import { Box, Button, Grid, TextField, Typography } from "@mui/material";

const SignUp = () => {

    const { createUser, updateUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleForm = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photo = form.photo.value;
        const password = form.password.value;
        const role = 'user';

        if (password.length < 6) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password length must be grater than 6',
                icon: 'error',
                confirmButtonText: 'OK'
            })

        }
        else if (!/[A-Z]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password should have one capital letter',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        else if (!/[@$!%*?&]/.test(password)) {
            return Swal.fire({
                title: 'Error!',
                text: 'Password should have one special character',
                icon: 'error',
                confirmButtonText: 'OK'
            })
        }

        createUser(email, password)
            .then(result => {
                console.log(result.user);
                const user = {
                    email: email,
                    displayName: name,
                    photoURL: photo,
                    role: role
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
                            updateUser(name, photo, role)
                                .then(() => {
                                    Swal.fire({
                                        title: 'Success',
                                        text: `User created successfully.`,
                                        icon: 'success',
                                        confirmButtonText: 'OK'
                                    })
                                    form.reset()
                                    navigate(location.state ? location.state : '/')

                                }).catch((error) => {
                                    console.log(error);
                                });
                        }
                        else {
                            return Swal.fire({
                                title: 'Success!',
                                text: `${data.message}`,
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                        }
                    })
            })
            .catch(error => {
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
                        Sign Up
                    </Typography>
                    <form onSubmit={handleForm}>

                        <Box sx={{ mt: 1 }}>
                            <TextField name='name' label="Name" variant="outlined" style={{ width: '70%' }} />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField name='email' label="Email" variant="outlined" style={{ width: '70%' }} />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField name='photo' label="Photo URL" variant="outlined" style={{ width: '70%' }} />
                        </Box>
                        <Box sx={{ mt: 1 }}>
                            <TextField name='password' label="Password" type="password" variant="outlined" style={{ width: '70%' }} />
                        </Box>

                        <Box sx={{ mt: 1 }}>
                            <Button variant="contained" type='submit' style={{ width: '70%' }}>Sign Up</Button>
                        </Box>

                    </form>
                    <Typography variant="h6" component="h6" sx={{ mt: 2 }}>
                        Already have an account? <Link to="/login" style={{ textDecoration: 'none' }}>Login</Link>
                    </Typography>
                </Grid>
            </Grid>
        </div >
    );
};

export default SignUp;