import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { productListReducer, productReducer } from './reducers/productReducers';

const reducers = combineReducers({
   productList: productListReducer,
   singleProduct: productReducer
})

const intitialState = {};

const middleware = [ thunk ];

const store = createStore(reducers, intitialState, composeWithDevTools(applyMiddleware(...middleware)));


export default store;