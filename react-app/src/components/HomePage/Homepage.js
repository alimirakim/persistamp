import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// OUR COMPONENTS
import NavCard from '../nav/NavCard'
import ProgramBoard from './ProgramBoard'
import ProgramForm from '../forms/ProgramForm'
import ProgramBoardContext from '../../context/ProgramBoardContext'
import UserContext from '../../context/UserContext'
import OptionsContext from '../../context/OptionsContext'

export default function Homepage({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const { colors, icons } = useContext(OptionsContext)
  const { dispatchSetAll } = useContext(ProgramBoardContext)
  const [today, setToday] = useState(new Date().getDay())
  const userColor = colors[user.cid].hex
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
      <div class="header-container">
        <div>
          <h1 className="persistamp hbd-title">Persistamp</h1>
          <button 
            onClick={toggleCreateProgram}
            className="th-big-btn action-btn"
            style={{backgroundColor: colors[user.cid].hex}}
          >
            Add Program
          </button>
        </div>
        <NavCard auth={auth} setAuth={setAuth} setUser={setUser} />

        <div>
          <div className="rwd-btn-container">
            <Link to="/reward-shop">
              <div className="lo-center">
                <i className={`fas fa-4x fa-${icons[user.iid].title}`} />
                <h2>Rewards</h2>
              </div>
            </Link>
          </div>
        </div>

        <ProgramForm
          open={openCreateProgram}
          handleClose={toggleCreateProgram}
        />
      </div>


      <ProgramBoard />

    </div>
  </main>
  )
}
