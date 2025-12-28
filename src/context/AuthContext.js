import  { createContext, useState, useEffect } from 'react';
import requestMethods from '../../utils/requestMethods';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);  // Store the token for persistence
  const [user, setUser] = useState({});

  // Check for token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); 
    const storedUserData = localStorage.getItem('userData');

    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      if (storedUserData) {
          setUser(JSON.parse(storedUserData));
        }
    }
  }, []);

  const login = async (credentials) => {
 
      const response = await requestMethods.loginRequest({
        email: credentials.get('email'),
        password: credentials.get('password'),
      });
    
      
      if (response.ok ) { 
        const token = response.headers.get('x-auth-token');
        localStorage.setItem('authToken', token);  // Store the token
        setToken(token);
        setIsLoggedIn(true);
        const userData = await response.json();  
        localStorage.setItem('userData',JSON.stringify(userData));
        setUser(userData); 
      } else {
        throw new Error(`Login failed: ${response.status} - ${await response.text()}`); 
      }
      
      return response
  };

  const logout = () => {
    localStorage.removeItem('authToken');  // {{change 3}} Remove token from storage
    setToken(null);
    setIsLoggedIn(false);
    setUser('');
    localStorage.removeItem('userData');
  };


  return (
    <AuthContext.Provider value={{ isLoggedIn,user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}