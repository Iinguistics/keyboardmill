import React from 'react';
import { useSelector } from 'react-redux';


const CartScreen = () => {
    const cartItems = useSelector(state => state.cart.cartItems);
    

    const renderCartItems = ()=>{
        if(cartItems){
            console.log(cartItems);
        return cartItems.map((item)=>{
            return(
                <div>
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                </div>
            )
        })
            
        }
    }


    return (
        <div className="my-5">
          cart
          {renderCartItems()}
        </div>
    )
}

export default CartScreen;
