import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function PrivatePage () {
    return (<>
        <div className="privatePage">
          <h1>This page is private</h1>
          <Link to='/'>
            <Button variant="contained" color="secondary">
                Return
            </Button>
          </Link>
        </div>
      </>)
}
