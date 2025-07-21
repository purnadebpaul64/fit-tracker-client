import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import toast from "react-hot-toast";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PK);

const CheckoutForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const bookingData = location.state;

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);

    try {
      const paymentIntentRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { amount: getAmountFromPackage(bookingData.package) * 100 }
      );

      const clientSecret = paymentIntentRes.data.clientSecret;

      // Confirm payment on frontend
      const cardElement = elements.getElement(CardElement);
      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: bookingData.userEmail,
          },
        },
      });

      if (paymentResult.error) {
        toast.error(paymentResult.error.message);
        setLoading(false);
        return;
      }

      if (paymentResult.paymentIntent.status === "succeeded") {
        // Save booking with payment info
        const bookingRes = await axios.post(
          `${import.meta.env.VITE_API_URL}/bookings`,
          {
            ...bookingData,
            paymentStatus: "paid",
            paymentDetails: paymentResult.paymentIntent,
          }
        );

        if (bookingRes.data.insertedId) {
          toast.success("Booking confirmed!");
          navigate("/booking-success");
        } else {
          toast.error("Failed to save booking");
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Payment failed");
    } finally {
      setLoading(false);
    }
  };

  const getAmountFromPackage = (packageName) => {
    switch (packageName) {
      case "Basic":
        return 10;
      case "Standard":
        return 50;
      case "Premium":
        return 100;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4 text-center">Payment</h2>

      <div className="mb-6 text-center">
        <p>
          Paying for package: <strong>{bookingData.package}</strong>
        </p>
        <p>
          Total: $
          <span className="font-bold">
            {bookingData.package === "Basic"
              ? 10
              : bookingData.package === "Standard"
              ? 50
              : bookingData.package === "Premium"
              ? 100
              : 0}
          </span>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded disabled:opacity-50"
        >
          {loading ? "Processing..." : "Pay Now"}
        </button>
      </form>
    </div>
  );
};

const PaymentPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default PaymentPage;
