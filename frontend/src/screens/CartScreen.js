import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import  Message  from '../components/bootstrapHelpers/Message';
import { addToCart } from '../actions/cartActions';

const CartScreen = ({ match, location, history }) => {

    const productId = match.params.id;
    
    // get the qty out of url..check if search exists "?" then split into arr with 2 indx, everything beyond "=" will be indx 1
    const qty = location.search ? location.search.split('=')[1] : 1;
    Number(qty);

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(()=>{
        if(productId){
            dispatch(addToCart(productId, qty));
        }
       
    }, [dispatch, productId, qty]);
 
    
   
    const removeFromCartHandler = (id)=>{
       console.log('dffsd')
    }

    // string to int
    const testArr = [];
    const itemQtyToInt = ()=>{
      return cartItems.map((item)=>{
          testArr.push(Number(item.qty))
      })
    }
    itemQtyToInt();
      
    const renderSubTotal = ()=>{
            const reducer = (accumulator, currentValue) => accumulator + currentValue;
            return testArr.reduce(reducer) 
    }

    return (
       <Row className ="my-5">
            <Col md={8}>
                <h1>Shopping Cart</h1>
              {cartItems.length === 0 ? (
                   <Message>
                       Your Cart is empty <Link to="/"> Go Back</Link>
                        </Message>
                         ) : (
                  <ListGroup variant = "flush">
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                           <Row>
                               <Col md={2}>
                                   <Image src={item.image} alt={item.name} fluid rounded />
                               </Col>
                               <Col md={3}>
                                 <Link to={`/product/${item.product}`}>{item.name}</Link>
                               </Col>
                               <Col md={2}>
                                   {item.price}
                               </Col>
                               <Col md={2}>
                               <Form.Control as="select" value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, Number(e.target.value)))}>
                              {[...Array(item.countInStock).keys()].map((idx)=> (
                                  <option key={idx + 1} value={idx + 1}>
                                    {idx + 1}
                                  </option>
                              ))}
                              </Form.Control>
                               </Col>
                               <Col md={2}>
                                   <Button type="button" variant="light" onClick={()=> removeFromCartHandler(item.product)}><i className="fas fa-trash"></i></Button>
                               </Col>
                           </Row>
                        </ListGroup.Item>
                    ))}
                  </ListGroup>
              )}
            </Col> 
            <Col md={4}>
             <Card>
                 <ListGroup variant="flush">
                   <ListGroup.Item>
                       <h3>Subtotal {renderSubTotal()} items</h3>
                   </ListGroup.Item>
                 </ListGroup>
             </Card>
            </Col>
         </Row>  
             
          
    
    )
    }
    
    
    

export default CartScreen;
