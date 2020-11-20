import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, removeProduct, createProduct } from '../actions/productActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import Paginate from '../components/Paginate';
import { useToasts } from 'react-toast-notifications';
import { PRODUCT_CREATE_RESET } from '../actions/types';


const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const productList = useSelector(state => state.productList);
    const { products, loading, error, page, pages } = productList;
    
    const removedProduct = useSelector(state => state.removedUser);
    const { error:removedProductError } = removedProduct;

    const createdProductState = useSelector(state => state.createdProduct);
    const { error:createdProductError, success, product:createdProduct } = createdProductState;

    const { addToast } = useToasts();

    
    useEffect(()=>{
        dispatch({ type: PRODUCT_CREATE_RESET });
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }
        if(success){
            history.push(`/admin/product/edit/${createdProduct._id}`);
        }else{
            dispatch(listProducts('', pageNumber));
        }
    }, [dispatch, history, userInfo, success, pageNumber]);


    const deleteHandler = (id, productName)=>{
        if(window.confirm(`Confirm you want to delete ${productName}`)){
            dispatch(removeProduct(id));
            setTimeout(()=>{
                dispatch(listProducts());
                if(!removedProductError){
                addToast(`${productName} has been deleted`, {
                    appearance: 'success'
                });
                }
            },1000) 
        } 
    }


    const createProductHandler = ()=>{
        dispatch(createProduct());
    }

    

    return (
        <div className="mt-5">
            <Row className="align-items-center">
              <Col>
               <h1>Products</h1>
              </Col>
              <Col className="text-right">
                  <Button className="my-3" variant="primary" onClick={()=> createProductHandler()}>
                      <i className="fas fa-plus"></i> Create Product
                  </Button>
              </Col>
            </Row>
            {removedProductError && <Message variant="danger">{removedProductError}</Message>}
            {createdProductError && <Message variant="danger">{createdProductError}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <>
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product =>(
                         <tr key={product._id}>
                             <td>{product._id}</td>
                             <td>{product.name}</td>
                             <td>${product.price}</td>
                             <td>{product.category}</td>                            
                             <td>{product.brand}</td>
                             <td className="p-1">
                                 <LinkContainer to={`/admin/product/edit/${product._id}`}>
                                     <Button className="btn-sm mr-4">
                                         <i className="fas fa-edit"></i>
                                     </Button>
                                 </LinkContainer>
                                 <Button variant="danger" className="btn-sm" onClick={()=> deleteHandler(product._id, product.name)}>
                                    <i className="fas fa-trash"></i>
                                 </Button>
                             </td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
                <Paginate pages={pages} page={page} isAdmin={true} />
                </>
            )}
        </div>
    )
}

export default ProductListScreen
