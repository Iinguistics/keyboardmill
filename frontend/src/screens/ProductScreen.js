import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import axios from 'axios';

const ProductScreen = ({ match })=>{
    const [product, setProduct] = useState({});

    useEffect(()=>{
    const fetchProduct = async()=>{
        const res = await axios.get(`/api/products/${match.params.id}`);
        setProduct(res.data);
    }
      fetchProduct()
    }, [match])


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
            <Link className="btn btn-light my-5" to="/">Go back</Link>
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
                     <Rating value={product.rating} text={` ${product.numReviews} reviews`}/>
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
                            <ListGroup.Item>
                                <Button 
                                className='btn-block' 
                                variant="dark" 
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
        </div>
    )
};

export default ProductScreen;