import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SplashContainer from './components/SplashPage/SplashContainer';
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserPage";
import Footer from "./components/Footer";
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

  const [isPrivate, setIsPrivate] = useState(true);

  // const updateUser = (user) => dispatchPB(resetPrograms())

  // When the page loads, load the user. Do only once!!
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      })
      const user_data = await res.json()
      if (!user_data.errors) {
        setUser(user_data)
        setAuth(true)
      }

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

          <Route path="/graphs/:hid/memberships/:mid" auth={auth} exact={true}>
            <NavBar auth={auth} setAuth={setAuth} user={user} setUser={setUser} />
            <HabitDisplay auth={auth} isPrivate={isPrivate} setIsPrivate={setIsPrivate}/>
          </Route>

          <Route path="/login" exact={true}>
            <SplashContainer auth={auth} setAuth={setAuth} setUser={setUser} />
          </Route>

          <Route path="/about" exact={true}>
            <NavBar auth={auth} setAuth={setAuth} user={user} setUser={setUser} />
            <AboutCard />
          </Route>

          <ProtectedRoute path="/users" exact={true} auth={auth}>
            <UsersList />
          </ProtectedRoute>

          <ProtectedRoute path="/users/:uid" exact={true} auth={auth}>
            <User />
          </ProtectedRoute>

          <ProgramBoardContextProvider>
            <ProtectedRoute path="/" exact={true} auth={auth}>
              <Homepage auth={auth} setAuth={setAuth} setUser={setUser} />
            </ProtectedRoute>
          </ProgramBoardContextProvider>

          <RewardShopContextProvider>
            <ProtectedRoute isPrivate={isPrivate} path="/programs/:pid/memberships/:mid/rewards" exact={true} auth={auth}>
              <NavBar auth={auth} setAuth={setAuth} user={user} setUser={setUser} />
              <RewardShop />
            </ProtectedRoute>
          </RewardShopContextProvider>

          <Footer auth={auth} />

        </OptionsContext.Provider>
      </UserContext.Provider>

    </BrowserRouter>
  );
}
