import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './Logincard';
import '../App.css'

import Auth from '../utils/auth';

// Navbar component

const AppNavbar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg' >
        <Container fluid>
          {/* <Navbar.Toggle aria-controls='navbar' /> */}
          <Navbar.Collapse id='navbar' className='d-flex flex-row-reverse'>
            <Nav className='ml-auto d-flex'>
              {/* if user is logged in show saved books and logout */}
              {Auth.loggedIn() ? (
                <>
              <Nav.Link as={Link} to='/profile'>
               Profile
              </Nav.Link>
                  <Nav.Link as={Link} to='/saved'>
                    Journal
                  </Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>Login or Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* set modal data up */}
      <Modal id='modal'
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          {/* <Modal.Header closeButton> */}
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
              </Nav>
            </Modal.Title>
          {/* </Modal.Header> */}
          <Modal.Body>
            <Tab.Content className='rowchange'>
              <div className='col-md-6'>
              <Tab.Pane  eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              </div>
              <div className='col-md-6'>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              </div>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;