import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


export default function LoadingPage () {

    return (<>
      <div className="loadingpage">
        <CircularProgress color="secondary" size={100} thickness={2}/>
      </div>
    </>);
}
