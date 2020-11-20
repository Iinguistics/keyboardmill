import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL, PRODUCT_REQUEST, PRODUCT_SUCCESS, PRODUCT_FAIL, PRODUCT_REMOVE_REQUEST, PRODUCT_REMOVE_SUCCESS, PRODUCT_REMOVE_FAIL, PRODUCT_EDIT_REQUEST, PRODUCT_EDIT_SUCCESS, PRODUCT_EDIT_FAIL, PRODUCT_EDIT_RESET, PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET, PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS,PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from '../actions/types';

export const productListReducer = (state={ products:[] }, action)=>{
  switch(action.type){
      case PRODUCT_LIST_REQUEST :
          return { loading: true, products: [] }
      case PRODUCT_LIST_SUCCESS:
          return { loading: false, products: action.payload.products, pages:action.payload.pages, page:action.payload.page }
      case PRODUCT_LIST_FAIL:
          return { loading: false, error: action.payload }
       
          default:
            return state;
  }
}


// single product
export const productReducer = (state={ product:{ reviews: [] } }, action)=>{
    switch(action.type){
        case PRODUCT_REQUEST :
            return { loading: true, ...state }
        case PRODUCT_SUCCESS:
            return { loading:false, product: action.payload }
        case PRODUCT_FAIL:
            return { loading: false, error: action.payload }
         
            default:
              return state;
    }
  }


//For admin ProductListScreen. to delete product, Private & Admin
export const removeProductReducer = (state={ removedProduct: {} }, action)=>{
    switch(action.type){
        case PRODUCT_REMOVE_REQUEST :
            return {...state, loading: true }
        case PRODUCT_REMOVE_SUCCESS:
            return { loading: false, removedProduct: action.payload }
        case PRODUCT_REMOVE_FAIL:
            return { loading: false, error: action.payload }
    
            default:
              return state;
    }
}


// For admin to edit existing product..Private/Admin
export const productEditReducer = (state= { product: {} }, action)=>{
    switch(action.type){
        case PRODUCT_EDIT_REQUEST :
            return {...state, loading: true }
        case PRODUCT_EDIT_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_EDIT_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_EDIT_RESET:
            return { product: {} }    
            default:
              return state;
    }
}


 // For admin to add a product..Private/Admin
 export const productCreateReducer = (state= {}, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REQUEST :
            return {...state, loading: true }
        case PRODUCT_CREATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_RESET:
            return {}
            
            default:
              return state;
    }
}


// For a user to create a product review..Private
export const createProductReviewReducer = (state= { }, action)=>{
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST :
            return {loading: true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success:true }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return { review: {} }    
            default:
              return state;
    }
}





