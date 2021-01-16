import React, { useState, useContext, useEffect } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'


export default function ProgramBoard() {
  const { programs } = useContext(ProgramBoardContext)
  const [con, setCon] = useState("")

  useEffect(() => {
    if (Object.keys(programs).length < 3) setCon("")
    else setCon("programBoards-container")
    console.log("p change")
  }, [Object.keys(programs).length])

  if (Object.keys(programs).length === 0) {
    return <main className="msg-none lo-center th-txt-shadow">You have no programs yet.</main>
  }
  
  return (
    <main style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

      <ul className={con}>
        {Array.from(Object.values(programs)).reverse().map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ul>

    </main>
  )
}
