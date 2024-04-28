import React from 'react';

const UkraineBuy = () => {
  //comments
    const stripePublishKey= import.meta.env.VITE_STRIPE_PUBLISHABLE
    const ukraineButton = import.meta.env.VITE_UKRAINE_EVENT
    
    return (
      <div className='mt-4 mx-5'>

        <stripe-buy-button
        buy-button-id={ukraineButton}
        publishable-key={stripePublishKey}
      >
      </stripe-buy-button>
      </div>
    );
};

export default UkraineBuy;