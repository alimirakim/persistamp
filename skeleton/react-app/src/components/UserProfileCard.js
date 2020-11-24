import React, { useEffect, useState } from 'react'
import { Avatar } from '@material-ui/core'


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
        <div className="user-profile-card">
            <Avatar src={`/icons/${user.stamp.stamp}.svg`} />
            <div className="user-details">
                <div>{user.username}</div>
                <div>{user.first_name} {user.last_name}</div>
                <div>{user.email}</div>
                <div>{user.birthday}</div>
            </div>
        </div>
    )
}

export default UserProfileCard
