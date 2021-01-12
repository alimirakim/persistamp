import React, { useState, useContext, useEffect } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"


// TODO How to optimize the rerenders here????
// Create a user slice of state. In that slice, have user's memberships, habits,
// stamps, etc.. Have each habit have a dailystamp array in order of date.
// ehhh...

// alt 1 wrap each habit row in a habit context
// alt 3 have each stampbox have its island state what only fetches and such
// straight from the source

export default function StampBox({ day, mid, hid }) {
  const { dispatchStampDay, dispatchUnstampDay, stamps, habits, } = useContext(ProgramBoardContext)
  const [stampStatus, setStampStatus] = useState("")
  const method = stampStatus === "stamped" ? "delete" : "post"
  const icon = stampStatus ? habits[hid].icon : "times"
  const color = stampStatus === "stamped" ? habits[hid].color : "rgb(100,100,100,0.5)"
  const stampPath = `/api/stamps/${habits[hid].id}/programs/${habits[hid].program_id}/memberships/${mid}/days/${day[1]}`
  
  useEffect(() => {
    // console.log("stampy habit", habits[hid].stamp_ids.length, habits[hid].frequency, habits[hid])
    const s = habits[hid].stamp_ids.find(sid => stamps[sid].date === day[1])
    let status = ""
    if (s) status = "stamped"
    else if (habits[hid].stamp_ids.length >= Number(habits[hid].frequency)) status = "fulfilled"
    setStampStatus(status)
  }, [habits[hid].stamp_ids])

  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    console.log("preStamp", habits[hid])
    const res = await fetch(stampPath, { method })
    const stamp = await res.json()
    if (method === "post") {
      dispatchStampDay(stamp)
      setStampStatus("stamped")
    } else if (method === "delete") {
      dispatchUnstampDay(stamp)
      setStampStatus("")
    }
  }


  return (
    <td className="stamp" style={{ color: habits[hid].color }}>
      <form method="POST" onSubmit={onStamp(method)}>
        <button className="stamp" type="submit" style={{ backgroundColor: "rgba(0,0,0,0)", borderWidth: 0 }}>
          <i className={`fas fa-${icon}`} style={{ color }} ></i>
        </button>
      </form>
    </td>
  )
}
