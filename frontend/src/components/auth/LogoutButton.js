import React from "react";
import { logout } from "../../services/auth";


export default function LogoutButton({setAuth}) {
  const onLogout = async (e) => {
    await logout();
    setAuth(false);
  };
  return <MeetingRoomIcon onClick={onLogout} />
};