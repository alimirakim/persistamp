import React, { useState, useContext } from "react";
import HabitBoardContext from "../../context/HabitBoardContext"
import { stampDay, unstampDay, setDailies } from "../../context/reducers"




// TODO How to optimize the rerenders here????
export default function StampBox({ ds, stampPath, mid, habit }) {
  if (ds) console.log("stampbox", ds)
  const [isStamped, setIsStamped] = useState(ds ? true : false)
  const { dailies, dispatchDailies } = useContext(HabitBoardContext)


  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    const res = await fetch(stampPath, { method })
    const dailyStamp = await res.json()

    if (dailyStamp && dailyStamp.status === "stamped") {
      dispatchDailies(stampDay(dailyStamp))
      setIsStamped(dailyStamp)
    } else {
      setIsStamped(false)
      dispatchDailies(unstampDay(dailyStamp))
    }
  }

  const checkCompleted = () => {
    const frequency = habit.frequency
    const stamps = Object.values(dailies).filter(stamp => stamp.membership === mid && stamp.habit === habit.id)
    if (stamps.length >= frequency) return true
    else return false
  }
  
  if (isStamped) {
    return (
      <td className="stamp" style={{ color: habit.color.hex }}>
        <form method="POST" onSubmit={onStamp("delete")}>
          <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
            <i className={`fas fa-${habit.stamp.stamp}`} style={{ color: habit.color.hex }} ></i>
          </button>
        </form>
      </td>
    )

  } else {
    if (checkCompleted()) {
      return (
        <td className="stamp" style={{ color: habit.color.hex }}>
          <form method="POST" onSubmit={onStamp("post")}>
            <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
              <i className={`fas fa-${habit.stamp.stamp}`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
            </button>
          </form>
        </td>
      )
    } else {
      return (
        <td className="stamp" style={{ color: habit.color.hex }}>
          <form method="POST" onSubmit={onStamp("post")}>
            <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: "0" }}>
              <i className={`fas fa-times`} style={{ color: "rgb(100,100,100,0.5)" }} ></i>
            </button>
          </form>
        </td>
      )
    }
  }
}
