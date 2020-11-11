import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { getUserEdit } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import Loader from '../components/bootstrapHelpers/Loader';
import Message from '../components/bootstrapHelpers/Message';
import { USER_UPDATE_RESET } from '../actions/types';


const UserEditScreen = ({ match, history }) => {


    const userLogin = useSelector(state => state.userLogin);
    const{ userInfo } = userLogin;

    const dispatch = useDispatch();
    const userEdit = useSelector(state => state.userEdit);
    const { loading, error, user } = userEdit;


    useEffect(()=>{
        if(!userInfo || !userInfo.isAdmin){
            history.push('/');
        }
     dispatch(getUserEdit(match.params.id));

    },[])




    return (
        <div className="my-5">
            {user && (
                <div>
                  <h2>{user.name}</h2>
                  <h2>{user.email}</h2>
                </div>
            )}
        </div>
    )
}

export default UserEditScreen
