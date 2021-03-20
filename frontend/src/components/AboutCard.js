import React from "react";
import NavCard from './nav/NavCard'
import david from '../images/profiles/david-linkedin.jpg'
import mira from '../images/profiles/mira-linkedin.jpg'

function AboutCard({ auth, setAuth }) {
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
          <i />
        }
      </div>
    </>)
  }

  const renderImage = (user) => {
    if (user.image) {
      return (
        <div className="about-img-border">
          <div className="AboutCardImageContainer">
            <img className="about-img lo-center" src={user.image} alt="profile portrait" />
          </div>
        </div>
      )
    } else {
      return  <div style={{height: "5rem", float: "right"}} />
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
      name: "David Lee",
      email: "dyclee@umich.edu",
      links: ["https://www.github.com/dyclee", "https://www.linkedin.com/in/daveyclee"],
      image: david,
    },
  ];
  return (<>
    <NavCard auth={auth} setAuth={setAuth} />

    <main>
      {/* <div className="AboutHeader th-cap-title th-metal">About Us</div> */}
      <div className="AboutContainer">
        {users.map(user => {
          return (
            <div key={user.name[0]}
              className="th-border-thin th-border-gr th-border-metal th-dark-gr th-shadow AboutCardContainer" style={{ backgroundColor: "black", color: "black" }}>
              <div className="th-border th-border-gr th-border-metal">
                {renderImage(user)}
                <div className=" AboutCardDetailsContainer">
                  <h3 className="th-metal th-fancy-name">{user.name}</h3>
                  <div className="th-hr-gr-fade-right" />
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
          <li><a href="https://www.github.com/Awodfkai">Brian Wang</a> and <a href="https://www.github.com/ELyda95">Eric Lyda</a> - development contributions during the project's initial phases.</li>
          <li><a href="https://thenounproject.com/term/sea-turtle/1781597/">Sea Turtle by Georgiana Ionescu from the Noun Project</a></li>
          <li><a href='https://www.freepik.com/photos/background'>Background photo created by denamorado - www.freepik.com</a></li>
          <li><a href='https://www.freepik.com/vectors/background'>Background vector created by BiZkettE1 - www.freepik.com</a></li>
        </ul>
      </aside>

    </main>
  </>)
}

export default AboutCard
