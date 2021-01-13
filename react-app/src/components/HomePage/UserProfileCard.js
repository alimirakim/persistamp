import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'
import NavStamps from '../NavStamps'

export default function UserProfileCard({ auth, setAuth, setUser }) {
  const user = useContext(UserContext)
  const birthday = user.birthday ? new Date(user.birthday).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"

  if (!user) return null
  return (
    <article className="th-border-thin th-border-gr th-border-metal idc th-dark-gr" style={{ color: user.color }}>
      <div className="th-border th-border-metal th-border-gr">
        <dl className="idc-data">

          <dt hidden={true}>PROFILE IMAGE</dt>
          {/* <dd><i className={`avi fas fa-${user.icon}`} style={{ backgroundColor: user.color }}></i></dd> */}

          <div className="idc-title idc-line th-metal">
            {/* <dt className="idc-label"><i className="fas fa-address-card"></i> NAME</dt> */}
            <dd className="idc-name">
              <span className="idc-first">{user.first_name}</span> <span className="idc-last">{user.last_name}</span>
              {/* <span class="th-metal-shade">&nbsp;</span> */}
            </dd>
            <div className="th-hr-gr-fade-left"/>
          </div>
          
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
        </dl>
        <NavStamps auth={auth} setAuth={setAuth} setUser={setUser} />
      </div>
    </article>
  )
}