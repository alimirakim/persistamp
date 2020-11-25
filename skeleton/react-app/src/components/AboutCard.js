import React from "react";
import blankPic from "../images/blank-profile-pic.png"

function AboutCard(){
  const renderLinks = (links) => {
    console.log("links should be rendering")
    console.log(links)
    return links.map(link => {
      return <a className="about-card_a" key={links[1]} href={link[1]}>{link[0]}</a>
    })
  }
  const renderImage = (user) => {
    if (user.image) {
      return <img src={user.image} alt="profile picture"/>
    }else{
      return <img src={blankPic} alt="profile picture" />
    }
  }
  let users = [
    {
      name: "Alicia Kim",
      email: "otheremail@gmail.com",
      links: [["GitHub", "https://www.github.com/alimirakim"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
    {
      name: "Brian Wang",
      email: "brbwang@gmail.com",
      links: [["GitHub", "https://www.github.com/Awodfkai"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
    {
      name: "David Lee",
      email: "email@gmail.com",
      links: [["GitHub", "https://www.github.com/dyclee"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
    {
      name: "Eric Lyda",
      email: "email3@gmail.com",
      links: [["GitHub", "https://www.github.com/ELyda95"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
  ];
  return (
    <div className="AboutContainer">
      {
        users.map(user => {
          return (
            <div key={user.name} className="AboutCardContainer">
              <div className="AboutCardDetailsContainer">
                <h3>{user.name}</h3>
                <p>{user.email}</p>
                {renderLinks(user.links)}
              </div>
              <div className="AboutCardImageContainer">
                {renderImage(user)}
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default AboutCard