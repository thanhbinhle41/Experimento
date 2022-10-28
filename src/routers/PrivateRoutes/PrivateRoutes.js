import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { isAdminSelector } from "../../features/auth/services/authSlice";

const PrivateRoutes = ({ component }) => {
  const isAdmin = useSelector(isAdminSelector);
  if (isAdmin) {
    return component;
  } else return <Navigate to="/admin/login" />;
};

export default PrivateRoutes;
