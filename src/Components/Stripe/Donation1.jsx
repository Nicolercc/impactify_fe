import React from 'react';

const Donation1 = () => {
    const donationbutton = import.meta.env.VITE_DONATION1
    const stripekey = import.meta.env.VITE_STRIPE_PUBLISHABLE
    return (
        <div className='mt-4'>
            <stripe-buy-button
                buy-button-id={donationbutton}
                publishable-key={stripekey}
            >
            </stripe-buy-button>
        </div>
    );
};

export default Donation1;