import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

// ProtectedRoute component to protect routes
const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((state) => state.auth); // Getting the user from Redux store

  // If user is not authenticated, redirect to login page
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user is authenticated, render the protected component
  return children;
};

export default ProtectedRoute;
