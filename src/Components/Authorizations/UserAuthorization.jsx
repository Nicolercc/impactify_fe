import React, { useState } from 'react';
import axios from 'axios';

const backend = import.meta.env.VITE_BACKEND_UR

const loginUser = async (username, password) => {
  try {
    const response = await axios.post(`${backend}/login`, { username, password });
    const token = response.data.token;
    // Store the token
    localStorage.setItem('authToken', token);
    return token;
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = async (username, password) => {
    const token = await loginUser(username, password);
    if (token) {
      setIsLoggedIn(true);
      // Set up axios to use the token for all future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    delete axios.defaults.headers.common['Authorization'];
  };

  return { isLoggedIn, login, logout };
};

// Usage within a component
const App = () => {
  const { isLoggedIn, login, logout } = useAuth();

  const handleLogin = () => {
    login('username', 'password'); // Replace with actual login form inputs
  };

  return (
    <div>
      {isLoggedIn ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={handleLogin}>Login</button>
      )}
    </div>
  );
};

export default App;
