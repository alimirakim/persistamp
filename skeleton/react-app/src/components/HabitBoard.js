import React, { useEffect, useState, useContext } from "react";

import UserContext from '../context/UserContext'
import HabitBoardContext from "../context/HabitBoardContext"

export default function HabitBoard() {
  // const uid = document.cookie.split("; ").find(cookie => cookie.startsWith("uid_cookie")).split("=")[1]

  const [programs, setPrograms] = useState()
  const [week, setWeek] = useState()

  const user = useContext(UserContext);
  const uid = user.id

  useEffect(() => {
    (async () => {
      console.log("UNRAVELED", uid, programs)
      if (!programs) {
        const res = await fetch(`/api/users/${uid}/programs`)
        const { past_week, programs_data } = await res.json()
        setPrograms(programs_data)
        setWeek(past_week)
      }
    })()
  }, [programs, week, uid])

  console.log("prograaams", programs)
  if (!week) return null
  return (
    <HabitBoardContext.Provider value={{ programs, week }}>
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}





function HabitsEntry() {
  const { programs, week } = useContext(HabitBoardContext)
  // const user = useContext(UserContext)
  // console.log("\nEYYYY", user)
  console.log("programs", programs)
  console.log("week", week)

  // useEffect(() => {
  //   if (!week) {
  //     (async () => {
  //       // fetched = programs.map(async program => {
  //       for (let program of programs) {
  //         const [mid] = user.memberships.filter(m => program.members.includes(m))
  //         // console.log("mid", mid)
  //         const res = await fetch(`/api/habits/programs/${program.id}/members/${mid}/current_week`)
  //         const { past_week, dailies } = await res.json()
  //         const habits = []
  //         for (const habit of program.habits) {
  //           if (dailies[0].habit == habit.id) {
  //             habit.daily_stamps = dailies
  //             habits.push(habit)
  //           }
  //         }
  //         setDailies({ dailies, ...allDailies })
  //         if (!week) setWeek(past_week)
  //       }
  //     })();
  //   }
  // }, [week])

  if (!week) return null
  console.log("WEEK", week)
  return (
    <article>
      <h2>Habit Board</h2>
      <table style={{ borderWidth: "1px" }}>
        <thead>
          <tr>
            <th>Habit</th>
            <th><time dateTime={week[0][1]}>{week[0][0]} <br />{week[0][1]}</time></th>
            <th><time dateTime={week[1][1]}>{week[1][0]} <br />{week[1][1]}</time></th>
            <th><time dateTime={week[2][1]}>{week[2][0]} <br />{week[2][1]}</time></th>
            <th><time dateTime={week[3][1]}>{week[3][0]} <br />{week[3][1]}</time></th>
            <th><time dateTime={week[4][1]}>{week[4][0]} <br />{week[4][1]}</time></th>
            <th><time dateTime={week[5][1]}>{week[5][0]} <br />{week[5][1]}</time></th>
            <th><time dateTime={week[6][1]}>{week[6][0]} <br />{week[6][1]}</time></th>
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
              {program.habits.map(habit => (
                <tr style={{ color: habit.color.hex }}>
                  <td >
                    <img
                      src={`/icons/${habit.stamp.stamp}.svg`}
                      alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
                      style={{ height: "1rem", width: "1rem" }}
                    />
                    {habit.stamp.stamp} {habit.habit}
                  </td>
                  {week.map(day => (
                    <StampBox habit={habit} day={day} />
                  ))}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </article >
  )
}

function StampBox({habit, day}) {
  console.log("stampbox daily compare", habit.daily_stamps)
  console.log(habit.daily_stamps[0].date, day)
  const foundStamp = habit.daily_stamps.find(stamp => stamp.date == day[1])
  if (foundStamp) {
    return (
      <td><img src={`/icons/${habit.stamp.stamp}.svg`} style={{ height: "1rem", width: "1rem" }} /></td>
    )
  } else {
    return (
      <td>X</td>
    )
  }
}


{/* function StampBox()
  // async function stamp(e) {
  // e.preventDefault()
  // await fetch(`/programs/${pid}/members/${mid}/habit/${hid}/day/${day}`)
  // }
  // if 
  // return (
  //   <>
  //     <form method="POST" action="/stamp" onSubmit={stamp}>
  //       <button type="submit">
  //         <img
  //           src={`/icons/${habit.stamp.stamp}.svg`}
  //           alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
  //           style={{ height: "1rem", width: "1rem" }}
  //         />
  //       </button>
  //     </form>
  //   </>
  // )
{/* } */}