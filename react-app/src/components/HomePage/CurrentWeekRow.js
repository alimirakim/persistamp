import React, { useContext, useState } from "react";

import ProgramBoardProvider from '../../context/ProgramBoardContext'
import HabitForm from '../forms/HabitForm'


export default function CurrentWeekRow({ program }) {
  const { week } = useContext(ProgramBoardProvider)
  const [openCreate, setOpenCreate] = useState(false)

  const toggleCreate = (e) => setOpenCreate(!openCreate)

  return (
    <tr>
      <th>Habits</th>

      {week.map((day, i) => (
        <th key={day}>
          <time dateTime={week[i][1]}>{week[i][0]} <br />
            <small>{week[i][1].slice(8, 10)}</small>
          </time>
        </th>
      ))}
    </tr>
  )
}