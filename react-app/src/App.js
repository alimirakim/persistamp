import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserPage";

import UserContext from './context/UserContext';
import ProgramBoardContext from "./context/ProgramBoardContext"
import OptionsContext from './context/OptionsContext'


import AboutCard from './components/AboutCard'
import HabitDisplay from './components/DisplayPage/HabitDisplay'
import RewardShop from './components/RewardPage/RewardShop'
import Homepage from './components/HomePage/Homepage'
import LoadingPage from './components/LoadingPage'

import {
  userReducer, programsReducer, habitsReducer, stampsReducer,
  setUser, setPrograms, setHabits, setStamps,
  resetPrograms, resetHabits, resetStamps,
} from "./context/reducers"

import './styles/index.css'
// import { dispatchUserContent } from "./utils";

// import HabitForm from "./components/HabitForm";
// import BarGraph from './components/BarGraph';
// import LineGraph from "./components/LineGraph";


function App() {
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [colors, setColors] = useState()
  const [icons, setIcons] = useState()
  const [week, setWeek] = useState()

  const [user, dispatchUser] = useReducer(userReducer)
  const [programs, dispatchPrograms] = useReducer(programsReducer)
  const [habits, dispatchHabits] = useReducer(habitsReducer)
  const [stamps, dispatchStamps] = useReducer(stampsReducer)

  // Fancy wrapper function that can be passed down for fancy extra effects :3
  const updateUser = (user) => {
    dispatchPrograms(resetPrograms())
    dispatchHabits(resetHabits())
    dispatchStamps(resetStamps())
  }

  function loadUserData(content) {
    const { user_data, programs_data, habits_data, stamps_data, past_week } = content
    console.log("stamps data", stamps_data)
    setWeek(past_week)
    dispatchUser(setUser(user_data))
    dispatchPrograms(setPrograms(programs_data))
    dispatchHabits(setHabits(habits_data))
    dispatchStamps(setStamps(stamps_data))
    setAuth(true)
  }

  // When the page loads, load the user. Do only once!!
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      })
      const content = await res.json();
      if (!content.errors) {
        loadUserData(content)
      }
      const { colors_data, icons_data } = await fetch(`/api/options`).then(res => res.json())
      console.log("color count", colors_data.length, "stamp count", icons_data.length)
      setColors(colors_data)
      setIcons(icons_data)
      setLoaded(true)
    })()
  }, [])

  // When the user changes, reload programs, habits, and stamps
  // useEffect(() => {
  //   if (!user) return;
  //   (async () => {
  //     const { programs_data, habits_data, stamps_data } = await fetch(`/api/users/${user.id}/programs`).then(res => res.json())
  //     console.log("reload", programs_data, habits_data, stamps_data)
  //     dispatchPrograms(setPrograms(programs_data))
  //     dispatchHabits(setHabits(habits_data))
  //     dispatchStamps(setStamps(stamps_data))
  //   })()
  // }, [user])

  useEffect(() => console.log("user", user), [user])
  useEffect(() => console.log("programs", programs), [programs])
  useEffect(() => console.log("habits", habits), [habits])
  useEffect(() => console.log("stamps", stamps), [stamps])


  if (!loaded) {
    return (<>
      <LoadingPage />
    </>)
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser: updateUser }}>
        <OptionsContext.Provider value={{ colors, icons }}>

          <NavBar auth={auth} setAuth={setAuth} user={user} />

          <Route path="/login" exact={true}>
            <div className="splashPageBackground overlay">
              <LoginForm auth={auth} setAuth={setAuth} loadUserData={loadUserData} />
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

          <ProgramBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, stamps, dispatchStamps, week }}>
            <ProtectedRoute path="/graphs/:hid/memberships/:mid" auth={auth}>
              <HabitDisplay />
            </ProtectedRoute>

            <ProtectedRoute path="/" exact={true} auth={auth}>
              <Homepage />
            </ProtectedRoute>

            <ProtectedRoute path="/programs/:pid/memberships/:mid/rewards" exact={true} auth={auth}>
              <RewardShop />
            </ProtectedRoute>
          </ProgramBoardContext.Provider>

        </OptionsContext.Provider>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
