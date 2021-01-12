import React, { useContext, useState } from "react";

import ProgramBoardProvider from '../../context/ProgramBoardContext'


export default function CurrentWeekRow() {
  const { week } = useContext(ProgramBoardProvider)

  return (
    <tr>
      <th className="pbc-title th-thin-under">
      
      Habits
      </th>

      {week.map((day, i) => (
        <th key={day}>
          <time dateTime={week[i][1]} className="day">
          <div>{week[i][0]}</div>
            <small>{week[i][1].slice(8, 10)}</small>
          </time>
        </th>
      ))}
    </tr>
  )
}