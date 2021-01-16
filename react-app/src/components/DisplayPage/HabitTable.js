import React from 'react'


export default function HabitTable({habit, color, icon}) {
  return (<section className="hdp-table">
    <table className="habitDetail__table">
      <thead>
        <tr className="hdp-thead" >
          <th className="habitDetail-border">Habit</th>
          <th className="habitDetail-border" style={{width: "75%"}}>Description</th>
        </tr>
      </thead>
      <tbody className="hdp-tbody">
        <tr>
          <td className="habitDetail__cell habitDetail-border hdp-title">{habit.title}</td>
          <td className="habitDetail__cell habitDetail-border hdp-desc">{habit.description}</td>
        </tr>
      </tbody>
    </table>
    
    <table className="habitDetail__table">
    <thead>
      <tr className="hdp-thead" >
          <th className="habitDetail-border">Program</th>
        <th className="habitDetail-border">Stamp</th>
        <th className="habitDetail-border">Frequency</th>
        <th className="habitDetail-border">Started on</th>
      </tr>
    </thead>
    <tbody className="hdp-tbody">
      <tr>
          <td className="habitDetail__cell habitDetail-border hdp-title">{habit.program_title}</td>
        <td className="habitDetail__cell habitDetail-border hdp-ico"><i className={`fas fa-2x fa-${icon}`} style={{color}}/></td>
        <td className="habitDetail__cell habitDetail-border hdp-freq">{habit.frequency} / week</td>
        <td className="habitDetail__cell habitDetail-border hdp-date">
          {new Date(habit.created_at).toLocaleString(undefined, { dateStyle: "medium" })}<br />
          {new Date(habit.created_at).toLocaleString(undefined, { timeStyle: "short" })}
        </td>
      </tr>
    </tbody>
  </table>
  </section>)
}
