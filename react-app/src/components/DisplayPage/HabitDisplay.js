import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import OptionsContext from '../../context/OptionsContext'
// import HabitContext from '../../context/HabitContext'
import UserContext from '../../context/UserContext'

// import HabitEditForm from '../forms/HabitEditForm'
// import HabitDeleteForm from '../forms/HabitDeleteForm'
import LineGraph from './LineGraph'
import CalendarMap from './CalendarMap';
import HabitStatOverview from './HabitStatOverview';
import PrivatePage from '../PrivatePage';
import NavCard from '../nav/NavCard'
import ProgramBoardContext from '../../context/ProgramBoardContext';
import HabitTable from './HabitTable'

export default function HabitDisplay({ auth, setAuth, setUser, isPrivate, setIsPrivate }) {
  const history = useHistory()
  const { hid, mid } = useParams()
  const user = useContext(UserContext)
  const { habits, programs, dispatchSetAll, dispatchCreateHabit, dispatchEditHabit } = useContext(ProgramBoardContext)
  const habit = habits[hid]
  const { colors, icons } = useContext(OptionsContext)


  useEffect(() => {
    if (!habit) {
      (async () => {
        const res = await fetch(`/api/habits/${hid}/memberships/${mid}`)
        const fetchedHabit = await res.json()
        if (fetchedHabit.pid && programs[fetchedHabit.pid]) {
          dispatchCreateHabit(fetchedHabit)
          setIsPrivate(fetchedHabit.private)
        } else {
          return history.push('/')
        }
      })()
    }
  }, [habit, mid, hid, isPrivate])

  // Making sure to get all user's data if not retrieved already
  useEffect(() => {
    if (auth && !habits) {
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

  const handleToggle = async (e) => {
    if (!auth) return;
    const res = await fetch(`/api/habits/${hid}/switchPrivacy`)
    const newHabit = await res.json();
    dispatchEditHabit(newHabit);
    setIsPrivate(newHabit.private);
  }

  if (!habit) return null
  if (habit.private && !auth) return <PrivatePage />
  const color = habit.cid === 32 ? "white" : colors[habit.cid].hex

  return (<>
    <NavCard
      auth={auth}
      setAuth={setAuth}
      setUser={setUser}
      habit={habit}
    />

    <main>
      {auth &&
        <FormGroup className="hdp-toggle" row>
          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={handleToggle}
                name="togglePrivacy"
                color="secondary"
              />
            }
            label="Private"
          />
        </FormGroup>
      }

      <HabitTable habit={habit} color={color} icon={icons[habit.iid].title} />

      <article className="hdp-con" style={{ color }}>
        <div className="displayPage">
          <div className="displayFormat">
            <div className="habitFormat">
            
              {/* <div className="habitDetailContainer"> */}
              {/* <br/> */}
              {/* <div className="habitHeader"> */}
              {/* <h1 style={{ fontSize: "4rem" }} className={`cam habitDetail__title`}>
                      {console.log("inside", habit)}
                      <i className={`fas fa-${icons[habit.iid].title}`}></i>
                      &nbsp;{habit.title}
                    </h1> */}
              {/* </div> */}
              {/* </div> */}
              
              <HabitStatOverview habit={habit} />
              <LineGraph color={color} />
            </div>
            <CalendarMap habit={habit} />
          </div>
        </div>
      </article>

    </main>

  </>)
}
