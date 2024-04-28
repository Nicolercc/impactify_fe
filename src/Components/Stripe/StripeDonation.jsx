
import React,{ useState, useEffect } from 'react';
import {loadConnectAndInitialize} from '@stripe/connect-js';
import {
  ConnectPayments,
  ConnectComponentsProvider,
} from "@stripe/react-connect-js";

const StripeDonation = () => {

  const stripePublishKey = import.meta.env.VITE_STRIPE_PUBLISHABLE  
  const backend = import.meta.env.VITE_BACKEND_URL

  const [fetched_acc, setFetched_Acc] = useState("")
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  // We use `useState` to ensure the Connect instance is only initialized once
  const [stripeConnectInstance, setStripeConnectInstance] = useState(null);

  useEffect(() => {
    const initializeStripe = async () => {
      const fetchClientSecret = async () => {
        try {
          const response = await fetch(`${backend}/payments`, { method: "POST" });
          if (!response.ok) {
            const errorData = await response.json();
            setError('An error occurred: ' + errorData.error);
            setIsLoading(false);
            return undefined;
          } else {
           debugger
            const { client_secret: clientSecret } = await response.json();
            setFetched_Acc(clientSecret);
            setIsLoading(false);
            console.log(clientSecret)
            return clientSecret;
          }
        } catch (err) {
          console.error('An error occurred: ', err);
          setError('An unexpected error occurred.');
          setIsLoading(false);
        }
      };

      const instance = await loadConnectAndInitialize({
        publishableKey: stripePublishKey,
        fetchClientSecret: fetchClientSecret,
        appearance: {
          overlays: 'dialog',
          variables: {
            colorPrimary: '#625afa',
          },
        },
      });

      setStripeConnectInstance(instance);
    };

    initializeStripe();
  }, [backend, stripePublishKey]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div className="container">
      {stripeConnectInstance && (
        <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
          <ConnectPayments />
        </ConnectComponentsProvider>
      )}
    </div>
  );
};

export default StripeDonation;



{/*const [stripeConnectInstance] = useState(() => {

    const fetchClientSecret = async () => {
      // Fetch the AccountSession client secret
      const response = await fetch(`${backend}/payments`, { method: "POST" });
      if (!response.ok) {
        // Handle errors on the client side here
        const {error} = await response.json();
        console.error('An error occurred: ', error);
        document.querySelector('#error').removeAttribute('hidden');
        return undefined;
      } else {
        const {client_secret: clientSecret} = await response.json();
        document.querySelector('#error').setAttribute('hidden', '');
        setFetched_Acc(clientSecret)
        return clientSecret;
      }
    }

    return loadConnectAndInitialize({
      // This is your test publishable API key.
      publishableKey: stripePublishKey,
      fetchClientSecret: fetchClientSecret,
      appearance: {
        overlays: 'dialog',
        variables: {
          colorPrimary: '#625afa',
        },
      },
    })
  });


  useEffect(()=>{
    console.log(fetched_acc)
  }, [fetched_acc])

  return (
    <div className="container">
      <ConnectComponentsProvider connectInstance={stripeConnectInstance}>
        <ConnectPayments />
      </ConnectComponentsProvider>
    </div>
  )
};



export default StripeDonation;*/}