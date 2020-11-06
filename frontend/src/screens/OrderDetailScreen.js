import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { orderDetails } from  '../actions/orderActions';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';



const OrderDetailScreen = ({ match }) => {
    const dispatch = useDispatch();
    const orderInfo = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderInfo;
    

    
    if(!loading){
    // calculations
    const addDecimals = (num)=>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item)=> acc + item.price * item.qty, 0));
    }


    // add order.orderItems.length if this is empty push somewhere
    useEffect(()=>{
        if(!order || match.params.id !== order._id)
        dispatch(orderDetails(match.params.id));
    }, [order, match.params.id ])

    
   

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
      <div className="my-5">
       <h1>Your order ID: {order._id}</h1>
       <h3>Name: {order.user.name}</h3>
       <h3>Email: {order.user.email}</h3>
       <Row>
               <Col md={8}>
                 <ListGroup variant="flush">
                  <ListGroup.Item>
                      <h2>Shipping</h2>
                      <h5 className="font-weight-bold">Address</h5>
                      <p>{order.shippingAddress.address}, {order.shippingAddress.city}<br />
                         {order.shippingAddress.zipcode}, {order.shippingAddress.country}</p> 
                         {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> :
                      <Message variant="danger">Not yet delivered</Message>
                     } 
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <h2>Payment Method</h2>
                      <h5 className="font-weight-bold">Method: {order.paymentMethod}</h5>
                     {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> :
                      <Message variant="danger">Not Paid</Message>
                     }
                  </ListGroup.Item>

                  <ListGroup.Item>
                      <h2>Order Items</h2>
                      <ListGroup variant="flush">
                          {order.orderItems.map((item, index)=>{
                              return (
                          <ListGroup.Item key={index}>
                           <Row>
                               <Col md={1}>
                                <Image src={item.image} alt={item.name} fluid rounded />
                               </Col>
                               <Col>
                                 <Link to={`/product/${item.product}`}>
                                     {item.name}
                                 </Link>
                               </Col>
                               <Col md={4}>
                                   ({item.qty})  {item.price} : ${item.qty * item.price}
                               </Col>
                           </Row>
                          </ListGroup.Item> )
                          })}
                      </ListGroup>
                  </ListGroup.Item>
                </ListGroup>  
               </Col>
               <Col md={4}>
                   <Card>
                       <ListGroup variant="flush">
                           <ListGroup.Item>
                               <h2>Order Summary</h2>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Items</Col>
                                   <Col>${order.itemsPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Shipping</Col>
                                   <Col>${order.shippingPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Tax</Col>
                                   <Col>${order.taxPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                           <ListGroup.Item>
                               <Row>
                                   <Col>Total</Col>
                                   <Col>${order.totalPrice}</Col>
                               </Row>
                           </ListGroup.Item>
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
      </div>
    )
}

export default OrderDetailScreen
