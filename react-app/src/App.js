import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
// import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/UserPage";

import UserContext from './context/UserContext';
import HabitBoardContext from "./context/HabitBoardContext"
import OptionsContext from './context/OptionsContext'


import HabitBoard from "./components/HomePage/HabitBoard";
import AboutCard from './components/AboutCard'
import HabitDisplay from './components/DisplayPage/HabitDisplay'
import RewardShop from './components/RewardPage/RewardShop'
import UserProfileCard from './components/HomePage/UserProfileCard'
import { ProgramForm } from './components/forms/ProgramForm'

import {
  programsReducer, habitsReducer, dailiesReducer,
  setPrograms, setHabits, setDailies,
  resetPrograms, resetHabits, resetDailies,
} from "./context/reducers"

import './styles/index.css'

// import HabitForm from "./components/HabitForm";
// import BarGraph from './components/BarGraph';
// import LineGraph from "./components/LineGraph";


function App() {
  const [auth, setAuth] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState()
  const [colors, setColors] = useState()
  const [stamps, setStamps] = useState()
  const [week, setWeek] = useState()

  const [programs, dispatchPrograms] = useReducer(programsReducer)
  const [habits, dispatchHabits] = useReducer(habitsReducer)
  const [dailies, dispatchDailies] = useReducer(dailiesReducer)

  // Fancy wrapper function that can be passed down for fancy extra effects :3
  const updateUser = (user) => {
    dispatchPrograms(resetPrograms())
    dispatchHabits(resetHabits())
    dispatchDailies(resetDailies())
    setUser(user)
  }


  // When the page loads, load the user. Do only once!!
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/auth/', {
        headers: { 'Content-Type': 'application/json' }
      })
      const content = await res.json();
      if (!content.errors) {
        const { user_data, programs_data, habits_data, daily_stamps_data, past_week } = content
        console.log("after auth week", past_week)
        setUser(user_data)
        setWeek(past_week)
        dispatchPrograms(setPrograms(programs_data))
        dispatchHabits(setHabits(habits_data))
        dispatchDailies(setDailies(daily_stamps_data))
        setAuth(true);
      }
      const { colors_data, stamps_data } = await fetch(`/api/options`).then(res => res.json())
      console.log("colors?!", colors_data)
      setColors(colors_data)
      setStamps(stamps_data)
      setLoaded(true)
    })()
  }, [])


  // When the user changes, reload programs, habits, and dailies
  useEffect(() => {
    if (!user) return;
    (async () => {

      console.log("effected")
      const { programs_data, habits_data, dailies_data } = await fetch(`/api/users/${user.id}/programs`).then(res => res.json())
      console.log("reload", programs_data, habits_data, dailies_data)
      dispatchPrograms(setPrograms(programs_data))
      dispatchHabits(setHabits(habits_data))
      dispatchDailies(setDailies(dailies_data))
      console.log("printing fetch:", programs_data, habits_data, dailies_data)
    })()
  }, [user])

  useEffect(() => {
    console.log("user", user, "programs", programs, "habits", habits, "dailies", dailies)
  }, [user, programs, habits, dailies])


  if (!loaded) return null

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser: updateUser }}>
        <OptionsContext.Provider value={{ colors, stamps }}>

          <NavBar auth={auth} setAuth={setAuth} user={user} />

          <Route path="/login" exact={true}>
            <div className="splashPageBackground overlay">
              <LoginForm auth={auth} setAuth={setAuth} setUser={updateUser} />
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

          <HabitBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, dailies, dispatchDailies, week }}>
            <ProtectedRoute path="/graphs/:hid/memberships/:mid" auth={auth}>
              <HabitDisplay />
            </ProtectedRoute>

            <ProtectedRoute path="/" exact={true} auth={auth}>
              <div className="hbd">
                <h1>Persistamp</h1>
                <UserProfileCard />
                <h2 className="cam">Habit Board Programs</h2>
                <ProgramForm />
              </div>

              <HabitBoard />
            </ProtectedRoute>
          </HabitBoardContext.Provider>

          <ProtectedRoute path="/programs/:pid/memberships/:mid/rewards" exact={true} auth={auth}>
            <RewardShop />
          </ProtectedRoute>

        </OptionsContext.Provider>
      </UserContext.Provider>

    </BrowserRouter>
  );
}

export default App;
