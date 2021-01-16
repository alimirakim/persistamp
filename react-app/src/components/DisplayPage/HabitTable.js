import React from 'react'


export default function HabitTable({habit, color, icon}) {
  return (
    <table className="habitDetail__table hdp-table">
      <thead>
        <tr className="hdp-thead" >
          <th className="habitDetail-border">Program</th>
          <th className="habitDetail-border">Description</th>
          <th className="habitDetail-border">Stamp</th>
          <th className="habitDetail-border">Frequency</th>
          <th className="habitDetail-border">Started on</th>
        </tr>
      </thead>
      <tbody className="hdp-tbody">
        <tr>
          <td className="habitDetail__cell habitDetail-border hdp-title">{habit.program_title}</td>
          <td className="habitDetail__cell habitDetail-border hdp-desc">{habit.description}</td>
          <td className="habitDetail__cell habitDetail-border hdp-ico"><i className={`fas fa-2x fa-${icon}`} style={{color}}/></td>
          <td className="habitDetail__cell habitDetail-border hdp-freq">{habit.frequency} / week</td>
          <td className="habitDetail__cell habitDetail-border hdp-date">
            {new Date(habit.created_at).toLocaleString(undefined, { dateStyle: "medium" })}<br />
            {new Date(habit.created_at).toLocaleString(undefined, { timeStyle: "short" })}
          </td>
        </tr>
      </tbody>
    </table>
  )
}
