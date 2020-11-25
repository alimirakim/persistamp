import React from "react";

function AboutCard(){
  const renderLinks = (links) => {
    console.log("links should be rendering")
    console.log(links)
    links.map(link => {
      return <a key={links[1]} href={link[1]}>{link[0]}</a>
    })
  }
  let users = [
    {
      name: "Brian",
      email: "brbwang@gmail.com",
      links: [["GitHub", "https://www.github.com/Awodfkai"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
    {
      name: "Alicia",
      email: "otheremail@gmail.com",
      links: [["GitHub", "https://www.github.com/"], ["LinkedIn", "https://www.linkedin.com/"]],
    },
  ]
  return (
    <>
      {
        users.map(user => {
          return (
            <div key={user.name} className="AboutCardContainer">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
              <div>
                {renderLinks(user.links)}
              </div>
            </div>
          )
        })
      }
    </>
  )
}

export default AboutCard