import React from 'react'


export default function ActivityTable({activity, color, icon}) {
  return (<section className="hdp-table">
    <table className="activityDetail__table">
      <thead>
        <tr className="hdp-thead" >
          <th className="activityDetail-border">Activity</th>
          <th className="activityDetail-border" style={{width: "75%"}}>Description</th>
        </tr>
      </thead>
      <tbody className="hdp-tbody">
        <tr>
          <td className="activityDetail__cell activityDetail-border hdp-title">{activity.title}</td>
          <td className="activityDetail__cell activityDetail-border hdp-desc">{activity.description}</td>
        </tr>
      </tbody>
    </table>
    
    <table className="activityDetail__table">
    <thead>
      <tr className="hdp-thead" >
          <th className="activityDetail-border">Program</th>
        <th className="activityDetail-border">Stamp</th>
        <th className="activityDetail-border">Frequency</th>
        <th className="activityDetail-border">Started on</th>
      </tr>
    </thead>
    <tbody className="hdp-tbody">
      <tr>
          <td className="activityDetail__cell activityDetail-border hdp-title">{activity.program_title}</td>
        <td className="activityDetail__cell activityDetail-border hdp-ico"><i className={`fas fa-2x fa-${icon}`} style={{color}}/></td>
        <td className="activityDetail__cell activityDetail-border hdp-freq">{activity.frequency} / week</td>
        <td className="activityDetail__cell activityDetail-border hdp-date">
          {new Date(activity.created_at).toLocaleString(undefined, { dateStyle: "medium" })}<br />
          {new Date(activity.created_at).toLocaleString(undefined, { timeStyle: "short" })}
        </td>
      </tr>
    </tbody>
  </table>
  </section>)
}
