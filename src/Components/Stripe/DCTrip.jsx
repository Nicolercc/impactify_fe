import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './DCTrip.css'

function DCTrip() {
    const dcTripBuyId = import.meta.env.VITE_DCTRIP_EVENT
    const buyButtonId = import.meta.env.VITE_STRIPE_PUBLISHABLE
    return (
        <Card className='dc-trip-card'>
            <stripe-buy-button
                buy-button-id={dcTripBuyId}
                publishable-key={buyButtonId}    >
            </stripe-buy-button>
        </Card>
    );
}

export default DCTrip;