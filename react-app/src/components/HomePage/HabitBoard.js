import React, { useContext } from "react";
import HabitBoardContext from "../../context/HabitBoardContext"
import ProgramCard from './ProgramCard'

export default function HabitBoard() {
  const { programs, habits, stamps, } = useContext(HabitBoardContext)

  if (!programs || !habits || !stamps) return null
  
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
