import React from 'react';

let users = [
    {
        name: "Alicia Kim",
        email: "alicia.mira.kim@gmail.com",
        links: ["https://www.github.com/alimirakim", "https://www.linkedin.com/in/alicia-mira-kim-416a0a41"],
        shortname : "mira",
    },
    {
        name: "Brian Wang",
        email: "brbwang@gmail.com",
        links: ["https://www.github.com/Awodfkai", "https://www.linkedin.com/in/brian-wang-902373163"],
        shortname : "brian",
        //   image: brian,
    },
    {
        name: "David Lee",
        email: "dyclee@umich.com",
        links: ["https://www.github.com/dyclee", "https://www.linkedin.com/in/daveyclee"],
        shortname : "david",
        //   image: david,
    },
    {
        name: "Eric Lyda",
        email: "lydaeric@gmail.com",
        links: ["https://www.github.com/ELyda95"],
        shortname : "eric",
    },
];

const renderUser = (user) => {
    return (
        <div key={user.shortname} className="about-card_footer">
            <div className={`footer-user_name footer-${user.shortname}`}>{user.name}</div>
            <div className="footer-links">
                <a className="about-card_icon" href={`mailto:${user.email}`}>
                    <i className="fas fa-envelope fa-1x"></i>
                </a>
                <a className="about-card_icon" target='_blank' href={user.links[0]}>
                    <i className="fab fa-github fa-1x"></i>
                </a>
                {user.links[1] ?
                    <a className="about-card_icon" target='_blank' href={user.links[1]}>
                    <i className="fab fa-linkedin-in fa-1x"></i>
                    </a>
                    :
                    <a className="about-card_icon" >
                    <i className="fab fa-linkedin-in fa-1x grey-icon"></i>
                    </a>
                }
            </div>
        </div>
    )
}

export default function Footer ({auth}) {
    if (!auth) {
        return null;
    }
    return <>
        <div className="footer">
            <div className="footer-container">
                <div className="footer-header">
                    Developed by:
                </div>
                <div className="footer-users">
                    {users.map((user) => {
                        return renderUser(user)
                    })}
                </div>
            </div>
        </div>
    </>
}
