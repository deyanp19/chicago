import  { createContext, useState, useEffect } from 'react';
import requestMethods from '../../utils/requestMethods';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);  // Store the token for persistence

  // Check for token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');  // {{change 1}} Load token from local storage
  }, []);

  const login = async (credentials) => {
 
      const response = await requestMethods.loginRequest({
        email: credentials.get('email'),
        password: credentials.get('password'),
      });
    
      
      if (response.ok ) { 
        const token = response.headers.get('x-auth-token');
        console.log(response.ok,token);
        localStorage.setItem('authToken', token);  // Store the token
        setToken(token);
        setIsLoggedIn(true);
      } else {
        throw new Error('Login failed');
      }
      
      return response
  };

  const logout = () => {
    localStorage.removeItem('authToken');  // {{change 3}} Remove token from storage
    setToken(null);
    setIsLoggedIn(false);
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}