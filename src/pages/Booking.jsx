import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import Loading from "../components/Loading";
import useAxiosSecure from "../hook/useAxiosSecure";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentModal from "../components/PaymentModal";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_SECRET_KEY);

const Booking = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [pkg, setPkg] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showPayment, setShowPayment] = useState(false);
    const [clientSecret, setClientSecret] = useState('');
    const [bookingFormData, setBookingFormData] = useState(null);
    const [paymentLoading, setPaymentLoading] = useState(false);
    const [seatCount, setSeatCount] = useState(1);
    
    // ✅ Total amount calculation
    const totalAmount = pkg ? pkg.price * seatCount : 0;
    
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/packages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPkg(data);
                setLoading(false);
            });
    }, [id]);

    const createPaymentIntent = async (amount) => {
        setPaymentLoading(true);
        try {
            console.log('Creating payment intent for amount:', amount);
            const response = await axiosSecure.post('/create-payment-intent', {
                price: amount
            });
            
            console.log('Payment intent created:', response.data);
            setClientSecret(response.data.clientSecret);
            return true;
        } catch (error) {
            console.error('Payment intent error:', error);
            
            let errorMessage = 'Failed to initialize payment';
            if (error.response?.status === 404) {
                errorMessage = 'Payment service is currently unavailable. Please try again later.';
            } else if (error.response?.data?.message) {
                errorMessage = error.response.data.message;
            }
            
            Swal.fire({
                icon: 'error',
                title: 'Payment Error',
                text: errorMessage,
                background: '#1f2937',
                color: '#fff'
            });
            return false;
        } finally {
            setPaymentLoading(false);
        }
    };

    const handleBooking = async (e) => {
        e.preventDefault();
        
        if (!user) {
            Swal.fire({
                icon: 'warning',
                title: 'Please Sign In',
                text: 'You need to sign in to book a tour',
                background: '#1f2937',
                color: '#fff'
            });
            navigate('/signin');
            return;
        }

        const note = e.target.note.value;
        const contact = e.target.contact.value;

        const bookingData = {
            tour_id: pkg._id,
            tour_name: pkg.tour_name,
            guide_name: pkg.guide_name,
            guide_email: pkg.guide_email,
            guide_contact: pkg.contact_no,
            buyer_email: user.email,
            buyer_contact: contact,
            buyer_name: user.displayName,
            booking_date: new Date(),
            departure_location: pkg.departure_location,
            destination: pkg.destination,
            departure_date: pkg.departure_date,
            price: pkg.price,
            total_price: totalAmount, 
            seat_count: seatCount, 
            status: "pending",
            payment_status: "unpaid",
            notes: note
        };

        setBookingFormData(bookingData);
        
        const success = await createPaymentIntent(totalAmount);
        if (success) {
            setShowPayment(true);
        }
    };

    const handlePaymentSuccess = async (paymentIntentId) => {
        try {
            const response = await axiosSecure.post('/confirm-payment', {
                paymentIntentId,
                bookingData: bookingFormData
            });

            if (response.data.success) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Booking Confirmed!",
                    text: `Your ${seatCount} seat(s) have been successfully booked`,
                    showConfirmButton: false,
                    timer: 2000,
                    background: '#1f2937',
                    color: '#fff'
                });
                
                setShowPayment(false);
                setClientSecret('');
                setBookingFormData(null);
                
                setTimeout(() => {
                    navigate("/my-booking");
                }, 2000);
            }
        } catch (error) {
            console.error('Payment confirmation error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Confirmation Failed',
                text: 'Payment was successful but booking confirmation failed. Please contact support.',
                background: '#1f2937',
                color: '#fff'
            });
        }
    };

    const handleClosePayment = () => {
        setShowPayment(false);
        setClientSecret('');
        setBookingFormData(null);
    };

    if (loading) return <Loading></Loading>;

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Your Tour</h2>
                <p className="text-gray-600 mb-6">Complete your booking for {pkg?.tour_name}</p>
                
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-teal-800 mb-2">Tour Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-600">Tour:</span>
                        <span className="font-medium">{pkg?.tour_name}</span>
                        
                        <span className="text-gray-600">Destination:</span>
                        <span className="font-medium">{pkg?.destination}</span>
                        
                        <span className="text-gray-600">Departure:</span>
                        <span className="font-medium">{pkg?.departure_date}</span>
                        
                        <span className="text-gray-600">Price per seat:</span>
                        <span className="font-medium text-teal-600">BDT {pkg?.price}</span>

                        {/* ✅ Seat count and total amount display */}
                        <span className="text-gray-600">Seats:</span>
                        <span className="font-medium">{seatCount}</span>
                        
                        <span className="text-gray-600 font-semibold">Total Amount:</span>
                        <span className="font-bold text-teal-600 text-lg">BDT {totalAmount}</span>
                    </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tour Package
                            </label>
                            <input 
                                readOnly 
                                value={pkg?.tour_name} 
                                className="input w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Price per Seat
                            </label>
                            <input 
                                readOnly 
                                value={`BDT ${pkg?.price}`} 
                                className="input w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-semibold text-teal-600" 
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Name
                            </label>
                            <input 
                                readOnly 
                                value={user?.displayName} 
                                className="input w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Your Email
                            </label>
                            <input 
                                readOnly 
                                value={user?.email} 
                                className="input w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Departure Date
                        </label>
                        <input 
                            readOnly 
                            value={pkg?.departure_date} 
                            className="input w-full bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent" 
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Contact Number *
                        </label>
                        <input
                            type="tel"
                            name="contact"
                            placeholder="Enter your phone number"
                            className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                        />
                    </div>

                   <div>
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Number of Seats *
  </label>

  <div className="flex items-center gap-3">
    {/* - Button */}
    <button
      type="button"
      onClick={() => setSeatCount((prev) => Math.max(1, prev - 1))}
      className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white px-3 rounded-md"
    >
      –
    </button>

    {/* Seat Count Display */}
    <input
      type="number"
      name="seatCount"
      readOnly
      value={seatCount}
      className="text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
    />

    {/* + Button */}
    <button
      type="button"
      onClick={() => setSeatCount((prev) => Math.min(10, prev + 1))}
      className="btn btn-sm bg-teal-500 hover:bg-teal-600 text-white px-3 rounded-md"
    >
      +
    </button>
  </div>

  <p className="text-xs text-gray-500 mt-1">
    Select how many seats you want to book (max 10)
  </p>
