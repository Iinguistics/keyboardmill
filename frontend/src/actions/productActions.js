import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS, PRODUCT_REMOVE_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL  } from '../actions/types';
import axios from 'axios';

export const listProducts = (keyword = '', pageNumber = '') => async(dispatch)=>{
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
    
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);
    dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data
         });
    }catch (error){
     dispatch({
         type: PRODUCT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
}


export const fetchProduct = (id) => async(dispatch)=>{
    try{
        dispatch({ type: PRODUCT_REQUEST })
    
        const { data } = await axios.get(`/api/products/${id}`);
          dispatch({
          type: PRODUCT_SUCCESS,
          payload: data
         });
    }catch (error){
        console.log(error.response.data)
        dispatch({
            type: PRODUCT_FAIL,
            payload: error.response && error.response.data.message ? error.response.data.message : error.message
        })
    }
}





  //For admin ProductListScreen. to delete product, Private & Admin
  export const removeProduct = (id)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: PRODUCT_REMOVE_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.delete(`/api/products/remove/${id}`, config)
 
       dispatch({
           type: PRODUCT_REMOVE_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: PRODUCT_REMOVE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }



 // For admin to edit existing product..Private/Admin
 export const editProduct = (id, product)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: PRODUCT_EDIT_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.put(`/api/products/edit/${id}`, product, config)
 
       dispatch({
           type: PRODUCT_EDIT_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: PRODUCT_EDIT_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }


 // For admin to add a product..Private/Admin
 export const createProduct = ()=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: PRODUCT_CREATE_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       const { data } = await axios.post('/api/products', {}, config)
 
       dispatch({
           type: PRODUCT_CREATE_SUCCESS,
           payload: data
       })

    }catch(error){
     dispatch({
         type: PRODUCT_CREATE_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }



  // For a user to create a product review..Private
  export const createProductReview = (id, review)=> async (dispatch, getState)=>{
    try{
       dispatch({
           type: PRODUCT_CREATE_REVIEW_REQUEST
       })

       const { userLogin: { userInfo } } = getState();

       const config = {
        headers:{
            'Content-Type': 'application/json',
            Authorization: `Bearer ${userInfo.token}`
        }
    }
 
      
       await axios.post(`/api/products/${id}/reviews`, review, config)
 
       dispatch({
           type: PRODUCT_CREATE_REVIEW_SUCCESS,
       })

    }catch(error){
     dispatch({
         type: PRODUCT_CREATE_REVIEW_FAIL,
         payload: error.response && error.response.data.message ? error.response.data.message : error.message
     })
    }
 }