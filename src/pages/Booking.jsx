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

    const [discountCode, setDiscountCode] = useState('');
    const [appliedDiscount, setAppliedDiscount] = useState(null);
    const [availableDiscounts, setAvailableDiscounts] = useState([]);
    const [discountLoading, setDiscountLoading] = useState(false);

    const [contact, setContact] = useState('');
    const [note, setNote] = useState('');

    const baseAmount = pkg ? pkg.price * seatCount : 0;
    const discountAmount = appliedDiscount ? (baseAmount * appliedDiscount.discount) / 100 : 0;
    const totalAmount = baseAmount - discountAmount;

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/packages/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setPkg(data);
                setLoading(false);
            });
    }, [id]);

    useEffect(() => {
        if (user) {
            loadAvailableDiscounts();
        }
    }, [user]);

    const loadAvailableDiscounts = async () => {
        try {
            const response = await axiosSecure.get('/spin/history');
            const validDiscounts = response.data.filter(discount =>
                new Date(discount.valid_until) > new Date() && !discount.used
            );
            setAvailableDiscounts(validDiscounts);
        } catch (error) {
            console.error('Error loading discounts:', error);
        }
    };

    const increaseSeats = () => {
        if (pkg && seatCount < pkg.available_seats) {
            setSeatCount(prev => prev + 1);
        } else if (pkg) {
            Swal.fire({
                icon: 'info',
                title: 'Maximum Seats',
                text: `Only ${pkg.available_seats} seats available`,
                background: '#1f2937',
                color: '#fff',
                timer: 2000
            });
        }
    };

    const decreaseSeats = () => {
        if (seatCount > 1) {
            setSeatCount(prev => prev - 1);
        }
    };

    const handleSeatChange = (e) => {
        const value = parseInt(e.target.value) || 1;
        if (pkg && value > pkg.available_seats) {
            Swal.fire({
                icon: 'warning',
                title: 'Not Enough Seats',
                text: `Only ${pkg.available_seats} seats available`,
                background: '#1f2937',
                color: '#fff',
                timer: 2000
            });
            setSeatCount(pkg.available_seats);
        } else if (value < 1) {
            setSeatCount(1);
        } else {
            setSeatCount(value);
        }
    };

    const applyDiscount = async () => {
        if (!discountCode.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Enter Discount Code',
                text: 'Please enter a discount code',
                background: '#1f2937',
                color: '#fff'
            });
            return;
        }

        setDiscountLoading(true);
        try {
            const response = await axiosSecure.post('/discounts/validate', {
                discountCode: discountCode.trim(),
                packageId: id
            });

            if (response.data.valid) {
                setAppliedDiscount(response.data.discount);
                Swal.fire({
                    icon: 'success',
                    title: 'Discount Applied!',
                    text: `${response.data.discount.discount}% discount applied successfully`,
                    background: '#1f2937',
                    color: '#fff',
                    timer: 2000
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Invalid Discount',
                    text: response.data.message,
                    background: '#1f2937',
                    color: '#fff'
                });
            }
        } catch (error) {
            console.error('Discount apply error:', error);
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Failed to apply discount code',
                background: '#1f2937',
                color: '#fff'
            });
        } finally {
            setDiscountLoading(false);
        }
    };

    const removeDiscount = () => {
        setAppliedDiscount(null);
        setDiscountCode('');
    };

    const createPaymentIntent = async (amount) => {
        setPaymentLoading(true);
        try {
            console.log('Creating payment intent for amount:', amount);
            const response = await axiosSecure.post('/create-payment-intent', {
                price: amount,
                discountCode: appliedDiscount?.discount_code
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

        if (seatCount > pkg.available_seats) {
            Swal.fire({
                icon: 'error',
                title: 'Not Enough Seats',
                text: `Only ${pkg.available_seats} seats available for this tour`,
                background: '#1f2937',
                color: '#fff'
            });
            return;
        }

        if (!contact.trim()) {
            Swal.fire({
                icon: 'warning',
                title: 'Contact Required',
                text: 'Please enter your contact number',
                background: '#1f2937',
                color: '#fff'
            });
            return;
        }

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
            notes: note,
            applied_discount: appliedDiscount ? {
                discount_code: appliedDiscount.discount_code,
                discount_percentage: appliedDiscount.discount,
                discount_amount: discountAmount
            } : null
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
                if (appliedDiscount) {
                    await axiosSecure.patch(`/discounts/use/${appliedDiscount.discount_code}`);
                }

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
        <div className="min-h-screen py-8">
            <div className="max-w-2xl mx-auto card-theme p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-2">Book Your Tour</h2>
                <p className="text-gray-400 mb-6">Complete your booking for {pkg?.tour_name}</p>

                <div className=" border border-teal-200 rounded-lg p-4 mb-6">
                    <h3 className="font-semibold text-teal-500 mb-2">Tour Summary</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                        <span className="text-gray-400">Tour:</span>
                        <span className="font-medium">{pkg?.tour_name}</span>

                        <span className="text-gray-400">Destination:</span>
                        <span className="font-medium">{pkg?.destination}</span>

                        <span className="text-gray-400">Departure:</span>
                        <span className="font-medium">{pkg?.departure_date}</span>

                        <span className="text-gray-400">Price per seat:</span>
                        <span className="font-medium text-teal-600">BDT {pkg?.price}</span>

                        <span className="text-gray-400">Seats:</span>
                        <span className="font-medium">{seatCount}</span>

                        <span className="text-gray-400">Base Amount:</span>
                        <span className="font-medium">BDT {baseAmount}</span>

                        {appliedDiscount && (
                            <>
                                <span className="text-gray-400">Discount:</span>
                                <span className="font-medium text-green-600">
                                    -BDT {discountAmount} ({appliedDiscount.discount}%)
                                </span>
                            </>
                        )}

                        <span className="text-gray-400 font-semibold">Total Amount:</span>
                        <span className="font-bold text-teal-600 text-lg">BDT {totalAmount}</span>
                    </div>
                </div>

                <form onSubmit={handleBooking} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Tour Package
                            </label>
                            <input
                                readOnly
                                value={pkg?.tour_name}
                                className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Price per Seat
                            </label>
                            <input
                                readOnly
                                value={`BDT ${pkg?.price}`}
                                className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent font-semibold text-teal-600"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Your Name
                            </label>
                            <input
                                readOnly
                                value={user?.displayName}
                                className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-500 mb-1">
                                Your Email
                            </label>
                            <input
                                readOnly
                                value={user?.email}
                                className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                            Departure Date
                        </label>
                        <input
                            readOnly
                            value={pkg?.departure_date}
                            className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                            Contact Number *
                        </label>
                        <input
                            type="tel"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            placeholder="Enter your phone number"
                            className="input w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            required
                        />
                    </div>

                   
                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-3">
                            Number of Seats *
                        </label>
                        <div className="flex items-center space-x-3">
                            {/* Decrease Button */}
                            <button
                                type="button"
                                onClick={decreaseSeats}
                                disabled={seatCount <= 1}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                                    seatCount <= 1 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-red-500 hover:bg-red-600 text-white shadow-md hover:shadow-lg'
                                }`}
                            >
                                -
                            </button>
                            
                            {/* Seat Count Display */}
                            <div className="flex-1">
                                <input
                                    type="number"
                                    value={seatCount}
                                    onChange={handleSeatChange}
                                    min="1"
                                    max={pkg?.available_seats}
                                    className="w-full text-center py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 text-lg font-semibold"
                                    required
                                />
                            </div>
                            
                            {/* Increase Button */}
                            <button
                                type="button"
                                onClick={increaseSeats}
                                disabled={pkg && seatCount >= pkg.available_seats}
                                className={`w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold transition-all duration-200 ${
                                    (pkg && seatCount >= pkg.available_seats) 
                                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                                        : 'bg-green-500 hover:bg-green-600 text-white shadow-md hover:shadow-lg'
                                }`}
                            >
                                +
                            </button>
                        </div>
                        
                        {/* Seat Availability Info */}
                        <div className="mt-2 flex justify-between items-center text-sm">
                            <span className="text-gray-400">
                                Available seats: <span className="font-semibold">{pkg?.available_seats}</span>
                            </span>
                            <span className="text-teal-600 font-medium">
                                Total: BDT {baseAmount}
                            </span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 mb-1">
                            Special Requests (Optional)
                        </label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Any special requirements or notes for your tour..."
                            className="textarea textarea-bordered w-full focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                            rows="4"
                        ></textarea>
                    </div>

                    {/* Discount Section */}
                    <div className="border border-gray-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold mb-3">Apply Discount</h3>

                        {!appliedDiscount ? (
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        placeholder="Enter discount code"
                                        value={discountCode}
                                        onChange={(e) => setDiscountCode(e.target.value.toUpperCase())}
                                        className="flex-1 input focus:outline-none focus:ring-2 focus:ring-teal-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={applyDiscount}
                                        disabled={discountLoading}
                                        className="btn bg-green-600 hover:bg-green-700 text-white px-6"
                                    >
                                        {discountLoading ? 'Applying...' : 'Apply'}
                                    </button>
                                </div>

                                {/* Available Discounts */}
                                {availableDiscounts.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-400 mb-2">Your available discount codes:</p>
                                        <div className="space-y-2">
                                            {availableDiscounts.map(discount => (
                                                <div key={discount._id} className="flex items-center justify-between p-2 rounded">
                                                    <div>
                                                        <span className="font-mono font-bold">{discount.discount_code}</span>
                                                        <span className="text-sm text-gray-400 ml-2">
                                                            - {discount.discount}% (Valid until {new Date(discount.valid_until).toLocaleDateString()})
                                                        </span>
                                                    </div>
                                                    <button
                                                        type="button"
                                                        onClick={() => {
                                                            setDiscountCode(discount.discount_code);
                                                            applyDiscount();
                                                        }}
                                                        className="text-sm bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                                                    >
                                                        Use
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center justify-between p-3 border border-green-200 rounded">
                                <div>
                                    <span className="font-semibold text-green-600">
                                        Discount Applied: {appliedDiscount.discount_code} (-{appliedDiscount.discount}%)
                                    </span>
                                    <p className="text-sm text-green-600">
                                        You saved BDT {discountAmount}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={removeDiscount}
                                    className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Price Summary */}
                    <div className="border border-blue-200 rounded-lg p-4">
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Base Price:</span>
                                <span className="font-medium">BDT {baseAmount}</span>
                            </div>
                            {appliedDiscount && (
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Discount ({appliedDiscount.discount}%):</span>
                                    <span className="font-medium text-green-600">-BDT {discountAmount}</span>
                                </div>
                            )}
                            <div className="flex justify-between border-t border-blue-200 pt-2">
                                <span className="text-gray-500 font-semibold">Total Amount:</span>
                                <span className="text-xl font-bold text-blue-600">BDT {totalAmount}</span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={paymentLoading}
                        className="w-full btn bg-teal-600 hover:bg-teal-700 text-white text-lg py-3 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {paymentLoading ? (
                            <div className="flex items-center justify-center gap-2">
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Processing...
                            </div>
                        ) : (
                            `Proceed to Payment - BDT ${totalAmount}`
                        )}
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
                            amount={totalAmount}
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