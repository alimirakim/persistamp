import React from 'react'


export default function Redeemed({ reward, redeem }) {
  return (
    <article className="rrr">
      <dl>
        <dt>Reward:</dt>
        <dd>{reward.title}</dd>
        <dt>Description:</dt>
        <dd>{reward.description}</dd>
        <dt>Redeemed at:</dt>
        <dd>{new Date(redeem.redeemed_at).toLocaleString()}</dd>
        <dt>Cost:</dt>
        <dd>{reward.cost} <i className={`fas fa-${reward.icon}`}></i></dd>
      </dl>
    </article>
  )
}