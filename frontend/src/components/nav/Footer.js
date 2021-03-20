import React from 'react';

let users = [
  {
    name: "Alicia Kim",
    email: "alicia.mira.kim@gmail.com",
    links: ["https://www.github.com/alimirakim", "https://www.linkedin.com/in/alicia-mira-kim-416a0a41"],
    shortname: "mira",
  },
  {
    name: "David Lee",
    email: "dyclee@umich.com",
    links: ["https://www.github.com/dyclee", "https://www.linkedin.com/in/daveyclee"],
    shortname: "david",
    //   image: david,
  },
  // {
  //   name: "Brian Wang",
  //   email: "brbwang@gmail.com",
  //   links: ["https://www.github.com/Awodfkai", "https://www.linkedin.com/in/brian-wang-902373163"],
  //   shortname: "brian",
  //   //   image: brian,
  // },
  // {
  //   name: "Eric Lyda",
  //   email: "lydaeric@gmail.com",
  //   links: ["https://www.github.com/ELyda95"],
  //   shortname: "eric",
  // },
];

const renderUser = (user) => {
  return (
    <div key={user.shortname} className="footer-user">
      <div className={`th-clean-name footer-user_name footer-${user.shortname}`}>{user.name}</div>
      <div className="footer-links">
        <a className="footer_icon" href={`mailto:${user.email}`}>
          <i className="fas fa-xs fa-envelope "></i>
        </a>
        <a className="footer_icon" target='_blank' href={user.links[0]}>
          <i className="fab fa-xs fa-github "></i>
        </a>
        {user.links[1] ?
          <a className="footer_icon" target='_blank' href={user.links[1]}>
            <i className="fab fa-xs fa-linkedin-in"></i>
          </a>
          :
          <a className="footer_icon" >
            <i className="fab fa-xs fa-linkedin-in grey-icon"></i>
          </a>
        }
      </div>
    </div>
  )
}

export default function Footer() {

  return <footer className="footer">
    <div className="footer-container">
      <div className="th-cap-title footer-header">
        Developed by
                </div>
      <div className="footer-users">
        {users.map((user) => {
          return renderUser(user)
        })}
      </div>
    </div>
  </footer>
}
