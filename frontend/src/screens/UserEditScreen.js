import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEdit } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { USER_UPDATE_RESET } from '../actions/types';
import FormContainer from '../components/FormContainer';


const UserEditScreen = ({ match, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const dispatch = useDispatch();
    const userEdit = useSelector(state => state.userEdit);
    const { loading:getUserLoading, error:getUserError, user } = userEdit;


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }
        if(!user.name || user._id !== match.params.id){
            dispatch(getUserEdit(match.params.id));
        }else{
            setName(user.name)
            setEmail(user.email)
        }

    },[user, dispatch, match.params.id])


    const submitHandler = (e)=>{
        e.preventDefault();
        
    }




    return (
        <Fragment>
            <Link to='/admin/userlist' className="btn btn-light my-5">
                Go Back
            </Link>

            <FormContainer>
            <h1>Edit User</h1>
            {getUserLoading ? <Loader /> : getUserError ? <Message variant="danger">{getUserError}</Message> : ( 
            <Form onSubmit={submitHandler}>

            <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter name"
                 value={name} 
                 onChange={(e)=> setName(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                 value={email} 
                 onChange={(e)=> setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="isadmin">
                <Form.Check type="checkbox" label="Is Admin"
                 checked={isAdmin} 
                 onChange={(e)=> setIsAdmin(e.target.checked)} />
            </Form.Group>


             <Button variant="primary" type="submit" id="user-update">
                Update
            </Button>
        </Form>
            )}
            
        </FormContainer>
        </Fragment>
    )
}

export default UserEditScreen
