import React from "react";
import blankPic from "../images/blank-profile-pic.png"
import david from '../images/david-linkedin.jpg'
import brian from '../images/brian-linkedin.jpg'
import mira from '../images/mira-linkedin.jpg'

function AboutCard() {
  const renderLinks = (user) => {
    return (<>
      <div className=" about-card_a">
        <a className="th-metal about-card_icon" href={`mailto:${user.email}`}>
          <i className="fas fa-envelope fa-2x"></i>
        </a>
        <a className="th-metal about-card_icon" target='_blank' href={user.links[0]}>
          <i className="fab fa-github fa-2x"></i>
        </a>
        {user.links[1] ?
          <a className="th-metal about-card_icon" target='_blank' href={user.links[1]}>
            <i className="fab fa-linkedin-in fa-2x"></i>
          </a>
          :
          <i className="fab fa-linkedin-in fa-2x grey-icon"></i>
        }
      </div>
    </>)
  }

  const renderImage = (user) => {
    if (user.image) {
      return <img className="about-img lo-center" src={user.image} alt="profile portrait" />
    } else {
      return <img className="about-img lo-center" src={blankPic} alt="profile portrait" />
    }
  }
  let users = [
    {
      name: "Alicia Kim",
      email: "alicia.mira.kim@gmail.com",
      links: ["https://www.github.com/alimirakim", "https://www.linkedin.com/in/alicia-mira-kim-416a0a41"],
      image: mira,
    },
    {
      name: "Brian Wang",
      email: "brbwang@gmail.com",
      links: ["https://www.github.com/Awodfkai", "https://www.linkedin.com/in/brian-wang-902373163"],
      image: brian,
    },
    {
      name: "David Lee",
      email: "dyclee@umich.com",
      links: ["https://www.github.com/dyclee", "https://www.linkedin.com/in/daveyclee"],
      image: david,
    },
    {
      name: "Eric Lyda",
      email: "lydaeric@gmail.com",
      links: ["https://www.github.com/ELyda95"],
    },
  ];
  return (<main>
    <div className="AboutPage">
      <div className="AboutHeader th-cap-title th-metal">About Us</div>
      <div className="AboutContainer">
        {users.map(user => {
          return (
            <div key={user.name[0]} 
            className="th-border-thin th-border-gr th-border-metal th-dark-gr th-shadow AboutCardContainer" style={{ backgroundColor: "black", color: "black" }}>
              <div className="th-border th-border-gr th-border-metal">
                <div className="about-img-border">
                  <div className="AboutCardImageContainer">
                    {renderImage(user)}
                  </div>
                </div>
                <div className=" AboutCardDetailsContainer">
                  <h3 className="th-metal th-fancy-name">{user.name}</h3>
                  <div className="th-hr-gr-fade-right"/>
                  {renderLinks(user)}
                </div>
              </div>

            </div>
          )
        })
        }
      </div>
      <aside className="about-attrib th-shadow">
        <h2 className="th-cap-title">&nbsp;&nbsp;Attributions</h2>
        <ul>
          <li><a href='https://www.freepik.com/photos/background'>Background photo created by denamorado - www.freepik.com</a></li>
          <li><a href='https://www.freepik.com/vectors/background'>Background vector created by BiZkettE1 - www.freepik.com</a></li>
        </ul>
      </aside>

    </div>
  </main>)
}

export default AboutCard
