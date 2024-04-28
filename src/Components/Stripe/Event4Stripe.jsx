import React from 'react'

import Card from 'react-bootstrap/Card';


function Event4Strip({stripe_id}) {
    const buyButtonId = import.meta.env.VITE_STRIPE_PUBLISHABLE
    return (
            <stripe-buy-button
                buy-button-id={stripe_id}
                publishable-key={buyButtonId}    >
            </stripe-buy-button>
    );
}

export default Event4Strip;