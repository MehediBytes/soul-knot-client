import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useParams } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const Checkout = () => {
    const stripe = useStripe();
    const elements = useElements();
    const axiosSecure = useAxiosSecure();
    const { id: biodataId } = useParams();
    const { user } = useAuth();
    const [error, setError] = useState('');
    const [clientSecret, setClientSecret] = useState('');
    const [transactionId, setTransactionId] = useState('');
    const [hasPaid, setHasPaid] = useState(false);

    const amount = 5;

    // Check if the user has already paid for this biodataId
    useEffect(() => {
        const checkPaymentStatus = async () => {
            try {
                const { data } = await axiosSecure.get(`/check-payment-status?biodataId=${biodataId}&email=${user?.email}`);
                if (data?.hasPaid) {
                    setHasPaid(true);
                    setTransactionId(data.transactionId);
                }
            } catch (error) {
                console.error("Error checking payment status:", error);
            }
        };
        checkPaymentStatus();
    }, [axiosSecure, biodataId, user?.email]);

    // Fetch clientSecret for Stripe
    useEffect(() => {
        if (!hasPaid) {
            axiosSecure.post('/create-payment-intent', { price: amount })
                .then(res => {
                    setClientSecret(res.data.clientSecret);
                });
        }
    }, [axiosSecure, hasPaid]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!stripe || !elements) {
            Swal.fire("Error", "Stripe is not loaded", "error");
            return;
        }
        const card = elements.getElement(CardElement);
        if (!card) {
            Swal.fire("Error", "Card element not found", "error");
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });
        if (error) {
            setError(error.message);
            return;
        }
        else{
            Swal.fire("Payment method ok",paymentMethod);
            setError('');
        }

        // Confirm payment
        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous',
                },
            },
        });

        if (confirmError) {
            setError(confirmError.message);
            return;
        }

        if (paymentIntent.status === 'succeeded') {
            setTransactionId(paymentIntent.id);

            // Save the payment to the database
            const payment = {
                requestEmail: user?.email,
                paymentId: paymentIntent.id,
                biodataId,
                date: new Date(),
                status: 'pending',
            };

            const res = await axiosSecure.post('/payments', payment);
            if (res.data?.paymentResult?.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Thank you for your Payment",
                    showConfirmButton: false,
                    timer: 1500,
                });
                setHasPaid(true);
            }
        }
    };

    return (
        <div className="max-w-7xl px-5 mb-5">
            <form onSubmit={handleSubmit} className="border rounded-xl shadow p-5">
                <h2 className="text-3xl font-bold mb-5 text-center text-pink-500">Payment For Contact Information</h2>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold">Biodata ID</label>
                    <input
                        type="text"
                        value={biodataId}
                        readOnly
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold">Your Email</label>
                    <input
                        type="email"
                        value={user?.email}
                        readOnly
                        className="w-full border rounded px-3 py-2"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold">Card Details</label>
                    <CardElement className="border rounded p-3" options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': {
                                    color: '#aab7c4',
                                },
                            },
                            invalid: {
                                color: '#9e2146',
                            },
                        },
                    }} />
                </div>
                <button
                    type="submit"
                    disabled={!stripe || !clientSecret || transactionId || hasPaid}
                    className={`${!stripe || !clientSecret || transactionId || hasPaid
                        ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                        : "bg-pink-500 text-white hover:bg-pink-700"
                        } px-5 py-2 rounded-full`}
                >
                    {hasPaid ? "Payment Already Completed" : "Pay $5 and Submit"}
                </button>
                <p className="text-red-600">{error}</p>
                {transactionId && <p className="text-green-600">Your transaction ID: {transactionId}</p>}
            </form>
        </div>
    );
};

export default Checkout;
