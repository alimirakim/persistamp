import React, { useState, useContext, useEffect } from "react";
import ProgramBoardContext from "../../context/ProgramBoardContext"
import OptionsContext from '../../context/OptionsContext'


// TODO How to optimize the rerenders here????

export default function StampBox({ day, mid, aid }) {
  const { colors, icons } = useContext(OptionsContext)
  const { dispatchStampDay, dispatchUnstampDay, stamps, activities, } = useContext(ProgramBoardContext)
  const [stampStatus, setStampStatus] = useState("")
  const [deg, setDeg] = useState("0")
  const method = stampStatus === "stamped" ? "delete" : "post"
  const icon = stampStatus === "stamped" ? icons[activities[aid].iid].title : stampStatus === "fulfilled" ? "check" : "times"
  const color = stampStatus === "stamped" ? colors[activities[aid].cid].hex : "rgb(255,255,255,0.2)"
  const stampId = activities ? activities[aid].sids.find(sid => stamps[sid].date === day[1]) : ""
  const stampPath = `/api/stamps/${activities[aid].id}/programs/${activities[aid].pid}/memberships/${mid}/days/${day[1]}`


  useEffect(() => {
    if (stampId) setDeg(Math.floor(Math.random() * Math.floor(360)))
  }, [])

  useEffect(() => {
    let status = ""
    if (stampId) {
      status = "stamped"
    } else if (activities[aid].sids.length >= Number(activities[aid].frequency)) {
      status = "fulfilled"
    }
    setStampStatus(status)
  }, [activities[aid].sids, icon])

  const onStamp = (method) => async (ev) => {
    ev.preventDefault()
    const res = await fetch(stampPath, { method })
    const stamp = await res.json()

    if (method === "post") {
      setDeg(Math.floor(Math.random() * Math.floor(360)))
      dispatchStampDay(stamp)
      setStampStatus("stamped")

    } else if (method === "delete") {
      setDeg("0")
      dispatchUnstampDay(stamp)
      setStampStatus("")
    }
  }

  return (
    <td>
      <button className="stamp-spot" type="submit" onClick={onStamp(method)}>
        <div className="lo-center">
          <i className={`fas fa-lg fa-${icon}`}
            style={{ color, transform: `rotate(${deg}deg)` }} />
        </div>
      </button>
    </td>
  )
}
