import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPayment } from '../redux/Slice/PaymentSlice';

const PaymentForm = ({ onSubmit, editMode, payment }) => {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('Pending');
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    if (editMode && payment) {
      setAmount(payment.amount);
      setStatus(payment.status);
    }
  }, [editMode, payment]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      onSubmit({ id: payment._id, amount, status });
    } else {
      dispatch(createPayment({ amount, status }));
    }
    setAmount('');
    setStatus('Pending');
  };

  return (
    <div  className={`min-w-full border border-gray-200 mt-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>

      <h2 className="text-xl font-bold mb-2">{editMode ? 'Edit Payment' : 'Add Payment'}</h2>
      <form onSubmit={handleSubmit} className={`bg-gray-100 p-4 rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Amount</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
            placeholder="Enter amount"
            required
          />
        </div>
        <div className="mb-2">
          <label className="block text-sm font-medium mb-1">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full px-3 py-2 border rounded ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          {editMode ? 'Update Payment' : 'Add Payment'}
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
