import React from "react";

function AboutCard(){
  let links = [("GitHub", "https://www.github.com/"), ("LinkedIn", "https://www.linkedin.com/")]
  return (
    <div>
      <h3>Name</h3>
      <p>email</p>
      {links.map((name, href) => {
        return <a href={href}>{name}</a>
      })}
    </div>
  )
}

export default AboutCard