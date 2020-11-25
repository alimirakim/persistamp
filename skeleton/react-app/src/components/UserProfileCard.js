import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'
import '../styles/UserProfileCard.css'
function UserProfileCard() {
    const [user, setUser] = useState({});
    const userId = 2
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/`);
            const user = await response.json();
            console.log(user);
            setUser(user);
        })();
    }, [userId]);

    if (!user.username) {
        return null
    }

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
                    <a href="https://codepen.io/LIMESTA">
                        <img id="codepenio" src="https://blog.codepen.io/wp-content/uploads/2012/06/Button-Fill-Black-Small.png" target="_blank"></img>
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

export default UserProfileCard
