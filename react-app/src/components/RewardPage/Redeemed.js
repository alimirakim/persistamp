import React from 'react'

export default function Redeemed({ redeem, icon }) {
  return (<>
    <article className="rrr">
      <hr style={{ border: "none", borderTop: "1px dashed gray" }} />

      <table>

        <tr>
          <th>ID</th>
          <td>{redeem.rew_id}</td>
        </tr>

        <tr>
          <th>Reward</th>
          <td><i className={`fas fa-xs fa-${icon}`} /> {redeem.title}</td>
        </tr>

        <tr>
          <th><abbr title="Description">Desc.</abbr></th>
          <td>{redeem.description ? redeem.description : "N/A"}</td>
        </tr>

        <tr>
          <th>Date</th>
          <td>{new Date(redeem.redeemed_at).toLocaleString(undefined, { dateStyle: "medium" })} <small>{new Date(redeem.redeemed_at).toLocaleString(undefined, { timeStyle: "short" })}</small></td>
        </tr>

        <tr>
          <th>Cost</th>
          <td>{redeem.cost} {redeem.cost === 1 ? "POINT" : "POINTS"}</td>
        </tr>

      </table>

    </article>

  </>
  )
}