import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserDetails, updateUserDetails } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { USER_UPDATE_RESET } from '../actions/types';


const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    
     const dispatch = useDispatch();
     const userDetails = useSelector(state => state.userDetails);
     const { loading, error, user } = userDetails;

     const userLogin = useSelector(state => state.userLogin);
     const { userInfo } = userLogin;

     const userProfileUpdate = useSelector(state => state.userProfileUpdate);
     const { success } = userProfileUpdate;

     const orderListMy = useSelector(state => state.orderListMy);
     const { orders, loading:listLoading, error:listError } = orderListMy;

     
      
     useEffect(()=>{
        if(!userInfo){
            history.push('/login')
        }else if(!user.name){
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(getUserDetails('profile'));
            dispatch(listMyOrders());
        }else{
            setName(user.name)
            setEmail(user.email)
        }


    }, [userInfo, history, dispatch, user, success ])

       console.log(orders)

    const renderPasswordError = ()=>{
        if(passwordError){
            return <Message variant="danger">Passwords do not match</Message>
        }
    }
   
    const submitHandler = async(e)=>{
        e.preventDefault();
        if(password !== verifyPassword){
            setPasswordError(true);
        }else{
          dispatch(updateUserDetails({ id: user._id, name, email, password }));
         }
        }
       

    

       


    return (
         <Row className="my-5">
        <Col md={3}>
        <h3>Update Profile</h3>
            {success && <Message variant="success">Profile Updated</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {renderPasswordError()}
            {loading && <Loader />}
            <small>You can update your name, email or password. You do not need to enter in your password if you are updating your name & or email.</small>
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter name"
                     value={name} 
                     onChange={(e)=> setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email"
                     value={email} 
                     onChange={(e)=> setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Update Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                     value={password} 
                     onChange={(e)=> setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="verifyPassword">
                    <Form.Label>Update Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                     value={verifyPassword} 
                     onChange={(e)=> setVerifyPassword(e.target.value)} />
                </Form.Group>

                 <Button variant="primary" type="submit">
                    Update
                </Button>
            </Form>
        </Col>
        <Col md={9}> 
            <h2>My Orders</h2>
            {listError ? <Message variant="danger">{listError}</Message> :
             listLoading ? <Loader /> : (
                 <Table striped bordered hover responsive className="table-sm">
                     <thead>
                         <tr>
                             <th>ID</th>
                             <th>DATE</th>
                             <th>TOTAL</th>
                             <th>PAID</th>
                             <th>DELIVERED</th>
                         </tr>
                     </thead>
                     <tbody>
                         {orders.map(order => (
                          <tr key={order._id}>
                              <td>{order._id}</td>
                              <td>{order.createdAt.substring(0,10)}</td>
                              <td>{order.totalPrice}</td>
                              <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                  <i className="fas fa-times" style={{color: 'red'}}></i>
                              )}</td>
                               <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                  <i className="fas fa-times" style={{color: 'red'}}></i>
                              )}</td>
                              <td>
                                  <LinkContainer to={`/order/${order._id}`}>
                                      <Button className="btn-sm" variant='light'>Details</Button>
                                  </LinkContainer>
                                  </td>
                          </tr>
                         ))}
                     </tbody>
                 </Table>
             )}
        </Col>
    </Row>
      
    )     
    
}

export default ProfileScreen

