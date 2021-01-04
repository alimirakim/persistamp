import React, { useContext, useState } from 'react'
import { Avatar } from '@material-ui/core'
import '../styles/UserProfileCard.css'
import UserContext from '../context/UserContext'
import UserSettings from './UserSettings'

export default function UserProfileCard() {
  const { user } = useContext(UserContext)

  if (!user) {
    return null
  }
  console.log("user profile card data", user)
  console.log("user color mode", user.color.mode)
  // if (user.color.mode === "dark") {
  return (
    <>
    <article className="card-dark" style={{ color: user.color.hex, boxShadow: `8px 8px 0 ${user.color.hex}` }}>

      <dl className="card-data">
        <dt className="card-name-label"><i className="fas fa-address-card"></i> NAME</dt>
        <dd className="card-name">    {user.first_name} {user.last_name}</dd>
        <div className="card-body">
        <div className="card-data">
          <dt hidden="true">PROFILE IMAGE</dt>
          <dd><i className={`avi fas fa-${user.stamp.stamp}`}></i></dd>
          </div>
          <div className="side-card card-data">
            <dt> <i className="fas fa-heart"></i> NICKNAME</dt>
            <dd>{user.username}</dd>
            <dt><i className="fas fa-birthday-cake"></i> D.O.B.</dt>
            <dd><i className={`fas fa-birthday`}></i> {new Date(user.birthday).toLocaleString('en-EN', {year: 'numeric', month: 'long', day: 'numeric'})}</dd>
            <dt> <i className="fas fa-envelope-square"></i> EMAIL</dt>
            <dd>{user.email}</dd>
          </div>
        </div>
      </dl>
    </article>
    </>
    )

  // }
  return (
    <>
    <article className="card" style={{ color: user.color.hex, boxShadow: `8px 8px 0 ${user.color.hex}` }}>

      <dl className="card-data">
        <dt className="card-name-label"><i className="fas fa-address-card"></i> NAME</dt>
        <dd className="card-name">    {user.first_name} {user.last_name}</dd>
        <div className="card-body">
        <div className="card-data">
          <dt hidden="true">PROFILE IMAGE</dt>
          <dd><i className={`avi fas fa-${user.stamp.stamp}`}></i></dd>
          </div>
          <div className="side-card card-data">
            <dt> <i className="fas fa-heart"></i> NICKNAME</dt>
            <dd>{user.username}</dd>
            <dt><i className="fas fa-birthday-cake"></i> D.O.B.</dt>
            <dd><i className={`fas fa-birthday`}></i> {new Date(user.birthday).toLocaleString('en-EN', {year: 'numeric', month: 'long', day: 'numeric'})}</dd>
            <dt> <i className="fas fa-envelope-square"></i> EMAIL</dt>
            <dd>{user.email}</dd>
          </div>
        </div>
      </dl>
    </article>
    </>
  )
}
