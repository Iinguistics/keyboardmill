import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PayPalButton } from 'react-paypal-button-v2';
import { Link } from 'react-router-dom';
import { orderDetails, payOrder } from  '../actions/orderActions';
import { Button, Row, Col, ListGroup, Image, Card } from 'react-bootstrap';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import axios from 'axios';
import { ORDER_PAY_RESET } from '../actions/types';

const OrderDetailScreen = ({ match }) => {
    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderInfo = useSelector(state => state.orderDetails);
    const { loading, order, error } = orderInfo;

    const orderPay = useSelector(state => state.orderPay);
    const { loading:loadingPay, success:successPay } = orderPay;
    

    
    if(!loading){
    // calculations
    const addDecimals = (num)=>{
        return (Math.round(num * 100) / 100).toFixed(2)
    }
    order.itemsPrice = addDecimals(order.orderItems.reduce((acc, item)=> acc + item.price * item.qty, 0));
    }


    // add order.orderItems.length if this is empty push somewhere
    useEffect(()=>{
        // if(!order || match.params.id !== order._id){
        //     dispatch(orderDetails(match.params.id));
        // }
      
        const addPayPalScript = async()=>{
            //renaming data to clientId
            const { data: clientId } = await axios.get('/api/config/paypal');
            const script = document.createElement('script');
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = ()=>{
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }
        
        if(!order || successPay){
            dispatch({ type: ORDER_PAY_RESET });
            dispatch(orderDetails(match.params.id));
        }else if(!order.isPaid){
            if(!window.paypal){
                addPayPalScript();
            }else{
                setSdkReady(true);
            }
        }
        
    }, [order, match.params.id, dispatch, successPay ])


    const successPaymentHandler = (paymentResult)=>{
        dispatch(payOrder(match.params.id, paymentResult));
    }


    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
      <div className="my-5">
       <h3>Your order ID: {order._id}</h3>
       <h4>Name: {order.user.name}</h4>
       <h4>Email: {order.user.email}</h4>
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
                           {!order.isPaid && (
                               <ListGroup.Item>
                                   {loadingPay && <Loader />}
                                   {!sdkReady ? <Loader /> : (
                                       <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler} />
                                   )}
                               </ListGroup.Item>
                           )}
                       </ListGroup>
                   </Card>
               </Col>
           </Row>
      </div>
    )
}

export default OrderDetailScreen
