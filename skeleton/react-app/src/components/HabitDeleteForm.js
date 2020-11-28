import React, { useEffect, useContext, useState } from 'react'
import { useParams, Redirect } from 'react-router-dom'


export default function HabitDeleteForm({ habit }) {
  const { hid, mid } = useParams()

  const showForm = (ev) => {

  }

  const hideForm = (ev) => {

  }

  const deleteHabit = async (ev) => {
    const res = await fetch(`/habits/${hid}`, { method: "DELETE" })
    if (res.ok) {
      // return <Redirect to="/">
    }
  }

  return (
    <>
      <button onClick={showForm}>
        <img src={`/icons/trash.svg`} alt="Edit habit" style={{ height: "1em", width: "1em" }} />
      </button>

      <h2>Delete {habit.habit}</h2>
      <form method="POST">
        <p>Are you sure you want to PERMANENTLY delete this habit?</p>
        <button onClick={deleteHabit}>DELETE</button>
        <button onClick={hideForm}>Cancel</button>
      </form>
    </>
  )
}