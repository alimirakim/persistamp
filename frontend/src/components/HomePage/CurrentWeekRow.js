import React, { useContext, useState } from "react";

import ProgramBoardProvider from '../../context/ProgramBoardContext'


export default function CurrentWeekRow() {
  const { week } = useContext(ProgramBoardProvider)

  return (
    <tr>
      <th className="pbc-title">
      <div className="activity-header">Activities</div>
      </th>

      {week.map((day, i) => (
        <th key={day} className="day-con">
          <time dateTime={week[i][1]} className="lo-center day">
            <small className="day-num">{week[i][1].slice(8, 10)}</small>
          <div className="day-box">{week[i][0]}</div>
          </time>
        </th>
      ))}
    </tr>
  )
}