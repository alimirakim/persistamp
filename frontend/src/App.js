import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

// contexts
import UserContext from './context/UserContext'
import OptionsContext from './context/OptionsContext'
import { ProgramBoardContextProvider } from "./context/ProgramBoardContext"
import { RewardShopContextProvider } from './context/RewardShopContext'

// components
import SplashContainer from './components/SplashPage/SplashContainer';
import User from "./components/UserPage";
import Footer from "./components/nav/Footer";
import AboutCard from './components/AboutCard'
import ActivityDisplay from './components/DisplayPage/ActivityDisplay'
import RewardShop from './components/RewardPage/RewardShop'
import MainRewardShop from './components/RewardPage/MainRewardShop'
import Homepage from './components/HomePage/Homepage'
import LoadingPage from './components/LoadingPage'


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
      // console.log("color count", colors_data)
      // console.log("icon count", icons_data)
      setIcons(icons_data)
      setColors(colors_data)
      setLoaded(true)
    })()
  }, [])

  if (!loaded) return <LoadingPage />

  if (!colors || !icons) return null

  return (
    <BrowserRouter>

      <UserContext.Provider value={user}>
        <OptionsContext.Provider value={{ colors, icons }}>

          <Route path="/" exact={true}>
            <SplashContainer auth={auth} setAuth={setAuth} setUser={setUser} />
          </Route>

          <ProgramBoardContextProvider>
            <Route path="/" exact={true} auth={auth}>
              <Homepage auth={auth} setAuth={setAuth} setUser={setUser} />
            </Route>

            <Route path="/activities/:aid/memberships/:mid" auth={auth} exact={true}>
              <ActivityDisplay auth={auth} setAuth={setAuth}  isPrivate={isPrivate} setIsPrivate={setIsPrivate} />
            </Route>
          </ProgramBoardContextProvider>

            <RewardShopContextProvider>
            
            <Route path="/reward-shop" exact={true} auth={auth}>
                <MainRewardShop auth={auth} setAuth={setAuth} />
              </Route>
            
              <Route path="/programs/:pid/memberships/:mid/reward-shop" exact={true} auth={auth}>
                <RewardShop auth={auth} setAuth={setAuth} />
              </Route>
              
            </RewardShopContextProvider>

          <Route path="/about" exact={true}>
            <AboutCard auth={auth} setAuth={setAuth} />
          </Route>

          <Route path="/users/:uid" exact={true} auth={auth}>
            <User auth={auth} setAuth={setAuth} />
          </Route>

          <Footer />

        </OptionsContext.Provider>
      </UserContext.Provider>

    </BrowserRouter>
  );
}
