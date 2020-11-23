import React, { useEffect, useState } from 'react'


function UserProfileCard() {
    const [user, setUser] = useState({});
    const userId = 12
    useEffect(() => {
        (async () => {
            const response = await fetch(`/api/users/${userId}`);
            const user = await response.json();
            console.log(user);
            setUser(user);
        })();
    }, [userId]);

    console.log(user)
    if (!user.username) {
        return null
    }


    return (
        <div className="user-profile-card">
            <p>{user.username}</p>
            <p>{user.first_name}</p>
            <p>{user.last_name}</p>
            <p>{user.email}</p>
            <p>{user.birthday}</p>
            <p>{ user.stamp.stamp}</p>
        </div>
    )
}

export default UserProfileCard
