import React from "react";
import { Route, Routes } from "react-router-dom";
import Chat from "./Chat";
import PrivateRoute from "./PrivateRoute";
import Register from "./Register";

function AllRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute><Chat /></PrivateRoute> }/>
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default AllRoutes;
