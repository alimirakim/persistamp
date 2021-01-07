import React, { useState, useContext, useEffect } from "react";
import HabitBoardContext from "../../context/HabitBoardContext"
import { stampDay, unstampDay, setDailies } from "../../context/reducers"




// TODO How to optimize the rerenders here????
// Create a user slice of state. In that slice, have user's memberships, habits,
// stamps, etc.. Have each habit have a dailystamp array in order of date.
// ehhh...

// alt 1 wrap each habit row in a habit context
// alt 3 have each stampbox have its island state what only fetches and such
// straight from the source




export default function StampBox({ currentStamps, day, mid, habit }) {
  const [stamp, setStamp] = useState("")
  const { dailies, dispatchDailies } = useContext(HabitBoardContext)
  const stampPath = `/api/daily-stamps/${habit.id}/programs/${habit.program}/memberships/${mid}/days/${day[1]}`

  useEffect(() => {
    const ds = currentStamps.find(dsid => dailies[dsid].date == day[1])
    let stampStatus = ""
    if (ds) stampStatus = "stamped"
    else if (currentStamps.length >= habit.frequency) stampStatus = "fulfilled"
    setStamp(stampStatus)
  }, [currentStamps])
  
  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    const res = await fetch(stampPath, { method })
    const ds = await res.json()
    if (ds && ds.status === "stamped") {
      dispatchDailies(stampDay(ds))
      // setStamp("stamped")
    } else if (currentStamps.length >= habit.frequency) {
      // setStamp("fulfilled")
    } else {
      dispatchDailies(unstampDay(ds))
      // setStamp("")
    }
    console.log("stamp", stamp, currentStamps)
  }

  // const checkCompleted = () => {
  //   const frequency = habit.frequency
  //   const stamps = Object.values(dailies).filter(stamp => stamp.membership === mid && stamp.habit === habit.id)
  //   if (stamps.length >= frequency) return true
  //   else return false
  // }

  if (stamp === "stamped") {
    return (
      <td className="stamp" style={{ color: habit.color }}>
        <form method="POST" onSubmit={onStamp("delete")}>
          <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
            <i className={`fas fa-${habit.icon}`} style={{ color: habit.color }} ></i>
          </button>
        </form>
      </td>
    )

  } else if (stamp === "fulfilled") {
    return (
      <td className="stamp" style={{ color: habit.color }}>
        <form method="POST" onSubmit={onStamp("post")}>
          <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
            <i className={`fas fa-${habit.icon}`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
          </button>
        </form>
      </td>
    )

  } else {
    return (
      <td className="stamp" style={{ color: habit.color }}>
        <form method="POST" onSubmit={onStamp("post")}>
          <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
            <i className={`fas fa-times`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
          </button>
        </form>
      </td>
    )
  }
}
