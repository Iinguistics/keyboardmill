import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import FormContainer from '../components/FormContainer';


const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    
    const dispatch = useDispatch();
     const userRegister = useSelector(state => state.userRegister);
     const { loading, error, userInfo } = userRegister;

     const redirect = location.search ? location.search.split('=')[1]: '/'


     useEffect(()=>{
        if(userInfo){
            history.push('/')
        }
    }, [userInfo, redirect, history])


    const renderPasswordError = ()=>{
        if(passwordError){
            return <Message variant="danger">Passwords do not match</Message>
        }
    }
   
    const submitHandler = (e)=>{
        e.preventDefault();
        if(password !== verifyPassword){
            setPasswordError(true);
        }else{
            dispatch(register(name,email,password));
        }
    }

    



    return (
        <FormContainer>
            <h1>Register</h1>
            {error && <Message variant="danger">{error}</Message>}
            {renderPasswordError()}
            {loading && <Loader />}
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

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                     value={password} 
                     onChange={(e)=> setPassword(e.target.value)}
                     minlength="6" />
                </Form.Group>

                <Form.Group controlId="verifyPassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter password"
                     value={verifyPassword} 
                     onChange={(e)=> setVerifyPassword(e.target.value)}
                     minlength="6" />
                </Form.Group>

                 <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>

            <Row className="py-3">
                <Col>
                Already have an account? {''}
                 <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
                    Login
                </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen

