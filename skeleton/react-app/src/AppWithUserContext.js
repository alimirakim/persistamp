import React from 'react';
import UserContext from './context/userContext';
import App from './App';

class AppWithUserContext extends React.Component {
    constructor() {
        super();
        this.state = {
            user: null,
            updateUser: this.updateUser,

        }

    }

    updateUser = (userId) => {
        this.setState({ userId})
    }


    render() {
        return (
            <UserContext.Provider value={this.state}>
                <App />
            </UserContext.Provider>
        )
    }
}
