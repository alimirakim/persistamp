import React, { useEffect, useState, useContext } from "react"

import HabitBoardContext from "./context"


export default function HabitBoard() {
  const uid = document.cookie.split("; ").find(cookie => cookie.startsWith("uid_cookie")).split("=")[1]

  const [programs, setPrograms] = useState()
  const [programHabits, setHabits] = useState()

  useEffect(() => {
    (async () => {
      if (!programs) {

        const res = await fetch(`/api/users/${uid}/programs`)
        const unraveledPrograms = await res.json()
        console.log("UNRAVELED", uid, unraveledPrograms)
        setPrograms(unraveledPrograms)
        // let habits_list = unraveledPrograms.map(program => {
        //   console.log("program", program)
        //   return program.habits
        // })
        // console.log("habits list", habits_list)
        // setHabits(habits_list)
      }
    })()
  }, [programs, uid])

  if (!programs) return null
  console.log("we have...", programs)
  return (
    <HabitBoardContext.Provider value={programs}>
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}
const week = [new Date()]
for (let i = 1; i < 7; i++) {
  const currentDay = week[0]
  const prevDay = new Date(currentDay.setDate(currentDay.getDate() - i))
  week.push(prevDay)
}

function HabitsEntry() {
  const programs = useContext(HabitBoardContext)
  return (
    <article>
      <h2>Habit Board</h2>
      <table>
        <thead>
          <tr>
            <th>Habit</th>
            <th><time datetime={`${week[0].getDate()}`}>{week[0].getDate()}</time></th>
            <th><time datetime={`${week[1].getDate()}`}>{week[1].getDate()}</time></th>
            <th><time datetime={`${week[2].getDate()}`}>{week[2].getDate()}</time></th>
            <th><time datetime={`${week[3].getDate()}`}>{week[3].getDate()}</time></th>
            <th><time datetime={`${week[4].getDate()}`}>{week[4].getDate()}</time></th>
            <th><time datetime={`${week[5].getDate()}`}>{week[5].getDate()}</time></th>
            <th><time datetime={`${week[6].getDate()}`}>{week[6].getDate()}</time></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td></td>
        </tr>
      </tbody>
      </table>

        <ol>
          {programs.map(program => (
            <li style={{ color: program.color.hex }}>
              <h3><img src={`/icons/${program.stamp.stamp}.svg`} style={{ height: "1rem", width: "1rem" }} /> {program.program}</h3>
              <ol>
                {program.habits.map(habit => (
                  <li key={habit.id} style={{ color: habit.color.hex }}>
                    <img
                      src={`/icons/${habit.stamp.stamp}.svg`}
                      alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
                      style={{ height: "1rem", width: "1rem" }}
                    />
                    {habit.stamp.stamp} {habit.habit}
                  </li>
                ))}
              </ol>
            </li>
          ))}
        </ol>

    </article>
  )
}



function WeeklyRibbon() {
  const datesOfWeek = [new Date()]
  for (let i = 1; i < 7; i++) {
    const currentDay = datesOfWeek[0]
    const prevDay = new Date(currentDay.setDate(currentDay.getDate() - i))
    datesOfWeek.push(prevDay)
  }
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", 'Sat']
  return (
      <>
        <h2>This Week</h2>
        <ol>
          {datesOfWeek.map((date, i) => (
            <li key={i}>{daysOfWeek[date.getDay()]} {date.getDate()}</li>
          ))}
        </ol>
      </>
  )
}