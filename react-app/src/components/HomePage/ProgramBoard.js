import React, { useState, useContext } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import ProgramCard from './ProgramCard'
import ProgramForm from '../forms/ProgramForm'

export default function ProgramBoard() {
  const { programs } = useContext(ProgramBoardContext)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  return (
    <article className="lo-main-center habit-board">
      <button onClick={toggleCreate}>Add Program</button>
      {openCreate &&
        <ProgramForm open={openCreate} handleClose={toggleCreate} />
      }

      <ul style={{ display: "flex", flexDirection: "column-reverse" }}>
        {Object.values(programs).map(program => (
          <ProgramCard key={program.id} program={program} />
        ))}
      </ul>
    </article>
  )
}
