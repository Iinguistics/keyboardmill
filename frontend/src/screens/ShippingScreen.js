import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import FormContainer from '../components/FormContainer';
import { saveShippingAddress } from '../actions/cartActions';
import CheckOutProgress from '../components/CheckOutProgress';


const ShippingScreen = ({ history, location }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const dispatch = useDispatch();

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [country, setCountry] = useState(shippingAddress.country);


    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(saveShippingAddress({ address, city, zipcode, country }));
        history.push('/payment');
    }

    return (
        <FormContainer>
             <CheckOutProgress step1 step2 />
             <h2>Shipping</h2>
         <Form onSubmit={submitHandler}>
            
         <Form.Group controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter address"
                     value={address} 
                     required
                     onChange={(e)=> setAddress(e.target.value)} />
         </Form.Group>

         <Form.Group controlId="city">
                    <Form.Label>City</Form.Label>
                    <Form.Control type="text" placeholder="Enter City"
                     value={city} 
                     required
                     onChange={(e)=> setCity(e.target.value)} />
         </Form.Group>

         <Form.Group controlId="zipcode">
                    <Form.Label>Zipcode</Form.Label>
                    <Form.Control type="text" placeholder="Enter zipcode"
                     value={zipcode} 
                     required
                     onChange={(e)=> setZipcode(e.target.value)} />
         </Form.Group>

         <Form.Group controlId="country">
                    <Form.Label>Country</Form.Label>
                    <Form.Control type="text" placeholder="Enter Country"
                     value={country} 
                     required
                     onChange={(e)=> setCountry(e.target.value)} />
         </Form.Group>
         <Button type="submit">Continue</Button>
         </Form>
        </FormContainer>
    )
}

export default ShippingScreen
