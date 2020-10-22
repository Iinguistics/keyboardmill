import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL  } from '../actions/types';
import axios from 'axios';

export const listProducts = () => async(dispatch)=>{
    try{
        dispatch({ type: PRODUCT_LIST_REQUEST })
    
        const { data } = await axios.get('/api/products');
    dispatch({
          type: PRODUCT_LIST_SUCCESS,
          payload: data
         });
    }catch (error){
     dispatch({
         type: PRODUCT_LIST_FAIL,
         payload: error.response && error.response.data.message ? error.resonse.data.message : error.message
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
         dispatch({
         type: PRODUCT_FAIL,
         payload: error.response && error.response.data.message ? error.resonse.data.message : error.message
     })
    }
}
