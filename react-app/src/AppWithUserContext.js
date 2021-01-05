// import React, { useState, useEffect, useContext } from 'react';
// import UserContext from './context/UserContext';
// import App from './App';

// const AppWithUserContext = () => {
//     const [user, setUser] = useState({})

//     const updateUser = (e) => {
//         return setUser(e.target.value)
//     }

//     useEffect(() => {
//         (async () => {
//             if (!user.id) {
//                 console.log("SOMETHING")
//                 const res = await fetch(`/api/users`)
//                 const userData = await res.json();
//                 console.log("USER DATAAA:   ", userData)
//                 setUser(userData);
//             }
//         })()
//     })

//     if (!user) return null;

//     return (
//         <UserContext.Provider value={user}>
//             <App />
//         </UserContext.Provider>
//     )
// }

// export default AppWithUserContext;
