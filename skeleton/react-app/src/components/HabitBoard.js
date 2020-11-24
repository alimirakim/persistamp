import React, { useEffect, useState, useContext } from "react"

import HabitBoardContext from "./context"


export default function HabitBoard() {
  const uid = document.cookie.split("; ").find(cookie => cookie.startsWith("uid_cookie")).split("=")[1]

  const [programs, setPrograms] = useState([])
  const [habits, setHabits] = useState([])

  useEffect(() => {
    (async () => {
      if (!habits.length) {
        const res = await fetch(`/api/users/${uid}/programs`)
        const unraveledPrograms = await res.json()
        setPrograms(unraveledPrograms)
        let habits_list = []
        await unraveledPrograms.forEach(async program => {
          // const res = await fetch(`/api/habits/programs/${program.id}`)
          // const unraveledHabits = await res.json()
          console.log("program", program)
          habits_list.push(...program.habits)

        })
        setHabits(habits_list)
      }
    })()
  }, [programs, habits, uid])

  if (!habits.length) return null
  console.log("habits 0", habits[0])

  return (
    <HabitBoardContext.Provider value={habits}>
      <WeeklyRibbon />
      <HabitsEntry />
    </HabitBoardContext.Provider>
  )
}

function HabitsEntry() {
  const habits = useContext(HabitBoardContext)
  return (
    <article>
      <h2>Habit Board</h2>
      <ul>
        {habits.map(habit => (
          <li key={habit.id} style={{ color: habit.color.hex }}>
            <img
              src={`/icons/${habit.stamp.stamp}.svg`}
              alt={`${habit.stamp.type}: {habit.stamp.stamp}`}
              style={{ height: "1rem", width: "1rem" }} />{habit.stamp.stamp} {habit.habit}
          </li>
        ))}
      </ul>
    </article>
  )
}



function WeeklyRibbon() {
  const datesOfWeek = [new Date()]
  console.log('eh?', datesOfWeek)
  console.log("\nTODAYYYYY", new Date())
  for (let i = 1; i < 7; i++) {
    const currentDay = datesOfWeek[0]
    const prevDay = new Date(currentDay.setDate(currentDay.getDate() - i))
    console.log("i", i, prevDay)
    datesOfWeek.push(prevDay)
  }
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", 'Sat']
  console.log("DATES OF WEEK", datesOfWeek)
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