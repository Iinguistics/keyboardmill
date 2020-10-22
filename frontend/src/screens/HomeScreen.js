import React, { Fragment, useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

const HomeScreen = () => {
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(()=>{
    dispatch(listProducts()) 
    }, [dispatch]);

    const renderProducts = ()=>{
       if(loading){
           return(
               <h2>Loading...</h2>
           )
       }
       if(error){
        return(
            <h2>{error}</h2>
        )
       }
       if(products !== null){
        return products.map((item)=>{
            return(
                <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                <Product product={item} />
                </Col>
            )  
        })
       }
  }


    const renderProductss = ()=>{
        if(productList !== null){
            return productList.map((item)=>{
                return(
                    <Col sm={12} md={6} lg={4} xl={3} key={item._id}>
                    <Product product={item} />
                    </Col>
                )  
          })
        }
    }

    return (
        <div>
            <h1 className ="my-5">Latest Products</h1>
            <Row>
            {renderProducts()}
            </Row>
        </div>
    )
}


export default HomeScreen;
