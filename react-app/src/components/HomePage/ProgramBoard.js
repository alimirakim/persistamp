import React, { useContext } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'

export default function ProgramBoard() {
  const { programs, habits, stamps, } = useContext(ProgramBoardContext)

  if (!programs || !habits || !stamps) return null
  
  return (
    <article className="lo-main-center habit-board">
      <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
        {Object.values(programs).map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ul>
    </article>
  )
}
