import React, { useEffect, useState, useContext, useReducer } from "react";

import UserContext from '../context/UserContext'
import HabitBoardContext from "../context/HabitBoardContext"
import {
  programsReducer, habitsReducer, dailiesReducer,
  setPrograms, setHabits, setDailies,

} from "../context/reducers"

export default function HabitBoard() {
  const user = useContext(UserContext);
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
        console.log("ALL OF IT!", programs, habits, dailies, week)
      }

    })()
  }, [])

  console.log("all of it", programs, habits, dailies, week)
  return (
    <HabitBoardContext.Provider value={{ programs, dispatchPrograms, habits, dispatchHabits, dailies, dispatchDailies, week }}>
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}


function HabitsEntry() {
  const { programs, habits, dailies, week } = useContext(HabitBoardContext)
  const user = useContext(UserContext)
  console.log("programs", programs)
  console.log("week", week)

  if (!week || !programs || !habits || !dailies) return null
  console.log("WEEK", week)
  return (
    <article>
      <h2>Habit Board</h2>
      <table style={{ borderWidth: "1px" }}>
        <thead>
          <tr>
            <th>Habit</th>
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
          {programs.map(program => (
            <>
              <tr style={{ color: program.color.hex }}>
                <td colSpan={8}>
                  <h3><img src={`/icons/${program.stamp.stamp}.svg`} style={{ height: "1rem", width: "1rem" }} alt="" /> {program.program}</h3>
                </td>
              </tr>
              {habits.filter(habit => habit.program == program.id).map(habit => (
                <tr style={{ color: habit.color.hex }}>
                  <td>
                    <img
                      src={`/icons/${habit.stamp.stamp}.svg`}
                      alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
                      style={{ height: "1rem", width: "1rem" }}
                    />
                    {habit.habit}
                  </td>
                  {week.map(day => {
                    const [mid] = program.members.filter(m => user.memberships.includes(m))
                    return <StampBox pid={program.id} mid={mid} habit={habit} day={day} />
                  })}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </article>
  )
}



function StampBox({ pid, mid, habit, day }) {

  console.log("pid, mid, habit, day", pid, mid, habit.id, day[1])
  const { dailies } = useContext(HabitBoardContext)
  const [isStamped, setIsStamped] = useState(dailies.find(stamp => stamp.date == day[1]))

  // TODO WHY IS NOT DELETING ICON ON CLICK TOO???
  useEffect(() => {
    // console.log("habit on effect", habit)
    console.log("isStamped", isStamped)
    if (!isStamped) {
      setIsStamped(false)
      // dispatchDailies()
    }
    if (dailies.find(stamp => stamp.date == day[1])) setIsStamped(true)
  }, [isStamped])

  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    console.log("isStamped pre-stamping", isStamped)
    const res = await fetch(`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}`, { method })
    const dailyStamp = await res.json()
    console.log("what is dailyStamp", dailyStamp)
    if (dailyStamp.status) {
      if (dailyStamp.status === "stamped") setIsStamped(true)
      // programDoubles.find(program => program.id === pid).habits.find(h => h.id === habit.id).daily_stamps.find(s => s.day === day).status = "stamped"
      // setPrograms(programDoubles)
    } else {
      // programDoubles.find(program => program.id === pid).habits.find(h => h.id === habit.id).daily_stamps.find(s => s.day === day)
      // setPrograms(programDoubles)
      console.log("nothin")
      setIsStamped(false)
    }
  }

  if (isStamped) {
    return (
      <td>
        <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${String(day.slice(1))}`} onSubmit={onStamp("delete")}>
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
        <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${String(day.slice(1))}`} onSubmit={onStamp("post")}>
          <button type="submit">
            <span>X</span>
          </button>
        </form>
      </td>
    )
  }
}

function StampBoxMark({ habit, day }) {
  const [isStamped, setIsStamped] = useState(false)

  useEffect(() => {
    const foundStamp = habit.daily_stamps.find(stamp => stamp.date == day[1])
    if (foundStamp) setIsStamped(true)
    else setIsStamped(false)
  }, [isStamped])

  if (isStamped) {
    return (
      <img
        src={`/icons/${habit.stamp.stamp}.svg`}
        alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
        style={{ height: "1rem", width: "1rem" }}
      />
    )
  } else {
    return (
      <span>X</span>
    )
  }
}
