import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPayments, deletePayment, updatePayment } from '../redux/Slice/PaymentSlice';
import PaymentForm from './PaymentForm';
import TopBar from './TopBar';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { payments, status, error } = useSelector((state) => state.payments);
  const [editMode, setEditMode] = useState(false);
  const [currentPayment, setCurrentPayment] = useState(null);
  const theme = useSelector((state) => state.theme.theme);


  useEffect(() => {
    dispatch(fetchPayments());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePayment(id));
  };

  const handleEdit = (payment) => {
    setEditMode(true);
    setCurrentPayment(payment);
  };

  const handleUpdate = (paymentData) => {
    dispatch(updatePayment(paymentData));
    setEditMode(false);
    setCurrentPayment(null);
  };

  return (
    
    <div className={`p-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      <TopBar/>
      <h1 className="text-2xl font-bold mb-4">Payments Record Dashboard</h1>
     
      <PaymentForm
        onSubmit={editMode ? handleUpdate : null}
        editMode={editMode}
        payment={currentPayment}
      />
      {status === 'loading' && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error.message || error}</p>}
      <table  className={`min-w-full border border-gray-200 mt-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-gray-900 text-white'}`}>
      
        <thead>
          <tr>
            <th className="py-2 border-b">Payment ID</th>
            <th className="py-2 border-b">Amount</th>
            <th className="py-2 border-b">Status</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment._id}>
              <td className="py-2 border-b">{payment._id}</td>
              <td className="py-2 border-b">{payment.amount}</td>
              <td className="py-2 border-b">{payment.status}</td>
              <td className="py-2 border-b">
                <button
                  className="bg-blue-500 text-white px-4 py-1 mr-2 rounded"
                  onClick={() => handleEdit(payment)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-1 rounded"
                  onClick={() => handleDelete(payment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
