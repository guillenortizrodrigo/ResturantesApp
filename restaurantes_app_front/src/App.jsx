import React from 'react'
import { ToastContainer } from 'react-toastify';
import { Button } from 'react-bootstrap';
import "./App.scss"
import Navigation from './routes/Navigation';
import { AuthProvider } from './context/AuthContext';

export default function App() {
  return (
    <AuthProvider>
      <Navigation />
      <ToastContainer
        position='bottom-center'
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
      />
    </AuthProvider>
  )
}

