import React, { useContext } from 'react'
import UserContext from '../../context/UserContext'


export default function UserProfileCard() {
  const user = useContext(UserContext)
  const birthday = user.birthday ? new Date(user.birthday).toLocaleString('en-EN', { year: 'numeric', month: 'long', day: 'numeric' }) : "N/A"
  
  if (!user) return null

  return (
    <article className="card th-dark-gr" style={{ color: user.color, boxShadow: `8px 8px 0 ${user.color}` }}>

      <dl className="card-data">
        <dt className="card-name-label"><i className="fas fa-address-card"></i> NAME</dt>
        <dd className="card-name">    {user.first_name} {user.last_name}</dd>
        <div className="card-body">
          <div className="card-data">
            <dt hidden={true}>PROFILE IMAGE</dt>
            <dd><i className={`avi fas fa-${user.icon}`}></i></dd>
          </div>
          <div className="side-card card-data">
            <dt> <i className="fas fa-heart"></i> NICKNAME</dt>
            <dd>{user.username}</dd>
            <dt><i className="fas fa-birthday-cake"></i> D.O.B.</dt>
            <dd><i className={`fas fa-birthday`}></i>{birthday}</dd>
            <dt> <i className="fas fa-envelope-square"></i> EMAIL</dt>
            <dd>{user.email}</dd>
          </div>
        </div>
      </dl>
    </article>
  )
}