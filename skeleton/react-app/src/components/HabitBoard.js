import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'
import HabitBoardContext from "../context/HabitBoardContext"
import { stampDay, unstampDay, setDailies } from "../context/reducers"
import HabitForm from './HabitForm'
import HabitEditForm from './HabitEditForm'
import HabitDeleteForm from './HabitDeleteForm'
import { ProgramForm, ProgramEditForm, ProgramDeleteForm } from './ProgramForm'
import UserProfileCard from './UserProfileCard'

export default function HabitBoard() {
  const { user } = useContext(UserContext)
  const { programs, habits, dailies, week, dispatchHabits } = useContext(HabitBoardContext)
  // console.log("user inside habitboard", user)

  if (!programs || !habits || !dailies) return null

  return (
    <article className="lo-main-center">
      <h1 style={{fontSize: "3rem", marginTop: "1rem", marginBottom: 0, fontFamily: "Cambria", fontStyle: "italic"}}>Persistamp</h1>
      <UserProfileCard />
      <h2>Habit Board Programs</h2>
      <ProgramForm />
      <ul style={{display: "flex", flexDirection: "column-reverse"}}>
        {programs && Object.values(programs).map(program => {
          const [mid] = program.members.filter(m => Object.keys(user.memberships).includes(String(m)))
          // console.log("mid, program m, user m,", mid, program.members, user.memberships)
          return (
            <li key={program.id}>
              <table>
                <thead>
                  <tr key={program.id} style={{ color: program.color.hex }}>
                    <td colSpan={8}>

                      <ProgramEditForm program={program} />
                      <ProgramDeleteForm program={program} />

                      <h3>
                        <i className={`fas fa-${program.stamp.stamp}`}></i> {program.program}
                      </h3>
                      <Link to={`/programs/${program.id}/members/${mid}/rewards`}>
                        <i className={`fas fa-store`} style={{ color: program.color.hex }}></i>
                      </Link>
                      <span> Points: {user.memberships[mid].points} <i className={`fas fa-${program.stamp.stamp}`}></i></span>
                      <blockquote>{program.description}</blockquote>

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
                  {/* style={{display: "flex", flexDirection: "column-reverse"}}> */}
                  {habits && Object.values(habits)
                    .filter(habit => habit.program === program.id)
                    .map(habit => (<tr key={habit.id} style={{ color: habit.color.hex }}>
                      <td style={{ display: "flex" }}>
                        <HabitEditForm habit={habit} />
                        <HabitDeleteForm habit={habit} />

                        <Link to={`/graphs/${habit.id}/members/${mid}`} style={{ color: `${habit.color.hex}`, textDecoration: "none" }}>
                          <i className={`fas fa-${habit.stamp.stamp}`}></i> {habit.habit}
                        </Link>
                      </td>
                      {week.map(day => (
                        <StampBox key={`${program.id}${mid}${habit.id}${day}`} pid={program.id} mid={mid} habit={habit} day={day} />
                      ))}
                    </tr>))
                  }
                </tbody>
              </table>
            </li>
          )
        })}
      </ul>
    </article>
  )
}

// TODO How to optimize the rerenders here????
function StampBox({ pid, mid, habit, day }) {
  const { dailies, dispatchDailies } = useContext(HabitBoardContext)
  // console.log("what dailies", dailies)
  const [isStamped, setIsStamped] = useState(Object.values(dailies).find(stamp => stamp.date === day[1] && stamp.member === mid && stamp.habit === habit.id))


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

  const checkCompleted = () => {
    const frequency = habit.frequency
    const stamps = Object.values(dailies).filter(stamp => stamp.member === mid && stamp.habit === habit.id)
    if (stamps.length >= frequency) {
      return true
    }
    return false;
  }

  if (isStamped) {
    return (
      <td style={{ color: habit.color.hex }}>
        <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}}`} onSubmit={onStamp("delete")}>
          <button type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
            <i className={`fas fa-${habit.stamp.stamp}`} style={{ color: habit.color.hex }} ></i>
          </button>
        </form>
      </td>
    )

  } else {
    if (checkCompleted()) {
      return (
        <td style={{ color: habit.color.hex }}>
          <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}`} onSubmit={onStamp("post")}>
            <button type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
              <i className={`fas fa-${habit.stamp.stamp}`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
            </button>
          </form>
        </td>
      )
    } else {
      return (
        <td style={{ color: habit.color.hex }}>
          <form method="POST" action={`/api/habits/${habit.id}/programs/${pid}/members/${mid}/days/${day[1]}`} onSubmit={onStamp("post")}>
            <button type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
              <i className={`fas fa-times`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
            </button>
          </form>
        </td>
      )
    }
  }
}
