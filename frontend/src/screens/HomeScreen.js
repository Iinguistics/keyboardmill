import React, { Fragment, useState, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';

const HomeScreen = () => {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
    const fetchProducts = async()=>{
        const res = await axios.get('/api/products/');
        setProducts(res.data);
    }
      fetchProducts()
  
    
    }, [])

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
            <h1 className ="my-5">Latest Products</h1>
            <Row>
            {renderProducts()}
            </Row>
        </Fragment>
    )
}

export default HomeScreen
