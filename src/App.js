import { Route, Routes } from 'react-router-dom';
import './App.css';
import React, { useEffect } from 'react';
import {  useSelector } from 'react-redux';
import Login from './Components/Pages/Login';
import Register from './Components/Pages/Register';
import Dashboard from './Components/Pages/Dashboard';
import PaymentComponent from './Components/Pages/PaymentComponent';
import ProtectedRoute from './Components/ProtectedRoute/route';

function App() {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [theme]);
  

  return (
    <div  className= {` ${theme === 'light' ? 'bg-white' : 'bg-gray-900'} transition-all`}>
           <Routes>
           <Route path='/' element={<Login/>}></Route>
        <Route path='/register' element={<Register/>}></Route>

        <Route
        path="/home"
        element={
          <ProtectedRoute>
            <PaymentComponent/> 
          </ProtectedRoute>
        }
      />

        <Route path='/payment-record' element={
          <ProtectedRoute>
          <Dashboard/>
         </ProtectedRoute>
          }></Route>
        
        </Routes>
    </div>
  );
}

export default App;
