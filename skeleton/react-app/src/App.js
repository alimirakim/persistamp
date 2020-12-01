import React, { useState, useEffect, useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./services/auth";
import HabitBoard from "./components/HabitBoard";
import UserContext from './context/UserContext';
import HabitBoardContext from "./context/HabitBoardContext"
import OptionsContext from './context/OptionsContext'
import AboutCard from './components/AboutCard'
import HabitDisplay from './components/HabitDisplay'
import RewardShop from './components/RewardShop'
import UserProfileCard from './components/UserProfileCard'
import {ProgramForm} from './components/ProgramForm'
import {
  programsReducer, habitsReducer, dailiesReducer,
  setPrograms, setHabits, setDailies,
  resetPrograms, resetHabits, resetDailies,
} from "./context/reducers"

import './styles/base.css'
import './styles/all.css'

// import HabitForm from "./components/HabitForm";
// import BarGraph from './components/BarGraph';
// import LineGraph from "./components/LineGraph";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
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
      const user = await authenticate();
      console.log("after auth user", user)
      if (!user.errors) {
        setUser(user)
        setAuthenticated(true);
      }
      setLoaded(true)
    })()
  }, [])


  // When the user changes, reload programs, habits, and dailies
  useEffect(() => {
    if (!user) return;
    console.log("second effect user!!", user);
    (async () => {
      const { colors_data, stamps_data } = await fetch(`/api/users/${user.id}/options`).then(res => res.json())
      setColors(colors_data)
      setStamps(stamps_data)

      const { past_week, programs_data, habits_data, dailies_data } = await fetch(`/api/users/${user.id}/programs`).then(res => res.json())
      setWeek(past_week)
      dispatchPrograms(setPrograms(programs_data))
      dispatchHabits(setHabits(habits_data))
      dispatchDailies(setDailies(dailies_data))
      console.log("printing fetch:", past_week, programs_data, habits_data, dailies_data)
    })()
  }, [user])

  useEffect(() => {
    console.log("user", user, "programs", programs, "habits", habits, "dailies", dailies)
  }, [user, programs, habits, dailies])


  if (!loaded) return null

  return (
    <BrowserRouter>
      <HabitBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, dailies, dispatchDailies, week }}>
        <UserContext.Provider value={{ user, setUser: updateUser }}>
          <OptionsContext.Provider value={{ colors, stamps }}>

            <NavBar authenticated={authenticated} setAuthenticated={setAuthenticated} user={user} />
            <Route path="/login" exact={true}>
              <div className="splashPageBackground overlay">
                <LoginForm
                  authenticated={authenticated}
                  setAuthenticated={setAuthenticated} setUser={updateUser}
                />
              </div>
            </Route>
            <Route path="/about" exact={true}>
              <>
                <h1>About Us</h1>
                <AboutCard />
              </>
            </Route>


            <ProtectedRoute path="/users" exact={true} authenticated={authenticated}>
              <UsersList />
            </ProtectedRoute>
            <ProtectedRoute path="/users/:uid" exact={true} authenticated={authenticated}>
              <User />
            </ProtectedRoute>

            <ProtectedRoute path="/graphs/:hid/members/:mid" authenticated={authenticated}>
              <HabitDisplay />
            </ProtectedRoute>

            <ProtectedRoute path="/" exact={true} authenticated={authenticated}>
            <div style={{display: "flex", flexDirection: "column", alignContent: "center", alignItems: "center", justifyContent: "center"}}>
              <h1 style={{ fontSize: "3rem", marginTop: "1rem", marginBottom: 0, fontFamily: "Cambria", fontStyle: "italic" }}>Persistamp</h1>
              <UserProfileCard />
              <h2 className="cam" style={{ marginBottom: "2rem", marginTop: "5rem", fontSize: "2rem" }}>Habit Board Programs</h2>
              <ProgramForm />
              </div>
              <HabitBoard />
            </ProtectedRoute>

            <ProtectedRoute path="/programs/:pid/members/:mid/rewards" exact={true} authenticated={authenticated}>
              <RewardShop />
            </ProtectedRoute>

          </OptionsContext.Provider>
        </UserContext.Provider>
      </HabitBoardContext.Provider>

    </BrowserRouter>
  );
}

export default App;
