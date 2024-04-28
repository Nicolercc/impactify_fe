import React from 'react';
import { useAuthDataProvider } from '../../Provider/AuthProv' 
import { Button } from 'react-bootstrap';

function Logout({isAuthenticated}) {
    const { logout } = useAuthDataProvider();
  
    const handleLogout = () => {
      console.log('youve logged out' + isAuthenticated)
      logout(); // Call the logout function
    };
  
    return (
      <button onClick={handleLogout} style={{ backgroundColor: '#BC9EC1', borderColor:'#4E2855', color:'black', borderRadius: '20px'}}>Logout</button>
    );
  }
  
  export default Logout;