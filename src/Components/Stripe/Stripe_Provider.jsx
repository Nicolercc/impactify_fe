import React, {useState} from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
// import { StripeProvider } from '@stripe/stripe-react-native';
import StripeDonation from "./StripeDonation";

function Stripe_Provider() {
  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  
  const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE  
  return (
   { /* <StripeProvider
      publishableKey={stripePublishKey}
    >
      <StripeDonation/>
  </StripeProvider> */}
  
  );
};

export default Stripe_Provider;