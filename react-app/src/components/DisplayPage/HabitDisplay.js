import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

import HabitContext from '../../context/HabitContext'

// import HabitEditForm from '../forms/HabitEditForm'
// import HabitDeleteForm from '../forms/HabitDeleteForm'
import LineGraph from './LineGraph'
import CalendarMap from './CalendarMap';
import HabitStatOverview from './HabitStatOverview';


export default function HabitDisplay() {
  const { hid, mid } = useParams()
  const [habit, setHabit] = useState("")

  useEffect(() => {
    if (!habit) {
      (async () => {
        const res = await fetch(`/api/habits/${hid}`)
        const habit = await res.json()
        setHabit(habit)
      })()
    }
  }, [habit])



  if (!habit) return null

  // console.log("HABIT", habit);
  return (
    <HabitContext.Provider value={habit}>
      <main>
        <article style={{ color: habit.color }}>
          <div className="displayPage">
            <div className="displayFormat">
              <div className="habitFormat">
                <div className="habitDetailContainer">
                  <Link to={`/`}>
                    <i className={`fas fa-chevron-circle-left`} style={{ color: habit.color }}></i>
                  </Link>
                  {/* <br/> */}
                  <h1 style={{ fontSize: "4rem" }} className={`cam habitDetail__title`}>
                    <i className={`fas fa-${habit.icon}`}></i>
                    &nbsp;{habit.title}
                  </h1>
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
                        <td className="habitDetail__cell habitDetail-border">{habit.icon}</td>
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
