import React, { useContext } from "react";
import HabitBoardContext from "../../context/HabitBoardContext"
import ProgramCard from './ProgramCard'

export default function HabitBoard() {
  const { programs, habits, dailies, week, dispatchHabits } = useContext(HabitBoardContext)
  // console.log("user inside habitboard", user)

  if (!programs || !habits || !dailies) return null
  if (!Object.keys(programs).length) return null
  console.log("programs, habits, dailies", programs, habits, dailies)

  return (
    <article className="lo-main-center habit-board">
      <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
        {Object.values(programs).map(program => (
          <ProgramCard program={program} />
        ))}
      </ul>
    </article>
  )
}
