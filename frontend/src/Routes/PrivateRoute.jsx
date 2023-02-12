import React, { Children } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";
import Register from "./Register";
import Resister from "./Register";

function PrivateRoute({ children }) {
  const { isAuth } = useSelector((store) => store.AuthReducer);
  console.log(isAuth);
  if (isAuth) {
    return children;
  } else {
    return <Register />;
  }
}

export default PrivateRoute;
