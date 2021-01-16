import React, { useContext, useEffect } from 'react'
// OUR COMPONENTS
import NavCard from '../nav/NavCard'
import ProgramBoard from './ProgramBoard'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'

export default function Homepage({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const { dispatchSetAll } = useContext(ProgramBoardContext)

  useEffect(() => {
    if (!user.errors) {
      (async () => {
        const res = await fetch(`/api/users/${user.id}`, { headers: { 'Content-Type': 'application/json' } })
        const content = await res.json();
        dispatchSetAll({
          week: content.past_week,
          programs: content.programs_data,
          habits: content.habits_data,
          stamps: content.stamps_data,
        })
      })()
    }
  }, [user])

  if (!auth) return null
  if (!user) return null;

  return (<main>
    <div className="hbd">
      <NavCard auth={auth} setAuth={setAuth} setUser={setUser} />
      <ProgramBoard />
      
    </div>
  </main>
  )
}
