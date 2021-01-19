import React, { useState, useContext, useEffect } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'


export default function ProgramBoard() {
  const { programs } = useContext(ProgramBoardContext)
  const [con, setCon] = useState("")
  const [pidOrder, setPidOrder] = useState([])

  useEffect(() => {
    if (Object.keys(programs).length === 0) setCon("pbc-con-none")
    else if (Object.keys(programs).length < 3) setCon("")
    else setCon("programBoards-container")
    setPidOrder(Array.from(Object.keys(programs).reverse()))
  }, [Object.keys(programs).length])

  return (
    <main style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

      {con === "pbc-con-none" &&
        <article className="msg-none lo-center th-txt-shadow">You have no programs yet. Click the 'Add' stamp icon in the top-left to start a new one.</article>
      }

      <ul className={`${con} program-cards`}>
        {pidOrder.map((pid, i) => (
          <li key={pid} className="th-card-shadow" >
            <ProgramCard program={programs[pid]} />
          </li>
        ))}
      </ul>
    </main>
  )
}
