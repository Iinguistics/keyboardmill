import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastProvider } from 'react-toast-notifications';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderDetailScreen from './screens/OrderDetailScreen';
import OrderListScreen from './screens/OrderListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';
import ProductListScreen from './screens/ProductListScreen';
import ProductEditScreen from './screens/ProductEditScreen';


  const App = ()=>{

  return(
    <Router>
      <Header />
      <main className="py-3">
        <Container>
        <ToastProvider autoDismiss={true} autoDismissTimeout={3500} placement='bottom-center' >
        <Route path="/" exact component={HomeScreen} />
        <Route path="/search/:keyword" exact component={HomeScreen} />
        <Route path="/page/:pageNumber" exact component={HomeScreen} />
        <Route path="/search/:keyword/page/:pageNumber" exact component={HomeScreen} />
        <Route path="/product/:id"  component={ProductScreen} />
        <Route path= "/cart/:id?"  component={CartScreen} />
        <Route path= "/login"  component={LoginScreen} />
        <Route path= "/register"  component={RegisterScreen} />
        <Route path= "/profile"  component={ProfileScreen} />
        <Route path= "/shipping"  component={ShippingScreen} />
        <Route path= "/payment"  component={PaymentScreen} />
        <Route path= "/placeorder" component={PlaceOrderScreen} />
        <Route path= "/order/:id" component={OrderDetailScreen} />
        <Route path= "/admin/userlist" component={UserListScreen} />
        <Route path= "/admin/user/edit/:id" component={UserEditScreen} />
        <Route path= "/admin/productlist" exact component={ProductListScreen} />
        <Route path= "/admin/productlist/:pageNumber" exact component={ProductListScreen} />
        <Route path= "/admin/orderlist" component={OrderListScreen} />
        <Route path= "/admin/product/edit/:id" component={ProductEditScreen} />
        </ToastProvider>
        </Container>
      </main>
      <Footer />
    </Router> 
      
    
  )
}

export default App;
