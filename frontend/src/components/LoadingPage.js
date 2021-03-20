import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//       '& > * + *': {
//         marginLeft: theme.spacing(2),
//       },
//       justifyContent: "center",

//     },
//   }));

export default function LoadingPage () {
    // const classes = useStyles();

    return (<>
      <div className="loadingpage">
        <CircularProgress color="secondary" size={100} thickness={2}/>
        {/* <CircularProgress color="secondary" /> */}
      </div>
    </>);
}
