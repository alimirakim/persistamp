import React, { useEffect, useState, useContext } from "react"
import HabitBoardContext from "./context"

export default function HabitBoard() {
  const [habits, setHabits] = useState([])
  const mid = 2
  useEffect(() => {
    (async () => {
      if (!habits.length) {
        const res = await fetch(`/api/members/${mid}/habits`)
        const unraveled_habits = await res.json()
        setHabits(unraveled_habits)
      }
    })()
  })

  if (!habits.length) return null

  return (
    <HabitBoardContext.Provider value={habits}>
      <article>
        <h2>Habit Board</h2>
        <HabitsEntry />
      </article>
    </HabitBoardContext.Provider>
  )
}

function HabitsEntry() {
  const habits = useContext(HabitBoardContext)
  return (
    <ul>
      {habits.map(habit => (
        <li key={habit.id} style={{ color: habit.color.hex }}>
          <img 
            src={`/icons/${habit.stamp.stamp}.svg`} 
            alt={`${habit.stamp.type}: {habit.stamp.stamp}`} 
            style={{height: "1rem", width: "1rem"}} />{habit.stamp.stamp} {habit.habit}
        </li>
      ))}
    </ul>
  )
}