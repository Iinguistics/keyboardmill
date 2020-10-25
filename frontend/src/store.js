import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';


const reducers = combineReducers({
   productList: productListReducer,
   singleProduct: productReducer,
   cart: cartReducer
});

const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse
(localStorage.getItem('cartItems')) : [];

const intitialState = {
   cart: { cartItems: cartItemsFromStorage },
};

const middleware = [ thunk ];

const store = createStore(reducers, intitialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;