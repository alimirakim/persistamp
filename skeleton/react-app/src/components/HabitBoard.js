import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom'
import useReducer from '../utils'
import UserContext from '../context/UserContext'
import HabitBoardContext from "../context/HabitBoardContext"
import {
  programsReducer, habitsReducer, dailiesReducer,
  setPrograms, setHabits, setDailies, 
  stampDay, unstampDay,
} from "../context/reducers"
import HabitForm from './HabitForm'
import HabitEditForm from './HabitEditForm'
import HabitDeleteForm from './HabitDeleteForm'
import { ProgramForm, ProgramEditForm, ProgramDeleteForm } from './ProgramForm'

export default function HabitBoard() {
  const { user } = useContext(UserContext)
  const [week, setWeek] = useState()
  const uid = user.id

  const [programs, dispatchPrograms] = useReducer(programsReducer)
  const [habits, dispatchHabits] = useReducer(habitsReducer)
  const [dailies, dispatchDailies] = useReducer(dailiesReducer)

  useEffect(() => {
    (async () => {
      if (!programs) {
        console.log("not all")
        const res = await fetch(`/api/users/${uid}/programs`)
        const { past_week, programs_data, habits_data, dailies_data } = await res.json()
        console.log("all of it...", programs_data, habits_data, dailies_data, past_week)
        setWeek(past_week)
        if (!programs) dispatchPrograms(setPrograms(programs_data))
        if (!habits) dispatchHabits(setHabits(habits_data))
        if (!dailies) dispatchDailies(setDailies(dailies_data))
      } else {
        // console.log("ALL OF IT!", programs, habits, dailies, week)
      }

    })()
  }, [dailies, habits, programs, uid, week])

  if (!week || !programs || !habits || !dailies) return null

  return (
    <HabitBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, dailies, dispatchDailies, week }}>
      {/* TODO Complaining about 'unique key prop' here */}
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}


function HabitsEntry() {
  const { programs, habits, week, dispatchHabits } = useContext(HabitBoardContext)
  const { user } = useContext(UserContext)

  return (
    <article>
      <h2>Habit Board</h2>
      <ProgramForm />
      <table>

        {Object.values(programs).map(program => {
          const [mid] = program.members.filter(m => user.memberships.includes(m))
          return (
            <>
              <thead>
                <tr key={program.id} colSpan={7} style={{ color: program.color.hex }}>
                  <td>
                    <ProgramEditForm program={program} />
                    <ProgramDeleteForm program={program} />
                    <h3><img src={`/icons/${program.stamp.stamp}.svg`} style={{ height: "1rem", width: "1rem" }} alt="" /> {program.program}</h3>

                  </td>
                </tr>
                <tr>
                  <th>
                    <HabitForm pid={program.id} program={program.program} dispatchHabits={dispatchHabits} />
                  </th>
                  <th><time dateTime={week[0][1]}>{week[0][0]} <br /><small>{week[0][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[1][1]}>{week[1][0]} <br /><small>{week[1][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[2][1]}>{week[2][0]} <br /><small>{week[2][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[3][1]}>{week[3][0]} <br /><small>{week[3][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[4][1]}>{week[4][0]} <br /><small>{week[4][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[5][1]}>{week[5][0]} <br /><small>{week[5][1].slice(8, 10)}</small></time></th>
                  <th><time dateTime={week[6][1]}>{week[6][0]} <br /><small>{week[6][1].slice(8, 10)}</small></time></th>
                </tr>
              </thead>

              <tbody>
                {Object.values(habits)
                  .filter(habit => habit.program === program.id)
                  .map(habit => (<tr key={habit.id} style={{ color: habit.color.hex }}>
                    <td>
                      <HabitEditForm habit={habit} />
                      <HabitDeleteForm habit={habit} />

                      <Link to={`/graphs/${habit.id}/members/${mid}`} style={{ color: `${habit.color.hex}`, textDecoration: "none" }}><img
                        src={`/icons/${habit.stamp.stamp}.svg`}
                        alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
                        style={{ height: "1rem", width: "1rem" }}
                      />
                        {habit.habit}
                      </Link>
                    </td>
                    {week.map(day => (
                      <StampBox key={`${program.id}${mid}${habit.id}${day}`} pid={program.id} mid={mid} habit={habit} day={day} />
                    ))}
                  </tr>
                  ))
                }
              </tbody>
            </>
          )
        })}
      </table>
    </article>
  )
}

// TODO How to optimize the rerenders here????
function StampBox({ pid, mid, habit, day }) {
  // console.log("pid, mid, habit, day", pid, mid, habit.id, day[1])
  const { dailies, dispatchDailies } = useContext(HabitBoardContext)
  const [isStamped, setIsStamped] = useState(Object.values(dailies).find(stamp => stamp.date === day[1] && stamp.member === mid && stamp.habit === habit.id))
  // console.log("checking existence of stamp", isStamped)

  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    console.log("isStamped pre-stamping", isStamped)
    const res = await fetch(`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}`, { method })
    const dailyStamp = await res.json()
    console.log("what is dailyStamp", dailyStamp)

    if (dailyStamp && dailyStamp.status === "stamped") {
      dispatchDailies(stampDay(dailyStamp))
      setIsStamped(dailyStamp)
    } else {
      setIsStamped(null)
      dispatchDailies(unstampDay(dailyStamp))
    }
  }

  if (isStamped) {
    return (
      <td>
        <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}}`} onSubmit={onStamp("delete")}>
          <button type="submit">
            <img
              src={`/icons/${habit.stamp.stamp}.svg`}
              alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
              style={{ height: "1rem", width: "1rem" }}
            />
          </button>
        </form>
      </td>
    )

  } else {
    return (
      <td>
        <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}`} onSubmit={onStamp("post")}>
          <button type="submit">
            <span>X</span>
          </button>
        </form>
      </td>
    )
  }
}


// function StampBoxMark({ habit, day }) {
//   const [isStamped, setIsStamped] = useState(false)

//   useEffect(() => {
//     const foundStamp = habit.daily_stamps.find(stamp => stamp.date == day[1])
//     if (foundStamp) setIsStamped(true)
//     else setIsStamped(false)
//   }, [isStamped])

//   if (isStamped) {
//     return (
//       <img
//         src={`/icons/${habit.stamp.stamp}.svg`}
//         alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
//         style={{ height: "1rem", width: "1rem" }}
//       />
//     )
//   } else {
//     return (
//       <span>X</span>
//     )
//   }
// }
