import React, { Children, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../Redux/AuthReducer/action";
import Chat from "./Chat";
import Register from "./Register";
import Resister from "./Register";

function PrivateRoute({ children }) {
  const { isAuth } = useSelector((store) => store.AuthReducer);
  // const dispatch=useDispatch()

  // useEffect(()=>{
  
  //   dispatch(loginSuccess(JSON.parse(localStorage.getItem("userDetails"))))
  // },[])
  if (isAuth) {
    return children;
  } else {
    return <Register />;
  }
}

export default PrivateRoute;
