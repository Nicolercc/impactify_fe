import React,{ useState, useEffect } from 'react';
import { Elements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { Card as BootstrapCard } from "react-bootstrap";
import StripePaymentForm from './StripePaymentForm';
import axios from 'axios';

const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE
const stripePromise = loadStripe(stripePublicKey)

const StripePaymentEvent = () => {
    const backend = import.meta.env.VITE_BACKEND_URL
    const [eventData, setEventData] = useState([]);

  //getting user events
    useEffect(() => {
        const fetchBackendEvent = async () => {
          try {
            const response = await axios.get(`${backend}/events`)
            const backendEvents = response.data.data
            setEventData(backendEvents)
          } catch (error) {
            console.error("Error fetching BackEnd Events:", error);
          } finally {
            // setLoading(false);
            console.log(eventData)
          }
        }
        fetchBackendEvent()
      }, [])

   const oneEvent = eventData[0]   

    console.log(oneEvent)

      return (
        <Elements stripe={stripePromise}>
            <div>
                    <BootstrapCard key={oneEvent.event_id}>
                        <BootstrapCard.Body>
                            <BootstrapCard.Title>{oneEvent.event_title}</BootstrapCard.Title>
                            {/* <StripePaymentForm event={oneEvent}/> */}
                        </BootstrapCard.Body>
                    </BootstrapCard>
            </div>
        </Elements>
    );

   }


 

export default StripePaymentEvent;