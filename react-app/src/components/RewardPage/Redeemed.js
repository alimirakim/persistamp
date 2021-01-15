import React from 'react'


export default function Redeemed({ reward, redeem }) {
  return (
    <article className="rrr th-shadow">
      <dl>
        <dt>Reward:</dt>
        <dd>{reward.title}</dd>
        <dt>Description:</dt>
        <dd>{reward.description}</dd>
        <dt>Redeemed at:</dt>
        <dd>
          {new Date(redeem.redeemed_at).toLocaleString(undefined, { dateStyle: "medium" })}<br/>
          {new Date(redeem.redeemed_at).toLocaleString(undefined, { timeStyle: "short" })}
        </dd>
        <dt>Cost:</dt>
        <dd>{reward.cost} Points</dd>
      </dl>
    </article>
  )
}