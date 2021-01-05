import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {

  if (!props.auth) {
    return <Redirect to="/login"/>
  }

  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;