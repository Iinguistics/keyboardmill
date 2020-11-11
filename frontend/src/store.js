import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import { userLoginReducer, userRegisterReducer, userDetailsReducer, updateDetailsReducer, getUsersReducer, removeUserReducer, userEditReducer } from './reducers/userReducers';
import { orderCreateReducer, orderDetailsReducer, orderPayReducer, orderListMyReducer } from './reducers/orderReducers';


const reducers = combineReducers({
   productList: productListReducer,
   singleProduct: productReducer,
   cart: cartReducer,
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   userDetails: userDetailsReducer,
   userProfileUpdate: updateDetailsReducer,
   allUsers: getUsersReducer,
   removedUser: removeUserReducer,
   userEdit: userEditReducer,
   orderCreate: orderCreateReducer,
   orderDetails: orderDetailsReducer,
   orderPay: orderPayReducer,
   orderListMy: orderListMyReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : [];


const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse
(localStorage.getItem('userInfo')) : null;


const shippingAddressFromStorage = localStorage.getItem('shippingAddress') ? JSON.parse
(localStorage.getItem('shippingAddress')) : { };

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse
(localStorage.getItem('paymentMethod')) : { };


const intitialState = {
   cart: { cartItems: cartItemsFromStorage, shippingAddress: shippingAddressFromStorage, paymentMethod: paymentMethodFromStorage },
   userLogin: { userInfo: userInfoFromStorage }
};

const middleware = [ thunk ];

const store = createStore(reducers, intitialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;