import React, { useState } from 'react';
import './Login.css';
import Logo from '../../components/logo/Logo';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../../hooks/login/useLogin';
import GlareHover from '../../components/animations/glarehover/GlareHover';
import Ballpit from '../../components/animations/lightning/Ballpit';
import { useAuth } from '../../AuthContext/useAuth';
import { toast } from 'react-toastify';

const Login = () => {
  const { login } = useLogin();
  const navigate = useNavigate();
  const {loginSuccess}  = useAuth()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const result = await login(formData);

  if (result.success) {
    loginSuccess(result.data);
    toast.success("Login Successful! 🎉");
    navigate("/chatbot");
  } else {
    toast.error(result.error || "Login failed.");
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
      {/* 🎯 Ballpit Background */}
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

      {/* ✨ Centered Login Form with GlareHover only on form */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          zIndex: 1,
          width: '100%',
          maxWidth: '520px',
          padding: '20px',
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
          <div style={{ width: '100%', overflow: 'visible' }}>
            <form className="login-form" onSubmit={handleSubmit}>
              <Logo />
              <h2 className="title">TechBot AI</h2>
              <p className="subtitle">Welcome back! Please sign in</p>

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

              <button type="submit">Login</button>
              <p className="switch-link">
                Don’t have an account? <Link to="/">Sign Up</Link>
              </p>
            </form>
          </div>
        </GlareHover>
      </div>
    </div>
  );
};

export default Login;
