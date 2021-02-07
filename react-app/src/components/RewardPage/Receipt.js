import React from 'react'

export default function Receipt({ receipt, icon }) {
  return (<>
    <article className="rrr">
      <hr style={{ border: "none", borderTop: "1px dashed gray" }} />

      <table>

        <tr>
          <th>ID</th>
          <td>{receipt.rew_id}</td>
        </tr>

        <tr>
          <th>Reward</th>
          <td><i className={`fas fa-xs fa-${icon}`} /> {receipt.title}</td>
        </tr>

        <tr>
          <th><abbr title="Description">Desc.</abbr></th>
          <td>{receipt.description ? receipt.description : "N/A"}</td>
        </tr>

        <tr>
          <th>Date</th>
          <td>{new Date(receipt.created_at).toLocaleString(undefined, { dateStyle: "medium" })} <small>{new Date(receipt.created_at).toLocaleString(undefined, { timeStyle: "short" })}</small></td>
        </tr>

        <tr>
          <th>Cost</th>
          <td>{receipt.cost} {receipt.cost === 1 ? "POINT" : "POINTS"}</td>
        </tr>

      </table>

    </article>

  </>
  )
}