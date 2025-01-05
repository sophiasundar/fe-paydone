import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../redux/Slice/AuthSlice';
import paymentReducer from '../redux/Slice/PaymentSlice';
import themeReducer from '../redux/Slice/ThemeSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    payments: paymentReducer,
    theme: themeReducer, 
  },
});

export default store;
