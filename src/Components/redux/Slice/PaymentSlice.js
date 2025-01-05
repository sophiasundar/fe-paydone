import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { API } from '../../global';
import axios from 'axios';

// Async Thunks

// Create Payment
export const createPayment = createAsyncThunk(
  'payments/create',
  async ({ amount, razorpayPaymentId, razorpayOrderId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.post(
        `${API}/api/payment/`,
        { amount, razorpayPaymentId, razorpayOrderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      return response.data; // Contains payment data
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Fetch Payments
export const fetchPayments = createAsyncThunk(
  'payment/fetch',
  async (_, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem('token');
      
      // Check if the token exists, otherwise reject with an error
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      // Make the request with the token in the headers
      const response = await axios.get(`${API}/api/payment/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : error.message);
    }
  }
);


// Update Payment
export const updatePayment = createAsyncThunk(
  'payment/update',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.put(
        `${API}/api/payment/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Delete Payment
export const deletePayment = createAsyncThunk(
  'payment/delete',
  async (id, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.delete(
        `${API}/api/payment/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { id, message: response.data };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Create Razorpay Order
export const createRazorpayOrder = createAsyncThunk(
  'payments/createRazorpayOrder',
  async (amount, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.post(
        `${API}/api/payment/razorpay/checkout`,
        { amount },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Contains orderId
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// Verify Payment
export const verifyPayment = createAsyncThunk(
  'payments/verifyPayment',
  async ({ razorpayPaymentId, razorpayOrderId, razorpaySignature, amount }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No token found, please log in.');
      }

      const response = await axios.post(
        `${API}/api/payment/verify-payment`,
        {
          razorpayPaymentId,
          razorpayOrderId,
          razorpaySignature,
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Payment verification result
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);



// Payment Slice
const paymentSlice = createSlice({
  name: 'payments',
  initialState: {
    payments: [],
    razorpayOrderId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Payment
      .addCase(createPayment.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(createPayment.fulfilled, (state, action) => {
        state.status = 'success';
        state.payments.push(action.payload);
      })
      .addCase(createPayment.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Fetch Payments
      .addCase(fetchPayments.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPayments.fulfilled, (state, action) => {
        state.status = 'success';
        state.payments = action.payload;
      })
      .addCase(fetchPayments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Update Payment
      .addCase(updatePayment.fulfilled, (state, action) => {
        state.payments = state.payments.map((payment) =>
          payment._id === action.payload._id ? action.payload : payment
        );
      })
      .addCase(updatePayment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete Payment
      .addCase(deletePayment.fulfilled, (state, action) => {
        state.payments = state.payments.filter((payment) => payment._id !== action.payload.id);
      })
      .addCase(deletePayment.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Create Razorpay Order
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.razorpayOrderId = action.payload.orderId;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.error = action.payload;
      })
       // Handle payment verification
    .addCase(verifyPayment.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    })
    .addCase(verifyPayment.fulfilled, (state, action) => {
      state.status = 'success';
      // Optionally, store the verified payment details in state
      state.payments.push(action.payload); 
    })
    .addCase(verifyPayment.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    });
  },
});

export default paymentSlice.reducer;
