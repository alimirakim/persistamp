import React, { useContext, useEffect, useState } from 'react'


export default function HabitEditForm({habit}) {

  const showForm = (ev) => {

  }

  const hideForm = (ev) => {

  }

  const editHabit = async (ev) => {
    const res = await fetch(`/habits/${hid}`, {
      method: "PATCH",
      body: JSON.stringify({

      })
  })
  }

  return (
    <>
      <button onClick={editHabit}>
        <img src={`/icons/pencil.svg`} alt="Edit habit" style={{ height: "1em", width: "1em" }} />
      </button>

      <h2>Edit {habit.habit}</h2>
      <form>

      </form>
    </>
  )
}
