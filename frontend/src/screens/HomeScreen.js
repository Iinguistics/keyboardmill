import React, { useEffect } from 'react';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword


    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products } = productList;

    useEffect(()=>{
    dispatch(listProducts(keyword)); 
    }, [dispatch, keyword]);

    const renderProducts = ()=>{
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
