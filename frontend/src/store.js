import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer } from './reducers/userReducers';





const reducers = combineReducers({
   productList: productListReducer,
   singleProduct: productReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister:userRegisterReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : [];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null;

const intitialState = {
   cart: { cartItems: cartItemsFromStorage },
   userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [ thunk ];

const store = createStore(reducers, intitialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;