import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router-dom';
import OptionsContext from '../../context/OptionsContext'
import ProgramBoardContext from '../../context/ProgramBoardContext';
import UserContext from '../../context/UserContext'
import NavStamps from './NavStamps'

export default function NavCard({
  auth,
  setAuth,
  setUser,
  activity,
  program,
  title,
}) {
  const history = useHistory()
  const { aid, pid } = useParams()
  const { colors, icons } = useContext(OptionsContext)
  const { activities } = useContext(ProgramBoardContext)
  const user = useContext(UserContext)
  const birthday = user.birthday ? new Date(user.birthday).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"
  const path = history.location.pathname.split("/")
  // console.log("activities", activities)

  if (!user) return (
    <header
      className="th-border-thin th-border-gr th-border-metal idc th-dark-gr"
    >
      <div className="th-border th-border-metal th-border-gr">

        <div className="idc-title idc-line th-metal">
          <h1 className="idc-name">

            {title && <>
              <span className="idc-first">{title.first}</span>
              <div className="th-hr-gr-fade-left" />
              <span className="idc-last">{title.last}</span>
            </>}

            {history.location.pathname === "/about" && <>
              <span className="idc-first">About</span>
              <span className="idc-last">Us</span>
              <div className="th-hr-gr-fade-left" />
            </>}
          </h1>
        </div>
        <NavStamps
          auth={auth}
          setAuth={setAuth}
          setUser={setUser}
          activity={activity}
          program={program}
        />
      </div>
    </header>
  )

  else return (
    <header
      className="th-border-thin th-border-gr th-border-metal idc th-dark-gr"
      style={{ color: colors[user.cid].hex }}
    >
      <div className="th-border th-border-metal th-border-gr">
        <dl className="idc-data">

          {/* <dt hidden={true}>PROFILE IMAGE</dt> */}
          {/* <dd><i className={`avi fas fa-mystery`}</i></dd> */}

          <div className="idc-title idc-line th-metal">
            {/* <dt className="idc-label"><i className="fas fa-address-card"></i> NAME</dt> */}
            <h1 className="idc-name">

              {history.location.pathname === "/" && <>
                <span className="idc-first">{user.first_name}</span>
                <div className="th-hr-gr-fade-left" />
                <span className="idc-last">{user.last_name}</span>
              </>}

              {history.location.pathname === "/about" && <>
                <span className="idc-first">About</span>
                <span className="idc-last">Us</span>
                <div className="th-hr-gr-fade-left" />
              </>}

              {activity && <>
                <div className="idc-hh">Activity History</div>
                <div className="th-hr-gr-fade-left" />
                <span className="idc-activity idc-last">{activity.title}</span>
              </>}

              {program && <>
                <span className="idc-program idc-first">Membership</span>
                <div className="th-hr-gr-fade-left" />
                <div className="idc-rew idc-last">{program.title} Program</div>
              </>}

              {history.location.pathname === "/reward-shop" && <>
                <span className="idc-program idc-first">{user.username}'s </span>
                <div className="th-hr-gr-fade-left" />
                <div className="idc-rew idc-last">Reward Shop</div>
              </>}

              {/* <span class="th-metal-shade">&nbsp;</span> */}
            </h1>
          </div>

          {(history.location.pathname === "/" || history.location.pathname.includes('reward-shop')) &&
            <div className="idc-line th-metal-light idc-points">
              <dt className="idc-label"> 
                <i className={`fas fa-${icons[program ? program.iid : user.iid].title}`}></i> {program ? program.points : user.points}
              </dt>
            </div>
          }
          {/* {history.location.pathname === "/" &&
            <div className="idc-details">
              <div className="idc-line th-metal-light">
                <dt className="idc-label"> <i className="fas fa-heart"></i> NICKNAME</dt>
                <dd>{user.username}</dd>
              </div>
              <div className="idc-line th-metal-light">
                <dt className="idc-label"><i className="fas fa-birthday-cake"></i> D.O.B.</dt>
                <dd><i className={`fas fa-birthday`}></i>{birthday}</dd>
              </div>
              <div className="idc-line th-metal-light">
                <dt className="idc-label"> <i className="fas fa-envelope-square"></i> EMAIL</dt>
                <dd>{user.email}</dd>
              </div>
            </div>
          } */}
        </dl>
        <NavStamps
          auth={auth}
          setAuth={setAuth}
          setUser={setUser}
          activity={activity}
          program={program}
        />
      </div>
    </header>
  )
}