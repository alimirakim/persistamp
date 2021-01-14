import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import HabitContext from '../../context/HabitContext'

// import HabitEditForm from '../forms/HabitEditForm'
// import HabitDeleteForm from '../forms/HabitDeleteForm'
import LineGraph from './LineGraph'
import CalendarMap from './CalendarMap';
import HabitStatOverview from './HabitStatOverview';
import PrivatePage from '../PrivatePage';

import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';


export default function HabitDisplay({auth, isPrivate, setIsPrivate}) {
  const { hid, mid } = useParams()
  const [habit, setHabit] = useState("")

  // const [isPrivate, setIsPrivate] = useState(true);

  useEffect(() => {
    // let isMounted = true;
    if (!habit) {
      (async () => {
        const res = await fetch(`/api/habits/${hid}/memberships/${mid}`)
        const habit = await res.json()
        // console.log("THIS?", habit, isMounted)
        // if (isMounted) {
          setHabit(habit)
          setIsPrivate(habit.private)
          // console.log("REACHING THIS?", habit)
        // }
      })()
      // return () => { isMounted = false};
    }
  }, [habit, mid, hid, isPrivate])

  const handleToggle = async (e) => {
    if (!auth) return;
    const res = await fetch(`/api/habits/${hid}/switchPrivacy`)
    const newHabit = await res.json();
    // console.log("NEW HABIT", newHabit)
    setHabit(newHabit);
    setIsPrivate(newHabit.private);
  }
  // console.log("HITTING BEFORE CHECKS?", habit)
  if (!habit) return null;
  // console.log("HITTING BETWEEN CHECKS?")
  if (habit.private && !auth) return <PrivatePage />
  // console.log("HITTING AFTER?")

  return (
    <HabitContext.Provider value={habit}>
      <main>
        <article style={{ color: habit.color }}>
          <div className="displayPage">
            <div className="displayFormat">
              <div className="habitFormat">
                <div className="habitDetailContainer">

                  {/* <br/> */}
                  <div className="habitHeader">
                    <h1 style={{ fontSize: "4rem" }} className={`cam habitDetail__title`}>
                      <i className={`fas fa-${habit.icon}`}></i>
                      &nbsp;{habit.title}
                    </h1>
                    {auth ?
                      <FormGroup row>
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
                    :
                    <></>
                    }
                  </div>
                  <table className="habitDetail__table">
                    <thead>
                      <tr>
                        <th className="habitDetail-border">Description</th>
                        <th className="habitDetail-border">Program</th>
                        <th className="habitDetail-border">Stamp</th>
                        <th className="habitDetail-border">Frequency</th>
                        <th className="habitDetail-border">Started on</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="habitDetail__cell habitDetail-border">{habit.description}</td>
                        <td className="habitDetail__cell habitDetail-border">{habit.program.title}</td>
                        <td className="habitDetail__cell habitDetail-border"><i className={`fas fa-2x fa-${habit.icon}`} /></td>
                        <td className="habitDetail__cell habitDetail-border">{habit.frequency} Days</td>
                        <td className="habitDetail__cell habitDetail-border">{new Date(habit.created_at).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <HabitStatOverview habit={habit} />
                <LineGraph mid={mid} habit={habit} />
              </div>
              <CalendarMap habit={habit} />
            </div>
          </div>
        </article>

      </main>
    </HabitContext.Provider>

  )
}
