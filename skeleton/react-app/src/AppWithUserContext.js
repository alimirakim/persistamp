import React, { useState, useEffect, useContext } from 'react';
import UserContext from './context/UserContext';
import App from './App';

const AppWithUserContext = () => {
    const [user, setUser] = useState({})

    const updateUser = (e) => {
        return setUser(e.target.value)
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                <App />
            </UserContext.Provider>
        )
    }
}

export default AppWithUserContext;
