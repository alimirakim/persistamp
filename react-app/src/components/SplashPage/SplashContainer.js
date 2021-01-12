import React from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import InstructionsContainer from './InstructionsContainer';

export default function SplashContainer ({auth, setAuth, setUser, loadUserData}) {
    return (<>
        <div className="splashcontainer">
            <InstructionsContainer />
            <div className="splashforms">
                <LoginForm auth={auth} setAuth={setAuth} setUser={setUser} loadUserData={loadUserData} />
                <SignUpForm auth={auth} setAuth={setAuth} />
            </div>
        </div>
    </>)
}
