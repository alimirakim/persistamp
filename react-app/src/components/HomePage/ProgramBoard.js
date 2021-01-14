import React, { useContext } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'

export default function ProgramBoard() {
  const { programs } = useContext(ProgramBoardContext)


  return (
    <article>

      <ul>
        {Object.values(programs).map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ul>
      
    </article>
  )
}
