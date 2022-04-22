import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export default function User() {
  const [user, setUser] = useState({});
  const { uid }  = useParams();

  useEffect(() => {
    if (!uid) return
    (async () => {
      const response = await fetch(`/api/users/${uid}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [uid]);

  if (!user) return null;

  return (
    <ul>
      <li>
        <strong>User Id</strong> {uid}
      </li>
      <li>
        <strong>Username</strong> {user.username}
      </li>
      <li>
        <strong>Email</strong> {user.email}
      </li>
    </ul>
  );
}
