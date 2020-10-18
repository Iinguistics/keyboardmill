import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, Card, Button, ListGroup } from 'react-bootstrap';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match })=>{
   const product = products.find(item => item._id === match.params.id)

    return(
        <div>
            <Link className="btn btn-light my-2" to="/">Go back</Link>
            <Row>
                <Col md={6}>
                <Image src={product.image} alt={product.name} fluid/>
                </Col>
                <Col md={3}>
                 <ListGroup variant='flush'>
                     <ListGroup.Item>
                         <h4>{product.name}</h4>
                     </ListGroup.Item>
                 </ListGroup>
                </Col>
            </Row>
        </div>
    )
};

export default ProductScreen;