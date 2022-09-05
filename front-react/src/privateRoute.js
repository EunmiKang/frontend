import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({children}) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const authenticated = user != null;

    console.log("privateRoute", authenticated);

    if(!authenticated){
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;
