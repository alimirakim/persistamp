import React, {useEffect, useState} from 'react'


export function ProgramForm() {
  
  const showForm = (ev) => {

  }
  const hideForm = (ev) => {

  }
  
  const createProgram = (ev) => {
    
  }
  
  return (
    <>
      <button onClick={showForm}>+Program</button>
      
      <form onSubmit={createProgram}>
        <h2>Create Program</h2>
        
        {/* TODO Add input fields for name, description, color, stamp */}
        
        <button type="submit">Create Program</button>
        <button>Cancel</button>
      </form>
    </>
  )
}


export function ProgramEditForm({program}) {
  
  const showForm = (ev) => {

  }

  const hideForm = (ev) => {

  }

  const editProgram = (ev) => {

  }

  return (
    <>
      <button onClick={editProgram}>
        <img src={`/icons/pencil.svg`} alt="Edit Program" style={{ height: "1em", width: "1em" }} />
      </button>

      <h2>Edit {program.program}</h2>
      <form>

      </form>
    </>
  )
  
}


export function ProgramDeleteForm({program}) {
  
  const showForm = (ev) => {

  }

  const hideForm = (ev) => {

  }

  const deleteProgram = async (ev) => {
    const res = await fetch(`/programs/${program.id}`, { method: "DELETE" })
    if (res.ok) {
      // return <Redirect to="/">
    }
  }

  return (
    <>
      <button onClick={showForm}>
        <img src={`/icons/trash.svg`} alt="Edit program" style={{ height: "1em", width: "1em" }} />
      </button>

      <h2>Delete {program.program}</h2>
      <form method="POST">
        <p>Are you sure you want to PERMANENTLY delete this and all its habits?</p>
        <button onClick={deleteProgram}>DELETE</button>
        <button onClick={hideForm}>Cancel</button>
      </form>
    </>
  )
  
}
