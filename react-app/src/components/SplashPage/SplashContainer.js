import React from 'react';
import LoginForm from '../auth/LoginForm';
import SignUpForm from '../auth/SignUpForm';
import InstructionsContainer from './InstructionsContainer';
import demoButton from '../../images/persistamp-demoButton.png';

export default function SplashContainer({ auth, setAuth, setUser }) {

  const onDemoLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: "demo@gmail.com", password: "password" })
    })
    const user = await res.json()
    if (!user.errors) {
      setAuth(true)
      setUser(user)
    }
  }

  if (auth) return null;
  
  return (<main>
    <div className="splashPageBackground overlay">
    </div>
    <div className="splashforms">
      <div className="splashButtons">
        <LoginForm auth={auth} setAuth={setAuth} setUser={setUser} />
        <SignUpForm auth={auth} setAuth={setAuth} setUser={setUser} />
      </div>
    </div>
    <div className="splashcontainer">
      <div className="splashTitle">
        <h1 className="splashHeader persistamp">
          Persistamp
          <img onClick={onDemoLogin} className="demoButton" alt="try me" src={demoButton} />
        </h1>
        <h2 className="lo-center-x">A Motivational 'Good Activity' Positivity App</h2>
      </div>
      <InstructionsContainer />
    </div>
  </main>)
}
