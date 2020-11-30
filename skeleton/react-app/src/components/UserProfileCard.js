import React, { useContext, useState } from 'react'
import { Avatar } from '@material-ui/core'
import '../styles/UserProfileCard.css'
import UserContext from '../context/UserContext'

export default function UserProfileCard() {
  const { user } = useContext(UserContext)

  if (!user.username) {
    return null
  }
  console.log("user profile card data", user)

  return (
    <div className="infocardContainer">
      <div id="main">
        <img src={`/icons/${user.stamp.stamp}.svg`}></img>
      </div>
      <div id="textbois">
        <h2>{user.username}</h2>
        <h4>{user.first_name} {user.last_name}</h4>
        <div>{user.email}</div>
        <div id="hotlinks">
          <a href="https://codepen.io/LIMESTA"><img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
          </a>
          <a href="https://codepen.io/LIMESTA">
            <img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
          </a>
          <a href="https://codepen.io/LIMESTA">
            <img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
          </a>
        </div>
      </div>
    </div>
  )
}
