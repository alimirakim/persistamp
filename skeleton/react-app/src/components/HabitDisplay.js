import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import HabitContext from '../context/HabitContext'
import HabitEditForm from './HabitEditForm'
import HabitDeleteForm from './HabitDeleteForm'
import LineGraph from './LineGraph'
import CalendarMap from './CalendarMap';


export default function HabitDisplay() {
  const { hid, mid } = useParams()
  const [habit, setHabit] = useState()

  useEffect(() => {
    if (!habit) {
      (async () => {
        const res = await fetch(`/api/habits/${hid}/members/${mid}`)
        const habit = await res.json()
        setHabit(habit)
      })()
    }
  }, [habit])
  if (!habit) return null

  return (
    <HabitContext.Provider value={habit}>
      <article style={{ color: habit.color.hex }}>
        <Link to={`/`}>
        <i className={`fas fa-chevron-circle-left`} style={{color: habit.color.hex}}></i>
        </Link>
        <br/>

        <h1 className={`fas fa-${habit.stamp.stamp}`}> {habit.habit}</h1>

        <h2>Details</h2>
        <dl>
          <dt>Program</dt>
          <dd>{habit.program.program}</dd>
          {/* <dt>Stamper</dt> */}
          {/* <dd>{habit.stamper}</dd> */}
          <dt>Frequency</dt>
          <dd>{habit.frequency.split("").filter(c => c === "t").length} Days</dd>
          <dt>Started on</dt>
          <dd>{new Date(habit.created_at).toLocaleString()}</dd>
          <dt>Description</dt>
          <dd>{habit.description}</dd>
        </dl>

        <LineGraph  mid={mid} habit={habit} />
        <CalendarMap habit={habit} />

      </article>
    </HabitContext.Provider>

  )
}
