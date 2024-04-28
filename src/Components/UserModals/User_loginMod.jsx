import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './User_loginCss.css'


function User_loginMod({show, onHide}) {
  const navigate = useNavigate()

  const handleSignUp = (event) => {
    navigate('/discover/users/signup', { state: { from: location.pathname } } )
  };
  const handleLogin = (event) => {
    navigate('/discover/users/login', { state: { from: location.pathname } })
  }
  const handleGoBack = (event) => {
    navigate('/')
  }

  return (
    <Modal
      className='event-login-modal'
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter" >
          Are you Logged In?
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>I am Ready to Make an Impact!</h4>
      </Modal.Body>
      <Modal.Footer className='justify-content-center'>
      <Button variant="secondary" onClick={handleLogin}>Login</Button>
          <Button variant="primary" onClick={handleSignUp}>Join!</Button>
          <Button variant="primary" onClick={handleGoBack}>Back</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default User_loginMod;