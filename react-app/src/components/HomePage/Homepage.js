import React, { useContext, useState, useEffect } from 'react'

// OUR COMPONENTS
import UserProfileCard from './UserProfileCard'
import ProgramForm from '../forms/ProgramForm'
import ProgramBoard from './ProgramBoard'
import ProgramBoardContext from '../../context/ProgramBoardContext'

export default function Homepage({ uid }) {
  const { dispatchSetAll } = useContext(ProgramBoardContext)
  
  useEffect(() => {
    (async () => {
      const res = await fetch(`/api/users/${uid}`, { headers: { 'Content-Type': 'application/json' } })
      const content = await res.json();
      dispatchSetAll({
        week: content.past_week,
        programs: content.programs_data,
        habits: content.habits_data,
        stamps: content.stamps_data,
      })
    })()
  }, [])

  return (<main>
    <div className="hbd">
      <h1>Persistamp</h1>
      <UserProfileCard />
    </div>

    <ProgramBoard />
  </main>
  )
}