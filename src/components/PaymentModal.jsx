import React, { useState, useEffect } from 'react';
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';
import Swal from 'sweetalert2';

const PaymentModal = ({ 
  isOpen, 
  onClose, 
  amount, 
  packageName, 
  bookingData,
  onPaymentSuccess,
  clientSecret 
}) => {
  const stripe = useStripe();
  const elements = useElements();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [cardValid, setCardValid] = useState({
    number: false,
    expiry: false,
    cvc: false
  });

  // Stripe element options
  const elementOptions = {
    style: {
      base: {
        fontSize: '16px',
        color: '#424770',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        '::placeholder': {
          color: '#aab7c4',
        },
      },
      invalid: {
        color: '#9e2146',
      },
    },
  };

  // Debug info
  useEffect(() => {
    if (isOpen) {
      console.log('=== PAYMENT MODAL DEBUG ===');
      console.log('Stripe loaded:', !!stripe);
      console.log('Elements loaded:', !!elements);
      console.log('Client Secret:', clientSecret ? '✅ Available' : '❌ Missing');
      
      if (elements) {
        console.log('Elements instance:', elements);
      }
    }
  }, [isOpen, stripe, elements, clientSecret]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setErrorMessage('Payment system is loading. Please wait...');
      return;
    }

    setIsLoading(true);
    setErrorMessage('');

    try {
      const cardElement = elements.getElement(CardNumberElement);
      
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: bookingData?.buyer_name || 'Customer',
            email: bookingData?.buyer_email,
          },
        }
      });

      if (error) {
        setErrorMessage(error.message);
      } else if (paymentIntent.status === 'succeeded') {
        await onPaymentSuccess(paymentIntent.id);
        onClose();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage('Payment failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCardChange = (field) => (event) => {
    setCardValid(prev => ({
      ...prev,
      [field]: event.complete
    }));
    setErrorMessage(event.error?.message || '');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full">
        <div className="bg-teal-600 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">Complete Payment</h3>
            <button onClick={onClose} className="text-white text-2xl">×</button>
          </div>
          <p className="font-semibold">{packageName}</p>
          <p className="text-lg">BDT {amount}</p>
        </div>

        <div className="p-6">
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded">
            <p className="text-blue-800 text-sm">
              <strong>Test:</strong> যদি card fields না দেখায়, Stripe key check করো
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Card Number */}
            <div>
              <label className="block text-sm font-medium mb-2">Card Number</label>
              <div className="p-3 border border-gray-300 rounded">
                <CardNumberElement 
                  options={elementOptions}
                  onChange={handleCardChange('number')}
                />
              </div>
            </div>

            {/* Expiry & CVC */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Expiry</label>
                <div className="p-3 border border-gray-300 rounded">
                  <CardExpiryElement 
                    options={elementOptions}
                    onChange={handleCardChange('expiry')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">CVC</label>
                <div className="p-3 border border-gray-300 rounded">
                  <CardCvcElement 
                    options={elementOptions}
                    onChange={handleCardChange('cvc')}
                  />
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="text-red-500 text-sm bg-red-50 p-2 rounded">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!stripe || isLoading}
              className="w-full btn bg-teal-600 text-white py-3"
            >
              {isLoading ? 'Processing...' : `Pay BDT ${amount}`}
            </button>
          </form>

          {/* Test Card Info */}
          <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded">
            <h4 className="font-semibold text-yellow-800 mb-2">Test Card:</h4>
            <div className="text-sm text-yellow-700">
              <p>4242 4242 4242 4242</p>
              <p>12/34 • 123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;