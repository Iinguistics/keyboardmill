import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, ListGroup, Form } from 'react-bootstrap';
import Rating from '../components/Rating';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct, createProductReview } from '../actions/productActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/types';
import { useToasts } from 'react-toast-notifications';
import Meta from '../components/Meta';


const ProductScreen = ({ match, history })=>{
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("");
    const [orderItems, setOrderItems] = useState([]);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const singleProduct = useSelector(state => state.singleProduct);
    const { loading, error, product } = singleProduct;

    const createProductReviewState = useSelector(state => state.createProductReview);
    const { loading:reviewLoading, error:reviewError, success } = createProductReviewState;



    const { addToast } = useToasts();


    
   
    useEffect(()=>{
        dispatch(fetchProduct(match.params.id));
       
        if(success){
            addToast(`${product.name} has now been reviewed`, {
                appearance: 'success'
            });
            setRating(0);
            setComment("");
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        }, [dispatch, success]);

        
       
         


        const selectQty = ()=>{
            if(product.countInStock > 0){
                return(
                    <ListGroup.Item>
                      <Row>
                          <Col>Qty</Col>
                          <Col>
                          <Form.Control as="select" value={qty} onChange={(e)=> setQty(e.target.value)}>
                              {[...Array(product.countInStock).keys()].map((idx)=> (
                                  <option key={idx + 1} value={idx + 1}>
                                    {idx + 1}
                                  </option>
                              ))}
                              </Form.Control>
                              </Col>
                      </Row>
                    </ListGroup.Item>
                )
            }
        }

        const addItemToCart = ()=>{
          history.push(`/cart/${match.params.id}?qty=${qty}`)
        }


        const submitHandler = (e)=>{
            e.preventDefault();
            dispatch(createProductReview(match.params.id, { rating, comment }));
        }


        const renderProduct = ()=>{
            if(loading){
                return(
                    <Loader />
                )
            }
            if(error){
             return(
                 <Message variant='danger'>
                     {error}
                 </Message>
             )
            }
            if(product !== null){
                 return(
                     <div>
                     <Link className="btn btn-light my-5" to="/">Go back</Link>
                     <Meta title={product.name}  />
                    <Row>
                        <Col md={6}>
                        <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                         <ListGroup variant='flush'>
                             <ListGroup.Item>
                                 <h4>{product.name}</h4>
                             </ListGroup.Item>
                             <ListGroup.Item>
                             <Rating value={product.rating} text={` ${product.numReviews} rating`}/>
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 Price: ${product.price}
                             </ListGroup.Item>
                             <ListGroup.Item>
                                 Description: {product.description}
                             </ListGroup.Item>
                         </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup varaint="flush">
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            Price:
                                            </Col>
                                            <Col>
                                            ${product.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>
                                            Status:
                                            </Col>
                                            <Col>
                                            {inventory()}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                      {selectQty()}
                                    <ListGroup.Item>
                                        <Button 
                                        onClick={ ()=> addItemToCart() }
                                        className='btn-block' 
                                        type='button'
                                        disabled={product.countInStock === 0}
                                        >
                                            Add To Cart
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h3>Reviews</h3>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant="flush">
                                {product.reviews.map(review => (
                                    <ListGroup.Item key={review._id}>
                                      <strong>{review.name}</strong>
                                      <Rating value={review.rating} />
                                      <p>{review.createdAt.substring(0, 10)}</p>
                                      <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h3>Write a customer review</h3>
                                    {reviewError && <Message variant="danger">{reviewError}</Message>}
                                    {userInfo ? (
                                    <Form onSubmit={submitHandler}>
                                      <Form.Group controlId='rating'>
                                        <Form.Label>Rating</Form.Label>
                                        <Form.Control as="select" value={rating} onChange={(e)=> setRating(e.target.value)}>
                                          <option value=''>Select...</option>
                                          <option value='1'>1 - Poor</option>
                                          <option value='2'>2 - Fair</option>
                                          <option value='3'>3 - Good</option>
                                          <option value='4'>4 - Very Good</option>
                                          <option value='5'>5 - Excellent</option>
                                        </Form.Control>
                                      </Form.Group>

                                      <Form.Group controlId='comment'>
                                        <Form.Label>Comment</Form.Label>
                                        <Form.Control as="textarea" row='3' value={comment} onChange={(e)=> setComment(e.target.value)}> </Form.Control>
                                      </Form.Group>
                                      <Button type="submit">Submit</Button>
                                    </Form>
                                    ) : <Message><Link to="/login">Login</Link> to write a review</Message>}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </div>
                )  
          }
       }


   const inventory = ()=>{
       if(product.countInStock === 0){
           return 'Out of stock'
       }else if(product.countInStock < 8){
           return `Only ${product.countInStock} in stock`
       }else{
           return 'In stock'
       }
   }

    return(
        <div>
           {renderProduct()}
        </div>
    )
};



export default  ProductScreen;