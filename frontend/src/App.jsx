import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import Chatbot from './pages/chatbot/Chatbot';
import ProtectedRoute from './components/protectroutes/ProtectedRoutes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/chatbot" element={ <ProtectedRoute><Chatbot /></ProtectedRoute>} />
      </Routes>
    </Router>
     <ToastContainer position="top-right" autoClose={3000} theme="dark" />
    </>
  );
};

export default App;
