// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  const checkAuth = async () => {
    try {
      const res = await api.get('/api/auth/me');
      setIsAuthenticated(true);
      setUser(res.data);
    } catch (err) {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const loginSuccess = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  const logout = async () => {
    await api.post('/auth/logout');
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, loginSuccess, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
