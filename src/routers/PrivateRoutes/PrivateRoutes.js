import React from "react";
import { Navigate } from "react-router-dom";


const PrivateRoutes = ({ component }) => {
 
  if (1) {
    return component;
  } else return <Navigate to="/auth" />;
};

export default PrivateRoutes;
