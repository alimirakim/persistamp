import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SplashContainer from './components/SplashPage/SplashContainer';
import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserPage";

import UserContext from './context/UserContext'
import OptionsContext from './context/OptionsContext'
import { ProgramBoardContextProvider } from "./context/ProgramBoardContext"
import { RewardShopContextProvider } from './context/RewardShopContext'

import AboutCard from './components/AboutCard'
import HabitDisplay from './components/DisplayPage/HabitDisplay'
import RewardShop from './components/RewardPage/RewardShop'
import Homepage from './components/HomePage/Homepage'
import LoadingPage from './components/LoadingPage'

import './styles/index.css'

export default function App() {
  const [auth, setAuth] = useState(false)
  const [user, setUser] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [colors, setColors] = useState("")
  const [icons, setIcons] = useState("")

  // const updateUser = (user) => dispatchPB(resetPrograms())

  // When the page loads, load the user. Do only once!!
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      })
      const user_data = await res.json();
      setUser(user_data)
      setAuth(true)

      const { colors_data, icons_data } = await fetch(`/api/options`).then(res => res.json())
      setColors(colors_data)
      setIcons(icons_data)
      setLoaded(true)
    })()
  }, [])

  // useEffect(() => {
  //   if (user && colors && icons) setLoaded(true)
  // }, [user])

  if (!loaded) {
    return (<>
      <LoadingPage />
    </>)
  }

  return (
    <BrowserRouter>

      <UserContext.Provider value={user}>
        <OptionsContext.Provider value={{ colors, icons }}>

          <ProtectedRoute path="/" auth={auth}>
            <NavBar auth={auth} setAuth={setAuth} user={user} setUser={setUser} />
          </ProtectedRoute>

          <Route path="/login" exact={true}>
            <div className="splashPageBackground overlay">
              <SplashContainer auth={auth} setAuth={setAuth} setUser={setUser} />
            </div>
          </Route>

          <Route path="/about" exact={true}>
            <AboutCard />
          </Route>

          <ProtectedRoute path="/users" exact={true} auth={auth}>
            <UsersList />
          </ProtectedRoute>

          <ProtectedRoute path="/users/:uid" exact={true} auth={auth}>
            <User />
          </ProtectedRoute>

          <ProtectedRoute path="/graphs/:hid/memberships/:mid" auth={auth}>
            <HabitDisplay />
          </ProtectedRoute>

          <ProgramBoardContextProvider>
            <ProtectedRoute path="/" exact={true} auth={auth}>
              <Homepage user={user} />
            </ProtectedRoute>
          </ProgramBoardContextProvider>

          <RewardShopContextProvider>
            <ProtectedRoute path="/programs/:pid/memberships/:mid/rewards" exact={true} auth={auth}>
              <RewardShop />
            </ProtectedRoute>
          </RewardShopContextProvider>

          <Footer auth={auth}/>

        </OptionsContext.Provider>
      </UserContext.Provider>

    </BrowserRouter>
  );
}
