import React, { useEffect, useState, useContext } from 'react'


function RewardShop() {
  const [rewards, setRewards] = useState()
  const [points, setPoints] = useState()

  useEffect(() => {
    if (!rewards) {
      (async () => {
        const res = await fetch(`/rewards`)
        setRewards(await res.json())
      })()
    }
  }, [rewards])
  if (!rewards) return null

  const redeemReward = async () => {
    const res = await fetch(`/rewards/${reward.id}/redeem`)
    
  }
  
  return (
    <article>
      <h1>Redeem Rewards</h1>

      {rewards.map(reward => (
        <>
          <button onClick={showForm}>{reward.reward} <small>Cost: {reward.cost} <img src={`/icons/${reward.stamp.stamp}.svg`} alt={`${reward.stamp.stamp}`} />s</small></button>

          <form onSubmit={redeemReward}>
            <h2>Redeem {reward.reward} for {reward.cost}s?</h2>
            <button type="submit">Yes! Gimme!</button>
            <button onClick={hideForm}>Nevermind</button>
          </form>
        </>
      ))}

    </article>
  )
}