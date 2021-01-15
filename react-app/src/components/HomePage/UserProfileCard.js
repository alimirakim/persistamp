import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom';
import OptionsContext from '../../context/OptionsContext'
import UserContext from '../../context/UserContext'
import NavStamps from '../NavStamps'

export default function UserProfileCard({ auth, setAuth, setUser }) {
  const history = useHistory();
  const {colors, icons} = useContext(OptionsContext)
  const user = useContext(UserContext)
  const birthday = user.birthday ? new Date(user.birthday).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"

  if (!user) return null
  return (
    <article className="th-border-thin th-border-gr th-border-metal idc th-dark-gr" style={{ color: colors[user.cid].hex }}>
      <div className="th-border th-border-metal th-border-gr">
        <dl className="idc-data">

          {/* <dt hidden={true}>PROFILE IMAGE</dt> */}
          {/* <dd><i className={`avi fas fa-mystery`}</i></dd> */}

          <div className="idc-title idc-line th-metal">
            {/* <dt className="idc-label"><i className="fas fa-address-card"></i> NAME</dt> */}
            <dd className="idc-name">
            
              {history.location.pathname === "/" && <>
              <span className="idc-first">{user.first_name}</span> <span className="idc-last">{user.last_name}</span>
              </>}
              
              {history.location.pathname === "/about" && <>
              <span className="idc-first">About</span> <span className="idc-last">Us</span>
              </>}
              
              {history.location.pathname === "/graphs/:hid/memberships/:mid" && <>
              <span className="idc-first">{user.username}'s</span> <span className="idc-last">History</span>
              </>}
              
              {history.location.pathname === "/programs/:pid/memberships/:mid/rewards" && <>
              <span className="idc-first">'s</span> <span className="idc-last">Reward Shop</span>
              </>}
              
              {/* <span class="th-metal-shade">&nbsp;</span> */}
            </dd>
            <div className="th-hr-gr-fade-left" />
          </div>

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
        <NavStamps auth={auth} setAuth={setAuth} setUser={setUser} />
      </div>
    </article>
  )
}