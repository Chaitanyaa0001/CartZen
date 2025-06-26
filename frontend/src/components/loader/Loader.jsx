// src/components/Loader.jsx
import React from 'react';
import './Loader.css';

const Loader = () => {
  return (
    <div className="loader-wrapper">
      <div className="purple-spinner"></div>
      <p className="loader-text">Loading...</p>
    </div>
  );
};

export default Loader;
