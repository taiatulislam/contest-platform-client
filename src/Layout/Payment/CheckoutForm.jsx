import { Box, Button, Container, TextField } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'
import { AuthContext } from '../../Providers/AuthProvider';

const CheckoutForm = ({ contest }) => {

    const stripe = useStripe();
    const elements = useElements();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            Swal.fire({
                title: 'Error!',
                text: `${error.message}`,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        } else {
            if (paymentMethod.id) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Payment successfully',
                    icon: 'success',
                    confirmButtonText: 'OK'
                })
                const updateData = { id: contest?._id, email: user?.email }
                fetch(`http://localhost:5000/payment`, {
                    method: 'PATCH',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(updateData)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                    })
                navigate(`/allContest`)
            }
        }
    }

    return (
        <div>
            <Container maxWidth='md'>
                <Box style={{ textAlign: "center" }}>
                    <img
                        src='https://i.ibb.co/0JWgJJZ/Payment-Gateway-Stripe.png'
                        alt='stripe'
                    />
                </Box>
                <Container maxWidth='sm'>
                    <Container style={{
                        backgroundColor: '#C5E898 ',
                        padding: '10px',
                        borderRadius: '5px'
                    }}>
                        <Box style={{ margin: '20px auto', width: '40%' }}>
                            <TextField sx={{ color: 'white' }} defaultValue={contest?.price} label="Paid Amount" disabled variant="outlined" fullWidth />
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '',
                                            '::placeholder': {
                                                color: 'white',
                                            },

                                        },
                                        invalid: {
                                            color: '#9e2146',
                                        },
                                    },
                                }}
                            />
                            <Button sx={{ mt: 2 }} type="submit" variant='contained' disabled={!stripe}>
                                Pay
                            </Button>
                        </form>
                    </Container>
                    <Box style={{ textAlign: "center", marginTop: '20px' }}>
                        <img
                            src='https://i.ibb.co/BZQ8brq/6220ac7d912013c51947f9c6.png'
                            alt='sponser'
                        />
                    </Box>
                </Container>
            </Container>
        </div>
    );
};

CheckoutForm.propTypes = {
    contest: PropTypes.object
};

export default CheckoutForm;