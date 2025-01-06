import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createRazorpayOrder, verifyPayment } from '../redux/Slice/PaymentSlice';
import TopBar from './TopBar';

const PaymentComponent = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.theme);
  const [amount, setAmount] = useState(5); // Example amount in INR
  console.log("PaymentComponent is rendering");
  const handlePayment = async () => {
    try {
      // Step 1: Create Razorpay Order
      const razorpayOrderResponse = await dispatch(createRazorpayOrder(amount));
      const orderId = razorpayOrderResponse.payload.orderId;

      // Step 2: Initialize Razorpay Payment Gateway
      const options = {
        key: process.env.FE_RAZORPAY_KEY_ID, // Use your Razorpay key
        amount: amount * 100, // Amount in paise
        currency: 'INR',
        order_id: orderId,
        handler: function (response) {
          const razorpayPaymentId = response.razorpay_payment_id;
          const razorpayOrderId = response.razorpay_order_id;
          const razorpaySignature = response.razorpay_signature;

          // Step 3: Verify Payment on the backend using Redux action
          dispatch(verifyPayment({
            razorpayPaymentId,
            razorpayOrderId,
            razorpaySignature,
            amount
          }));
        },
        prefill: {
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        theme: {
          color: '#F37254',
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Error during payment creation:', error);
    }
  };

  return (
    <div className={`p-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <TopBar />
      <div className={`max-w-lg mx-auto mt-20 ${theme === 'light' ? 'bg-white' : 'bg-gray-800'} rounded-lg shadow-lg p-8 mb-20`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          Complete Your Payment
        </h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Amount: ₹{amount}</h3>
          <p className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Please proceed with the payment to continue.</p>
        </div>
        
        <div className="text-center">
          <button
            onClick={handlePayment}
            className="bg-[#F37254] text-white px-6 py-3 rounded-full shadow-md text-lg hover:bg-[#f56548] transition duration-300"
          >
            Pay Now
          </button>
        </div>
        
        <div className="mt-6 mb-6 text-center">
          <p className={`${theme === 'light' ? 'text-gray-500' : 'text-gray-400'}`}>By clicking "Pay Now", you agree to our terms and conditions.</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentComponent;


