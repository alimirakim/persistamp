import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ProtectedRoute = props => {
  if (!props.isPrivate) {
    return (
      <Route {...props}/>
    );
  } else if (!props.auth) {
    return (<>
      <div className="privatePage">
        <h1>This page is private</h1>
        <Link to='/login'>
          <Button variant="contained" color="secondary">
              Return
          </Button>
        </Link>
      </div>

    </>)
  }

  return (
    <Route {...props}/>
  );
};

export default ProtectedRoute;
