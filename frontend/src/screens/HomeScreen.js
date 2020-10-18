import React, { Fragment } from 'react';
import products from '../products.js';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';

const HomeScreen = () => {

    const renderProducts = ()=>{
       return products.map((item)=>{
                return(
                    <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                    <Product product={item} />
                    </Col>
                )  
        })
    }

    return (
        <Fragment>
            <h1>Latest Products</h1>
            <Row>
            {renderProducts()}
            </Row>
        </Fragment>
    )
}

export default HomeScreen
