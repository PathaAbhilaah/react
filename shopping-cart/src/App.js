import React from "react";
import "./App.css";
import Auth from "./components/Auth";
import Layout from "./components/Layout";
import store from "./store/index";
import {useSelector,useDispatch} from 'react-redux'
import { useEffect } from "react";
import { uiActions } from "./store/ui-slice";
import Notification from "./components/Notification";
let firstRender=true;

function App() {
   const cart=useSelector((state)=>state.cart);
   const notification=useSelector(state=>state.ui.notification)
   const loginInfo=useSelector((state)=>state.auth.isLoggedIn)
   const dispatch=useDispatch();
  
  useEffect(()=>{
    if(firstRender){
      firstRender=false;
      return;
    }
    const sendRequest=async()=>{
      dispatch(uiActions.showNotification({
        open:true,
        message:"sending request",
        type:"warning"
      }))
     const res= await fetch("https://shopping-cart-4d536-default-rtdb.firebaseio.com/cartItems.json",{
      method:"PUT",
      body:JSON.stringify(cart)
    }) 
    const data=await res.json();
    dispatch(uiActions.showNotification({
      open:true,
      message:"Sent request to database successfully",
      type:"success"
    }))
  }
    sendRequest().catch((err)=>{
      dispatch(uiActions.showNotification({
        open:true,
        message:"sending request failed",
        type:"error"
      }))
    });

  },[cart])
  return (
    <div className="App">
      {notification && <Notification message={notification.message} type={notification.type}/>}
       {!loginInfo && <Auth />}
     { loginInfo && <Layout />}
    </div>
  );
}

export default App;