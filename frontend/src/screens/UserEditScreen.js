import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEdit, editUserDetails } from '../actions/userActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import FormContainer from '../components/FormContainer';
import { useToasts } from 'react-toast-notifications';


const UserEditScreen = ({ match, history }) => {
    const dispatch = useDispatch();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isAdmin, setIsAdmin] = useState(false);

    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const userFetch = useSelector(state => state.userFetch);
    const { loading:getUserLoading, error:getUserError, user } = userFetch;


    const userEdit = useSelector(state => state.userEdit);
    const { success:editSuccess, error:editError } = userEdit;


    const { addToast } = useToasts();


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
        if(user){
            dispatch(editUserDetails(match.params.id, { name, email, isAdmin }));
            dispatch(getUserEdit(match.params.id));
            setTimeout(()=>{
                if(!editError){
                    addToast(`${user.name} has been updated`, {
                        appearance: 'success'
                    });
                    }
            }, 1000)
        }
    }




    return (
        <Fragment>
            <Link to='/admin/userlist' className="btn btn-light my-5">
                Go Back
            </Link>

            <FormContainer>
            <h1>Edit User</h1>
            {editError && <Message variant="danger">{editError}</Message> }
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
