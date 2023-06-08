import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './Logincard';
import '../App.css'

import Auth from '../utils/auth';
import Homepage from '../pages/Homepage';
import Journal from '../pages/Journal';
import Profile from '../pages/Profile';
import Header from './Header';
// import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
// import SignUpForm from './SignupForm';
// import LoginForm from './Logincard';
// import Auth from '../utils/auth';

// function AppNavbar({ currentPage, handlePageChange}) {
//     return (
//         <>
// <nav>
  
//   <a href="#Profile"
//   onClick={() => handlePageChange("Profile")}
//   className={
//     currentPage === "Profile" ? "nav-link active" : "nav-link"
//   }
//   >Profile</a>
//   <a href="#Journal"
//   onClick={() => handlePageChange("Journal")}
//   className={
//     currentPage === "Journal" ? "nav-link active" : "nav-link"
//   }
//   >Journal</a>
//   <a href="#Home-page"
//   onClick={() => handlePageChange("Homepage")}
//   className={
//     currentPage === "Homepage" ? "nav-link active" : "nav-link"
//   }
//      >Home</a>
// </nav> 
// </>
//     );
//     }

// export default Nav;

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
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          {/* <Modal.Header closeButton> */}
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                {/* <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item> */}
              </Nav>
            </Modal.Title>
          {/* </Modal.Header> */}
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;