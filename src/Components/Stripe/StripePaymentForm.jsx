import React from 'react'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';

const StripePaymentForm = ({ event }) => {
    const stripe = useStripe();
    const elements = useElements();
    const backend = process.meta.env.VITE_BACKEND_URL
 
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) {
            console.log('Stripe.js has not loaded yet.');
            return;
        }

        const cardElement = elements.getElement(CardElement);
        /*const cardElement = elements.getElement(CardElement); does not manipulate the DOM directly; instead, it uses Stripe's React library to safely access the CardElement that's been mounted within the Elements provider. This is the recommended way to interact with Stripe elements in a React application. */
        
        try {
            const { data: { clientSecret } } = await axios.post(`${backend}/create-payment-intent`, {
                amount: 1000, // Specify the amount
                event_id: event.id,
            });

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: cardElement },
            });

            if (result.error) {
                console.error(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment successful!');
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Donate</button>
        </form>
    );
};

export default StripePaymentForm;