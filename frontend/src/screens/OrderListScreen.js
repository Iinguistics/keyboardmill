import React, { Fragment, useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, orderDelivered } from '../actions/orderActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { useToasts } from 'react-toast-notifications';
import { ORDER_DELIVERED_RESET } from '../actions/types';


const OrderListScreen = ({ history, match }) => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const orderList = useSelector(state => state.orderList);
    const { orders, loading, error } = orderList;


    const orderDeliveredState = useSelector(state => state.orderDelivered);
    const { order, loading:orderDeliveredLoading, error:orderDeliveredError, success } = orderDeliveredState;
    

    const { addToast } = useToasts();

    
    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }else{
           dispatch(getAllOrders());
        }
        if(success){
           dispatch(getAllOrders());
        }
        
    }, [dispatch, history, userInfo, success]);


    const deliveredHandler = (id)=>{
        dispatch(orderDelivered(id));
    }



    
    return (
        <div className="mt-5">
            <Row className="align-items-center">
              <Col>
               <h1>Orders</h1>
              </Col>
            </Row>
            {orderDeliveredLoading && <Loader />}
            {orderDeliveredError && <Message variant="danger">{orderDeliveredError}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order =>(
                         <tr key={order._id}>
                             <td>{order._id}</td>
                             <td>{order.user && order.user.name}</td>
                             <td>{order.createdAt.substring(0, 10)}</td>
                             <td>${order.totalPrice}</td>
                             <td>
                                 {order.isPaid ? (order.paidAt.substring(0, 10)):
                                 (<i className="fas fa-times" style={{color:'red'}}> Not yet paid</i>)
                                 }
                             </td>                           
                             <td>
                                 {order.isDelivered ? (order.deliveredAt.substring(0, 10)):
                                 (
                                  <Fragment>
                                     <i className="fas fa-times" style={{color:'red'}}> </i>
                                        <Button className="btn-sm mr-4" onClick={()=> deliveredHandler(order._id)}>
                                        Mark as delivered
                                        </Button>
                                  </Fragment>              
                                 )
                                 }           
                             </td> 
                             <td className="p-1">
                                 <LinkContainer to={`/order/${order._id}`}>
                                     <Button className="btn-sm mr-4">
                                         Details
                                     </Button>
                                 </LinkContainer>
                             </td>
                         </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    )
}

export default OrderListScreen
