import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

import OptionsContext from '../../context/OptionsContext'
// import ActivityContext from '../../context/ActivityContext'
import UserContext from '../../context/UserContext'

// import ActivityEditForm from '../forms/ActivityEditForm'
// import ActivityDeleteForm from '../forms/ActivityDeleteForm'
import LineGraph from './LineGraph'
import CalendarMap from './CalendarMap';
import ActivityStatOverview from './ActivityStatOverview';
import PrivatePage from '../PrivatePage';
import NavCard from '../nav/NavCard'
import ProgramBoardContext from '../../context/ProgramBoardContext';
import ActivityTable from './ActivityTable'

export default function ActivityDisplay({ auth, setAuth, setUser, isPrivate, setIsPrivate }) {
  const history = useHistory()
  const { aid, mid } = useParams()
  const user = useContext(UserContext)
  const { activities, programs, dispatchSetAll, dispatchAddActivity, dispatchEditActivity } = useContext(ProgramBoardContext)
  const activity = activities[aid]
  const { colors, icons } = useContext(OptionsContext)

  useEffect(() => {
    if (!activity && programs) {
      (async () => {
        const res = await fetch(`/api/activities/${aid}/memberships/${mid}`)
        const fetchedActivity = await res.json()
        if (!fetchedActivity) {
          return history.push('/')
        } else if (fetchedActivity.pid) {
          dispatchAddActivity(fetchedActivity)
          setIsPrivate(fetchedActivity.private)
        }
      })()
    }
  }, [activity, programs, mid, aid, isPrivate])

  const handleToggle = async (e) => {
    if (!auth) return;
    const res = await fetch(`/api/activities/${aid}/memberships/${mid}/switchPrivacy`)
    const newActivity = await res.json();
    dispatchEditActivity(newActivity);
    setIsPrivate(newActivity.private);
  }

  if (!activity) return null
  if (activity.private && !auth) return <PrivatePage />
  const color = activity.cid === 3 ? "white" : colors[activity.cid].hex
  const title = {first: activity.username, last: `"${activity.title}"`}

  return (<>
    <NavCard
      auth={auth}
      setAuth={setAuth}
      setUser={setUser}
      activity={activity}
      title={title}
    />

    <main>

      <ActivityTable activity={activity} color={color} icon={icons[activity.iid].title} />
      {auth && <>
        <FormGroup className="hdp-toggle" row>
          <div style={{ width: "100vw" }} />
          <FormControlLabel
            control={
              <Switch
                checked={isPrivate}
                onChange={handleToggle}
                name="togglePrivacy"
                color="secondary"
              />
            }
            label="Private"
          />
        </FormGroup>
      </>}


      <article className="hdp-con" style={{ color }}>

        <div className="displayPage">
          <div className="displayFormat">
            <div className="activityFormat">

              {/* <div className="activityDetailContainer"> */}
              {/* <br/> */}
              {/* <div className="activityHeader"> */}
              {/* <h1 style={{ fontSize: "4rem" }} className={`cam activityDetail__title`}>
                      {console.log("inside", activity)}
                      <i className={`fas fa-${icons[activity.iid].title}`}></i>
                      &nbsp;{activity.title}
                    </h1> */}
              {/* </div> */}
              {/* </div> */}

              <ActivityStatOverview activity={activity} />
              <LineGraph color={color} />
            </div>
            <CalendarMap activity={activity} />
          </div>
        </div>
      </article>

    </main>

  </>)
}
