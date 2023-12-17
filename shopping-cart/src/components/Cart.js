import React from "react";
import "./Cart.css";
import {useSelector,useDispatch} from 'react-redux'
import { cartActions } from "../store/cart-slice";

const Cart = () => {
  const quantity = useSelector((state)=>state.cart.totalQuantity);
  const dispatch=useDispatch()
  const showcart=()=>{
    dispatch(cartActions.setShowCart())
  }
  return (
    <div className="cartIcon">
      <h3 onClick={showcart}>Cart: {quantity} Items</h3>
    </div>
  );
};

export default Cart;