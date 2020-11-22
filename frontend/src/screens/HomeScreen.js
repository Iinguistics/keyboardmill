import React, { useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import Product from '../components/Product';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import Paginate from '../components/Paginate';
import Meta from '../components/Meta';


const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;

    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { loading, error, products, pages, page } = productList;

    useEffect(()=>{
    dispatch(listProducts(keyword, pageNumber)); 
    }, [dispatch, keyword, pageNumber]);

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
        <Fragment>
            <Meta />
            {keyword && <Link to="/" className="btn btn-light mt-5">Go Back</Link>}
            <h1 className ="my-5">Products</h1>
            <Row>
            {renderProducts()}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword ? keyword : ''} />
        </Fragment>
    )
}


export default HomeScreen;
