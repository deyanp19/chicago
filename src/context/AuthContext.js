// c:\Users\deyan\projects\chicago\src\context\AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);  // Store the token for persistence

  // Check for token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');  // {{change 1}} Load token from local storage
    if (storedToken) {
      verifyToken(storedToken);  // Verify the token
    }
  }, []);

  const login = async (credentials) => {
    try {
      const response = await fetch('/api/auth', {  // Assuming your backend endpoint is /api/auth
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (response.ok && data.token) {  // {{change 2}} Check for successful response
        localStorage.setItem('authToken', data.token);  // Store the token
        setToken(data.token);
        setIsLoggedIn(true);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setIsLoggedIn(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');  // {{change 3}} Remove token from storage
    setToken(null);
    setIsLoggedIn(false);
  };

  const verifyToken = async (token) => {
    try {
      const response = await fetch('/api/auth/verify', {  // Optional: Add a verify endpoint if needed
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        setIsLoggedIn(true);
        setToken(token);
      } else {
        logout();  // Token is invalid or expired
      }
    } catch (error) {
      console.error('Token verification error:', error);
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}