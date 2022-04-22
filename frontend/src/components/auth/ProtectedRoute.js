import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute(props) {
  if (!props.auth) {
    return <Redirect to="/"/>
  }

  return (
    <Route {...props}/>
  );
};
