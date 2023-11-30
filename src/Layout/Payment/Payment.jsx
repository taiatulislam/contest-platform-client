import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
import { Container } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const stripePromise = loadStripe(import.meta.env.VITE_Stripe_key);

const Payment = () => {

    const contest = useLoaderData();

    return (
        <div>
            <Container maxWidth="lg" style={{ marginTop: '30px' }}>
                <Elements stripe={stripePromise} >
                    <CheckoutForm contest={contest}></CheckoutForm>
                </Elements>
            </Container>
        </div>
    );
};

export default Payment;