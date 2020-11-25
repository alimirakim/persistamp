import React, { useEffect, useState, useContext } from "react";

import UserContext from '../context/UserContext'
import HabitBoardContext from "../context/HabitBoardContext"

export default function HabitBoard() {
  // const uid = document.cookie.split("; ").find(cookie => cookie.startsWith("uid_cookie")).split("=")[1]

  const [programs, setPrograms] = useState()

  const user = useContext(UserContext);
  const uid = user.id

  useEffect(() => {
    (async () => {
      console.log("UNRAVELED", uid, programs)
      if (!programs) {
        const res = await fetch(`/api/users/${uid}/programs`)
        const unraveledPrograms = await res.json()
        // console.log("UNRAVELED", uid, unraveledPrograms)
        setPrograms(unraveledPrograms)
      }
    })()
  }, [programs, uid])

  console.log("prograaams", programs)
  if (!programs) return null
  return (
    <HabitBoardContext.Provider value={programs}>
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}


function HabitsEntry() {
  const [week, setWeek] = useState()
  const programs = useContext(HabitBoardContext)
  const user = useContext(UserContext)
  console.log("\nEYYYY", week)

  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/habits/current_week`)
      const unraveledWeek = await res.json()
      setWeek(unraveledWeek)
    })()
  }, [week])

  if (!week) return null
  console.log("WEEK", week)
  return (
    <article>
      <h2>Habit Board</h2>
      <table style={{borderWidth: "1px"}}>
        <thead>
          <tr>
            <th>Habit</th>
            <th><time datetime={week[0][1]}>{week[0][0]} <br/>{week[0][1]}</time></th>
            <th><time datetime={week[1][1]}>{week[1][0]} <br/>{week[1][1]}</time></th>
            <th><time datetime={week[2][1]}>{week[2][0]} <br/>{week[2][1]}</time></th>
            <th><time datetime={week[3][1]}>{week[3][0]} <br/>{week[3][1]}</time></th>
            <th><time datetime={week[4][1]}>{week[4][0]} <br/>{week[4][1]}</time></th>
            <th><time datetime={week[5][1]}>{week[5][0]} <br/>{week[5][1]}</time></th>
            <th><time datetime={week[6][1]}>{week[6][0]} <br/>{week[6][1]}</time></th>
          </tr>
        </thead>
        <tbody>
          {programs.map(program => (
            <>
              <tr style={{ color: program.color.hex }}>
                <td colSpan={8}>
                  <h3><img src={`/icons/${program.stamp.stamp}.svg`} style={{ height: "1rem", width: "1rem" }} /> {program.program}</h3>
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
                  {week.map(day => <td>x</td>)}
                </tr>
              ))}
            </>
          ))}
        </tbody>
      </table>
    </article >
  )
}



// function WeeklyRibbon() {
//   const datesOfWeek = [new Date()]
//   for (let i = 1; i < 7; i++) {
//     const currentDay = datesOfWeek[0]
//     const prevDay = new Date(currentDay.setDate(currentDay.getDate() - i))
//     datesOfWeek.push(prevDay)
//   }
//   const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", 'Sat']
//   return (
//       <>
//         <h2>This Week</h2>
//         <ol>
//           {datesOfWeek.map((date, i) => (
//             <li key={i}>{daysOfWeek[date.getDay()]} {date.getDate()}</li>
//           ))}
//         </ol>
//       </>
//   )
// }
