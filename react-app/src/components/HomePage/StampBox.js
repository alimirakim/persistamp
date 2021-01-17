import React, { useState, useContext, useEffect } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import OptionsContext from '../../context/OptionsContext'


// TODO How to optimize the rerenders here????
// Create a user slice of state. In that slice, have user's memberships, habits,
// stamps, etc.. Have each habit have a dailystamp array in order of date.
// ehhh...

// alt 1 wrap each habit row in a habit context
// alt 3 have each stampbox have its island state what only fetches and such
// straight from the source

export default function StampBox({ day, mid, hid }) {
  const {colors, icons} = useContext(OptionsContext)
  const { dispatchStampDay, dispatchUnstampDay, stamps, habits, } = useContext(ProgramBoardContext)
  const [stampStatus, setStampStatus] = useState("")
  const [transform, setTransform] = useState("0")
  const method = stampStatus === "stamped" ? "delete" : "post"
  const icon = stampStatus === "stamped" ? icons[habits[hid].iid].title : stampStatus === "fulfilled" ? "check" : "times"
  const color = stampStatus === "stamped" ? colors[habits[hid].cid].hex : "rgb(255,255,255,0.2)"
  const stampId = habits ? habits[hid].sids.find(sid => stamps[sid].date === day[1]) : ""
  const stampPath = `/api/stamps/${habits[hid].id}/programs/${habits[hid].pid}/memberships/${mid}/days/${day[1]}`


  useEffect(() => {
    if (stampId) setTransform(Math.floor(Math.random() * Math.floor(360)))
  }, [])

  useEffect(() => {
    let status = ""
    if (stampId) {
      status = "stamped"
    } else if (habits[hid].sids.length >= Number(habits[hid].frequency)) {
      status = "fulfilled"
    }
    setStampStatus(status)
  }, [habits[hid].sids, icon])

  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    console.log("time", new Date())
    const res = await fetch(stampPath, { method })
    const stamp = await res.json()
    if (method === "post") {
      setTransform(Math.floor(Math.random() * Math.floor(360)))
      dispatchStampDay(stamp)
      setStampStatus("stamped")
    } else if (method === "delete") {
      setTransform("0")
      dispatchUnstampDay(stamp)
      setStampStatus("")
    }
  }

  return (
    <td style={{ color: colors[habits[hid].cid].hex, transform: `rotate(${transform}deg)`, transition: "none"}}>
      <form method="POST" onSubmit={onStamp(method)} className="stamp-spot" >
        <button className="stamp" type="submit">
          <i className={`lo-center fas fa-${icon}`} style={{ color }} ></i>
        </button>
      </form>
    </td>
  )
}
