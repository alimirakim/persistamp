import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import HabitContext from '../context/HabitContext'
import HabitEditForm from './HabitEditForm'
import HabitDeleteForm from './HabitDeleteForm'
import LineGraph from './LineGraph'
import BarGraph from './BarGraph'
import CalenderGraph from './CalenderGraph'
import CalendarMap from './CalendarMap';
import HabitStatOverview from './HabitStatOverview';


export default function HabitDisplay() {
  const { hid, mid } = useParams()
  const [habit, setHabit] = useState()

  useEffect(() => {
    if (!habit) {
      (async () => {
        const res = await fetch(`/api/habits/${hid}/members/${mid}`)
        const habit = await res.json()
        // console.log("HABIT", habit)
        setHabit(habit)
      })()
    }
  }, [habit])
  if (!habit) return null

  return (
    <HabitContext.Provider value={habit}>
      <article style={{ color: habit.color.hex }}>
        <div className="displayPage">
          <div className="displayFormat">
            <div className="habitFormat">
              <div className="habitDetailContainer">
                <Link to={`/`}>
                <i className={`fas fa-chevron-circle-left`} style={{color: habit.color.hex}}></i>
                </Link>
                {/* <br/> */}
                <h1 style={{fontSize: "4rem"}} className={`cam fas fa-${habit.stamp.stamp} habitDetail__title`}> {habit.habit}</h1>
                  <table className="habitDetail__table">
                    <thead>
                      <tr>
                        <th>Description</th>
                        <th>Program</th>
                        <th>Stamp</th>
                        <th>Frequency</th>
                        <th>Started on</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="habitDetail__cell">{habit.description}</td>
                        <td className="habitDetail__cell">{habit.program.program}</td>
                        <td className="habitDetail__cell">{habit.stamp.stamp}</td>
                        <td className="habitDetail__cell">{habit.frequency} Days</td>
                        <td className="habitDetail__cell">{new Date(habit.created_at).toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
              </div>
              <HabitStatOverview habit={habit}/>
              <LineGraph  mid={mid} habit={habit} />
            </div>
            <CalendarMap habit={habit} />
          </div>
        </div>
      </article>
    </HabitContext.Provider>

  )
}
