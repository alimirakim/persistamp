import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import SplashContainer from './components/SplashPage/SplashContainer';
// import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import Footer from './components/Footer';
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserPage";

import UserContext from './context/UserContext';
import { ProgramBoardContextProvider } from "./context/ProgramBoardContext"
import OptionsContext from './context/OptionsContext'
import { RewardShopContextProvider } from './context/RewardShopContext'

import AboutCard from './components/AboutCard'
import HabitDisplay from './components/DisplayPage/HabitDisplay'
import RewardShop from './components/RewardPage/RewardShop'
import Homepage from './components/HomePage/Homepage'
import LoadingPage from './components/LoadingPage'

import userReducer, { setUser } from "./reducers/userReducer"

import './styles/index.css'
// import { dispatchUserContent } from "./utils";

// import HabitForm from "./components/HabitForm";
// import BarGraph from './components/BarGraph';
// import LineGraph from "./components/LineGraph";



export default function App() {
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [colors, setColors] = useState()
  const [icons, setIcons] = useState()
  const [user, dispatchUser] = useReducer(userReducer)
  let content;

  // const updateUser = (user) => dispatchPB(resetPrograms())

  // When the page loads, load the user. Do only once!!
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      })
      content = await res.json();
      // const { user_data, programs_data, habits_data, stamps_data, past_week } = content
      dispatchUser(setUser(content.user_data))
      setAuth(true)

      const { colors_data, icons_data } = await fetch(`/api/options`).then(res => res.json())
      console.log("color count", colors_data.length, "stamp count", icons_data.length)
      setColors(colors_data)
      setIcons(icons_data)
      setLoaded(true)
    })()
  }, [])

  useEffect(() => console.log("user", user), [user])
  // useEffect(() => console.log("programs", programs : ""), [pb])
  // useEffect(() => console.log("habits", pb.habits), [pb.habits])
  // useEffect(() => console.log("stamps", pb.stamps), [pb.stamps])

  if (!loaded) {
    return (<>
      <LoadingPage />
    </>)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user }}>
        <OptionsContext.Provider value={{ colors, icons }}>

          <NavBar auth={auth} setAuth={setAuth} user={user} />

          <Route path="/login" exact={true}>
            <div className="splashPageBackground overlay">
              <SplashContainer auth={auth} setAuth={setAuth}  />
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

          {/* <ProtectedRoute path="/graphs/:hid/memberships/:mid" auth={auth}> */}
            <HabitDisplay />
          {/* </ProtectedRoute> */}

          <ProgramBoardContextProvider>
            <ProtectedRoute path="/" exact={true} auth={auth}>
              <Homepage uid={user.id} />
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
