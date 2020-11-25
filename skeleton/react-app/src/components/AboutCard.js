import React from "react";

function AboutCard(){
  let links = [["GitHub", "https://www.github.com/"], ["LinkedIn", "https://www.linkedin.com/"]]
  return (
    <div className="AboutCardContainer">
      <h3>Name</h3>
      <p>email</p>
      {links.map(link => {
        return <a href={link[1]}>{link[0]}</a>
      })}
    </div>
  )
}

export default AboutCard