import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

export default function PrivatePage() {
  return (
    <main className="privatePage">
      <h1 className="persistamp">Sorry, It's Private!</h1>
      <article className="lo-center">
      <p className="msg-none th-txt-shadow"><strong>This page is private</strong></p>
      <Link to='/'>
        <Button variant="contained" color="secondary">
          Return to Homepage
            </Button>
      </Link>
      </article>
    </main>
  )
}
