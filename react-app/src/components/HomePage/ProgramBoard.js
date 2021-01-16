import React, { useContext } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'


export default function ProgramBoard() {
  const { programs } = useContext(ProgramBoardContext)


  return (
    <article style={{marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center"}}>

      <ul className="programBoards-container">
        {Array.from(Object.values(programs)).reverse().map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ul>

    </article>
  )
}
