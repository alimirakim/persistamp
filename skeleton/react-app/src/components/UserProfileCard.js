import React, { useContext, useState } from 'react'
import { Avatar } from '@material-ui/core'
import '../styles/UserProfileCard.css'
import UserContext from '../context/UserContext'
import UserSettings from './UserSettings'

export default function UserProfileCard() {
  const { user } = useContext(UserContext)

  if (!user.username) {
    return null
  }
  console.log("user profile card data", user)

  return (
    <article className="card" style={{ color: user.color.hex, boxShadow: `8px 8px 0 ${user.color.hex}` }}>

      <dl className="card-data">
        <dt className="card-name-label">NAME</dt>
        <dd className="card-name">    {user.first_name} {user.last_name}</dd>
        <div className="card-body">
        <div className="card-data">
          <dt hidden="true">PROFILE IMAGE</dt>
          <dd><i className={`avi fas fa-${user.stamp.stamp}`}></i></dd>
          </div>
          <div className="side-card card-data">
            <dt>NICKNAME</dt>
            <dd>{user.username}</dd>
            <dt>D.O.B.</dt>
            <dd><i className={`fas fa-birthday`}></i>{new Date(user.birthday).toLocaleString()}</dd>
            <dt>EMAIL</dt>
            <dd>{user.email}</dd>
          </div>
        </div>
      </dl>
    </article>
  )
}
