import React, { useState } from 'react';
import './Signup.css';
import Logo from '../../components/logo/Logo';
import { Link, useNavigate } from 'react-router-dom'
import { useSignup } from '../../hooks/signup/useSignup';
import GlareHover from '../../components/animations/glarehover/GlareHover';
import Ballpit from '../../components/animations/lightning/Ballpit';
import { toast } from 'react-toastify';


const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useSignup();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await signup(formData);

  if (result.success) {
    toast.success("Signup successful! Please login 🎉");
    navigate("/login");
  } else {
    toast.error(result.error || "Signup failed.");
  }
};


  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0e0e0e 0%, #1a0033 50%, #000000 100%)',
      }}
    >
      {/* 🎯 Background Ballpit */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      >
        <Ballpit
          count={200}
          gravity={0.7}
          friction={0.8}
          wallBounce={0.95}
          followCursor={true}
        />
      </div>

      {/* ✨ Centered Signup Form */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          width: '100%',
          maxWidth: '520px',
        }}
      >
        <GlareHover
          glareColor="#ffffff"
          glareOpacity={0.3}
          glareAngle={-30}
          glareSize={300}
          transitionDuration={800}
          playOnce={false}
        >
          <form className="signup-form" onSubmit={handleSubmit}>
            <Logo />
            <h2 className="title">TechBot AI</h2>
            <p className="subtitle">Your intelligent shopping assistant</p>

            <span>Username</span>
            <input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleChange}
              required
            />

            <span>Email</span>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <span>Password</span>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <span>Confirm Password</span>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />

            <button type="submit">Sign Up</button>

            <p className="switch-link">
              Already have an account? <Link to='/login'>Login</Link>
            </p>
          </form>
        </GlareHover>
      </div>
    </div>
  );
};

export default Signup;
