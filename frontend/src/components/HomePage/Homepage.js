import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// OUR COMPONENTS
import NavCard from '../nav/NavCard'
import ProgramBoard from './ProgramBoard'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'
import ProgramForm from '../forms/ProgramForm'
import OptionsContext from '../../context/OptionsContext'


export default function Homepage({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const { dispatchSetAll } = useContext(ProgramBoardContext)
  const { colors } = useContext(OptionsContext)
  const [today, setToday] = useState(new Date().getDay())
  const [openCreateProgram, setOpenCreateProgram] = useState(false)
  const toggleCreateProgram = (e) => setOpenCreateProgram(!openCreateProgram)

  useEffect(() => {
    const stopId = setInterval(() => {
      if (new Date().getDay() !== today) setToday(new Date().getDay())
    }, 60000)
    // TODO Check somehow that this cleanup does work
    const stopInterval = () => clearInterval(stopId)
    return stopInterval
  }, [])


  useEffect(() => {
    if (user.id) {
      (async () => {
        const res = await fetch(`/api/users/${user.id}`, { headers: { 'Content-Type': 'application/json' } })
        const content = await res.json();
        setToday(content.past_week[0][1])
        dispatchSetAll({
          week: content.past_week,
          programs: content.programs_data,
          activities: content.activities_data,
          stamps: content.stamps_data,
          points: content.points,
        })
      })()
    }
  }, [user, today])

  if (!auth || !user) return null;

  return (<main>
    <div className="hbd">

      <NavCard auth={auth} setAuth={setAuth} setUser={setUser} />

      <ProgramForm
        open={openCreateProgram}
        handleClose={toggleCreateProgram}
      />
      <Link to="/reward-shop">
        <button
          className="th-big-btn shp-btn"
          style={{ color: colors[user.cid].hex }}
        >
          <i className="fas fa-3x fa-store" /></button>
      </Link>

      <h1 className="th-h1 persistamp">Your Programs</h1>
      
      <button
        className="th-big-btn th-action"
        onClick={toggleCreateProgram}
        style={{ backgroundColor: colors[user.cid].hex }}
      >
        Add Program
      </button>

      
      
      <ProgramBoard />

    </div>
  </main>
  )
}
