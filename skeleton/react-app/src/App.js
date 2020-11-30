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
import UserProfileCard from "./components/UserProfileCard";
import UserContext from './context/UserContext';
import HabitBoardContext from "./context/HabitBoardContext"
import OptionsContext from './context/OptionsContext'
import AboutCard from './components/AboutCard'
import HabitDisplay from './components/HabitDisplay'
import RewardShop from './components/RewardShop'
import {
  programsReducer, habitsReducer, dailiesReducer,
  setPrograms, setHabits, setDailies,
} from "./context/reducers"

import './styles/base.css'
import './styles/all.css'

// import HabitForm from "./components/HabitForm";
// import BarGraph from './components/BarGraph';
// import LineGraph from "./components/LineGraph";


function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [user, setUser] = useState({})
  const [colors, setColors] = useState()
  const [stamps, setStamps] = useState()
  const [week, setWeek] = useState()

  const [programs, dispatchPrograms] = useReducer(programsReducer)
  const [habits, dispatchHabits] = useReducer(habitsReducer)
  const [dailies, dispatchDailies] = useReducer(dailiesReducer)


  const updateUser = (e) => setUser(e.target.value)

  useEffect(() => {
    (async () => {
      const user = await authenticate();

      if (!user.errors) {
        setAuthenticated(true);
        setUser(user)
        if (!colors) {
          const res = await fetch(`/api/users/${user.id}/options`)
          const { colors_data, stamps_data } = await res.json()
          setColors(colors_data)
          setStamps(stamps_data)
        }
        if (!programs) {
          console.log("not all")
          const res = await fetch(`/api/users/${user.id}/programs`)
          const { past_week, programs_data, habits_data, dailies_data } = await res.json()
          // console.log("all of it...", programs_data, habits_data, dailies_data, past_week)
          setWeek(past_week)
          if (!programs) dispatchPrograms(setPrograms(programs_data))
          if (!habits) dispatchHabits(setHabits(habits_data))
          if (!dailies) dispatchDailies(setDailies(dailies_data))
        }
      }

      setLoaded(true)
    })();
  }, [dailies, habits, programs, week]);

  if (!loaded || !dailies) return null

  return (
    <BrowserRouter>
      <HabitBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, dailies, dispatchDailies, week }}>
        <UserContext.Provider value={{ user, setUser }}>
          <OptionsContext.Provider value={{ colors, stamps }}>
          
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
              <UserProfileCard />
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