</div>

                    {/* ✅ Real-time Total Amount Display */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-700 font-medium">Total Amount:</span>
                            <span className="text-2xl font-bold text-blue-600">BDT {totalAmount}</span>
                        </div>
                        <p className="text-xs text-blue-600 mt-1">
                            {seatCount} seat(s) × BDT {pkg?.price} per seat
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Special Requests (Optional)
                        </label>
                        <textarea
                            name="note"
                            placeholder="Any special requirements or notes for your tour..."
                            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            rows="4"
                        ></textarea>
                    </div>

                    <button 
                        type="submit" 
                        className="w-full btn bg-teal-600 hover:bg-teal-700 text-white text-lg py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    >
                        {/* ✅ Button text এ total amount দেখাও */}
                        Proceed to Payment - BDT {totalAmount}
                    </button>
                </form>

                {/* Stripe Payment Modal */}
                {showPayment && clientSecret && (
                    <Elements 
                        stripe={stripePromise} 
                        options={{
                            clientSecret: clientSecret,
                            appearance: {
                                theme: 'stripe',
                            },
                        }}
                    >
                        <PaymentModal
                            isOpen={showPayment}
                            onClose={handleClosePayment}
                            amount={totalAmount} // ✅ Total amount পাঠাও
                            packageName={pkg?.tour_name}
                            bookingData={bookingFormData}
                            onPaymentSuccess={handlePaymentSuccess}
                            clientSecret={clientSecret}
                        />
                    </Elements>
                )}
            </div>
        </div>
    );
};

export default Booking;