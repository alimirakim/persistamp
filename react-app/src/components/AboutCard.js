import React from "react";
import blankPic from "../images/blank-profile-pic.png"
import david from '../images/david-linkedin.jpg'
import brian from '../images/brian-linkedin.jpg'
import mira from '../images/mira-linkedin.jpg'

function AboutCard() {
  const renderLinks = (links) => {
    // console.log("links should be rendering")
    // console.log(links)
    return links.map(link => {
      return <a className="about-card_a" target='_blank' key={links[1]} href={link[1]}>{link[0]}</a>
    })
  }
  const renderImage = (user) => {
    if (user.image) {
      return <img className="about-img"  src={user.image} alt="profile portrait" />
    } else {
      return <img src={blankPic} alt="profile portrait" />
    }
  }
  let users = [
    {
      name: "Alicia Kim",
      email: "alicia.mira.kim@gmail.com",
      links: [["GitHub", "https://www.github.com/alimirakim"], ["LinkedIn", "https://www.linkedin.com/in/alicia-mira-kim-416a0a41"]],
      image: mira,
    },
    {
      name: "Brian Wang",
      email: "brbwang@gmail.com",
      links: [["GitHub", "https://www.github.com/Awodfkai"], ["LinkedIn", "https://www.linkedin.com/in/brian-wang-902373163"]],
      image: brian,
    },
    {
      name: "David Lee",
      email: "dyclee@umich.com",
      links: [["GitHub", "https://www.github.com/dyclee"], ["LinkedIn", "https://www.linkedin.com/in/daveyclee"]],
      image: david,
    },
    {
      name: "Eric Lyda",
      email: "lydaeric@gmail.com",
      links: [["GitHub", "https://www.github.com/ELyda95"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
  ];
  return (
    <div className="AboutContainer">
      <h1>About Us</h1>
      {users.map(user => {
          return (
            <div key={user.name} className="AboutCardContainer" style={{ backgroundColor: "white", color: "black" }}>
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
