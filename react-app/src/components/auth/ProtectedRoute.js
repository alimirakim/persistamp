import React from 'react';
import { Link } from 'react-router-dom';
import { Route, Redirect, useHistory } from 'react-router-dom';
import { Button } from '@material-ui/core';

const ProtectedRoute = props => {
  if (!props.auth) {
    return <Redirect to="/"/>
  }

  return (
    <Route {...props}/>
  );
  // console.log(props);
  // if (props.isPrivate === false) {
  //   return (
  //     <Route {...props}/>
  //   );
  // } else if (!props.auth) {
  //   return (<>
  //     <div className="privatePage">
  //       <h1>This page is private</h1>
  //       <Link to='/'>
  //         <Button variant="contained" color="secondary">
  //             Return
  //         </Button>
  //       </Link>
  //     </div>

  //   </>)
  // }

  // return (
  //   <Route {...props}/>
  // );
};

export default ProtectedRoute;
