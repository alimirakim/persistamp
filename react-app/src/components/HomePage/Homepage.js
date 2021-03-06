import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// OUR COMPONENTS
import NavCard from '../nav/NavCard'
import ProgramBoard from './ProgramBoard'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'

export default function Homepage({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const { dispatchSetAll } = useContext(ProgramBoardContext)
  const [today, setToday] = useState(new Date().getDay())


  useEffect(() => {
    const stopId = setInterval(() => {
      if (new Date().getDay() !== today) setToday(new Date().getDay())
    }, 60000)
    // TODO Check somehow that this cleanup does work
    const stopInterval = () => clearInterval(stopId)
    return stopInterval
  }, [])


  useEffect(() => {
    if (!user.errors) {
      (async () => {
        const res = await fetch(`/api/users/${user.id}`, { headers: { 'Content-Type': 'application/json' } })
        const content = await res.json();
        setToday(content.past_week[0][1])
        dispatchSetAll({
          week: content.past_week,
          programs: content.programs_data,
          activities: content.activities_data,
          stamps: content.stamps_data,
        })
      })()
    }
  }, [user, today])

  if (!auth || !user) return null;

  return (<main>
    <div className="hbd">
      <h1 className="persistamp hbd-title">Persistamp</h1>

      <button className="th-big-btn">Add Program</button>

      <Link to="/reward-shop">
        <button className="ico-btn"><i className="fas fa-10x fa-store" />
        My Reward Shop</button>
      </Link>

      <NavCard auth={auth} setAuth={setAuth} setUser={setUser} />
      <ProgramBoard />

    </div>
  </main>
  )
}
