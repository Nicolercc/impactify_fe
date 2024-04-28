import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [socket, setSocket] = useState(null);
  const [lastHeartbeat, setLastHeartbeat] = useState(Date.now());

  useEffect(() => {
    // Create socket instance
    const socketInstance = io(backendURL, {
      withCredentials: true,
      transports:['websocket', 'polling']
    });

    // Event listeners
    socketInstance.on('connect', () => {
      console.log('Connected to the socket!');
    });

    socketInstance.on('testEvent', (data) => {
      console.log(data.msg);
    });

    socketInstance.on('heartbeat', (data) => {
      console.log('Heartbeat received:', data.timestamp);
      setLastHeartbeat(data.timestamp);
    });

    socketInstance.on('disconnect', (reason) => {
      console.log('Disconnected:', reason);
    });

    socketInstance.on('connect_error', (error) => {
      console.error('Connection error: Somethings wrong with my backend', error);
    });

    // Set the socket instance in state
    setSocket(socketInstance);

    // Cleanup function to remove event listeners and disconnect socket when the component unmounts
    return () => {
      socketInstance.off('connect');
      socketInstance.off('testEvent');
      socketInstance.off('heartbeat');
      socketInstance.off('disconnect');
      socketInstance.off('connect_error');
      socketInstance.disconnect();
    };
  }, [backendURL]); // The effect depends on the backendURL, if it changes, reconnect

  // Provide the socket and lastHeartbeat to consumers
  return (
    <SocketContext.Provider value={{ socket, lastHeartbeat }}>
      {children}
    </SocketContext.Provider>
  );
};
