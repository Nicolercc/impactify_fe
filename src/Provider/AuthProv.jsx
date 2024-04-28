import React, { useContext, createContext, useState, useEffect } from "react";
import axios from "axios";


export const AuthData = createContext();

export function useAuthDataProvider() {
  return useContext(AuthData);
}

function AuthProv({ children }) {
  const [ eventId, setEventId]= useState(null)
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  });


  const API = axios.create({
    baseURL: "http://localhost:4000",
    headers: {
      "Content-Type": "application/json",
      // Authorization: token ? `Bearer ${token}` : "",
    },
  });

  useEffect(() => {
    //always has the most recent token
    API.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : ""
  }, [token])

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.log('user auth', user)
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const isAuthenticated = !!user && !!token;

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');

  };

  return (
    <AuthData.Provider
      value={{ API, user, setUser, token, setToken, isAuthenticated, logout ,eventId, setEventId}}
    >
      {children}
    </AuthData.Provider>
  );
}

export default AuthProv;
