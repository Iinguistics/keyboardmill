import { USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGIN_FAIL, USER_LOGOUT, USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_DETAILS_REQUEST, USER_DETAILS_SUCCESS, USER_DETAILS_FAIL, USER_DETAILS_RESET, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_RESET, USER_UPDATE_FAIL,  ORDER_LIST_MY_RESET, USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL, USER_REMOVE_REQUEST, USER_REMOVE_SUCCESS, USER_REMOVE_FAIL, USER_EDIT_REQUEST, USER_EDIT_SUCCESS, USER_EDIT_FAIL, USER_FETCH_REQUEST, USER_FETCH_SUCCESS, USER_FETCH_FAIL  } from './types';
import axios from 'axios';

// User login in Public
export const login = (email, password)=> async (dispatch)=>{
   try{
      dispatch({
          type: USER_LOGIN_REQUEST
      })

      const config = {
          headers:{
              'Content-Type': 'application/json'
          }
      }
      const { data } = await axios.post('/api/users/login', {email, password}, config)

      dispatch({
          type: USER_LOGIN_SUCCESS,
          payload: data
      })
      localStorage.setItem('userInfo', JSON.stringify(data))
   }catch(error){
    dispatch({
        type: USER_LOGIN_FAIL,
        payload: error.response && error.response.data.message ? error.response.data.message : error.message
    })
   }
}


export const logout = ()=> (dispatch)=>{
      localStorage.removeItem('userInfo');
      //localStorage.removeItem('cartItems'); ? do I want to do this?
       dispatch({ type: USER_LOGOUT });
       dispatch({ type: USER_DETAILS_RESET });
       dispatch({ type: ORDER_LIST_MY_RESET });
 }

// User register Public
 export const register = (name, email, password)=> async (dispatch)=>{
    try{
       dispatch({
           type: USER_REGISTER_REQUEST
       })

       const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
 
      
       const { data } = await axios.post('/api/users/register', {name, email, password}, config)
 
       dispatch({
           type: USER_REGISTER_SUCCESS,
           payload: data
       })
       dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
        })
       localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
     dispatch({
         type: USER_REGISTER_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }

// For current logged in user to view their profile..Private
 export const getUserDetails = ()=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_DETAILS_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.get('/api/users/profile', config)
 
       dispatch({
           type: USER_DETAILS_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: USER_DETAILS_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 // For current logged in user to UPDATE their profile..Private
 export const updateUserDetails = (user)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_UPDATE_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.put('/api/users/profile', user, config)
 
       dispatch({
           type: USER_UPDATE_SUCCESS,
           payload: data
       })

       dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: data
    })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
     dispatch({
         type: USER_UPDATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


// For admin UserListScreen. to view all users, Private & Admin
 export const getAllUsers = ()=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_LIST_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.get('/api/users/', config)
 
       dispatch({
           type: USER_LIST_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: USER_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 //For admin UserListScreen. to delete user account, Private & Admin
 export const removeUser = (id)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_REMOVE_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.delete(`/api/users/remove/${id}`, config)
 
       dispatch({
           type: USER_REMOVE_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: USER_REMOVE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 // admin UserEditScreen fetches the specified user to edit Private/Admin
 export const getUserEdit = (id)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_FETCH_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.get(`/api/users/profile/edit/${id}`, config)
 
       dispatch({
           type: USER_FETCH_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: USER_FETCH_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 // admin UserEditScreen to make PUT req & edit user profile Private/Admin
 export const editUserDetails = (id,user)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: USER_EDIT_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.put(`/api/users/profile/edit/${id}`, user, config)
 
       dispatch({
           type: USER_EDIT_SUCCESS,
          // payload: data
       })

      
    }catch(error){
     dispatch({
         type: USER_EDIT_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


