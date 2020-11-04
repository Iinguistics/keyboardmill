import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';


  const Header = ()=>{
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo);


    const logoutHandler = ()=>{
       dispatch(logout())
    }

   

    const renderUserInfo = ()=>{
      if(userInfo){
        return(
        <NavDropdown  title={ userInfo.name } id="username">
         <LinkContainer to="/profile">
           <NavDropdown.Item>Profile</NavDropdown.Item>
         </LinkContainer>
         <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
        </NavDropdown>
        )
      }else{
        return(
          <LinkContainer to="/login">
          <Nav.Link>
            <i className="fas fa-user"></i>Sign In</Nav.Link>
          </LinkContainer>
        )
      }
    }

    return(
      <header>
         <Navbar expand="lg" collapseOnSelect fixed="top" className="bg">
             <Container>
               <LinkContainer to="/">
                 <Navbar.Brand>Keyboardmill</Navbar.Brand>
                 </LinkContainer>
               <Navbar.Toggle aria-controls="basic-navbar-nav" />
               <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto">
                      <LinkContainer to="/cart">
                      <Nav.Link><i className="fas fa-shopping-cart"></i>Cart</Nav.Link>
                      </LinkContainer>
                      {renderUserInfo()}
                    </Nav>
               </Navbar.Collapse>    
             </Container>
        </Navbar>
      </header>
    )
}

export default Header;