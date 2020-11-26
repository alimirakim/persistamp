import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import HabitBoard from "./components/HabitBoard";
import UserProfileCard from "./components/UserProfileCard";
import UserContext from './context/UserContext';
// import './styles/base.css'
import BarGraph from './components/BarGraph';
import AboutCard from './components/AboutCard'


import HabitForm from "./components/HabitForm";
import LineGraph from "./components/LineGraph";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({})

  const updateUser = (e) => {
    return setUser(e.target.value)
  }


  useEffect(() => {
    (async () => {
      const user = await authenticate();
      // console.log("USERRRR: ", user)
      if (!user.errors) {
        setAuthenticated(true);
        setUser(user)
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    console.log("???")
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} />
      <Route path="/login" exact={true}>
        <LoginForm
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <Route path="/sign-up" exact={true}>
        <SignUpForm authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>
      <Route path="/about" exact={true}>
        <>
          <h1>About Us</h1>
          <AboutCard />
        </>
      </Route>

      <UserContext.Provider value={user}>
        <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path="/users/:userId" exact={true} authenticated={authenticated}>
          <User />
        </ProtectedRoute>
        <ProtectedRoute path="/graphs/:habitId" authenticated={authenticated}>
          <LineGraph />
          <BarGraph />
        </ProtectedRoute>
        <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
          <h1>My Home Page</h1>
          <UserProfileCard />
          <HabitForm />
          <HabitBoard />
        </ProtectedRoute>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
