import React, { useContext } from "react";

import HabitBoardProvider from '../../context/HabitBoardContext'
import HabitForm from '../forms/HabitForm'


export default function CurrentWeekRow({ program, dispatchHabits }) {
  const { week } = useContext(HabitBoardProvider)

  return (
    <tr>
      <th>
        <HabitForm pid={program.id} program={program} dispatchHabits={dispatchHabits} />
      </th>

      {week.map((day, i) => (
        <th>
          <time dateTime={week[i][1]}>{week[i][0]} <br />
            <small>{week[i][1].slice(8, 10)}</small>
          </time>
        </th>
      ))}
    </tr>
  )
}