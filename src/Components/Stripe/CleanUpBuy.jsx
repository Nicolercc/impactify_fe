import React from 'react';

const CleanUpBuy = () => {
    const stripePublishKey= import.meta.env.VITE_STRIPE_PUBLISHABLE
    const cleanupButton = import.meta.env.VITE_CLEANUP_EVEN

    return (
        <stripe-buy-button
            buy-button-id={cleanupButton}
            publishable-key={stripePublishKey}
        >
        </stripe-buy-button>
    );
};

export default CleanUpBuy;