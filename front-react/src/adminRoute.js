import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"));

    if(user.memberType !== "ROLE_ADMIN"){
        return <Navigate to="/login" />;
    }

    return children;
};

export default AdminRoute;

