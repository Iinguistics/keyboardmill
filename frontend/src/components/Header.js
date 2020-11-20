import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';


  const Header = ()=>{
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userLogin.userInfo);


    const logoutHandler = ()=>{
       dispatch(logout());
      
    }


    const adminView = ()=>{
      if(userInfo.isAdmin){
        return(
          <Fragment>
           <LinkContainer to="/admin/userlist">
          <NavDropdown.Item>View Users</NavDropdown.Item>
          </LinkContainer>

           <LinkContainer to="/admin/productlist">
           <NavDropdown.Item>Products</NavDropdown.Item>
           </LinkContainer>

           <LinkContainer to="/admin/orderlist">
           <NavDropdown.Item>Orders</NavDropdown.Item>
           </LinkContainer>
          </Fragment>
        )
      }
    }

   

    const renderUserInfo = ()=>{
      if(userInfo){
        return(
        <NavDropdown  title={ userInfo.name } id="username">
         <LinkContainer to="/profile">
           <NavDropdown.Item>Profile</NavDropdown.Item>
         </LinkContainer>
         {adminView()}
         <NavDropdown.Item onClick={()=> logoutHandler()}>Logout</NavDropdown.Item>
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
               <Route render={({ history })=> <SearchBox history = {history} />} />
                    <Nav className="ml-auto">
                      <LinkContainer to="/cart">
                      <Nav.Link><i className="fas fa-shopping-bag"></i>Bag</Nav.Link>
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