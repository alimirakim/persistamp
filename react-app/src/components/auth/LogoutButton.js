import React from "react";
import { logout } from "../../services/auth";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const LogoutButton = ({setAuth}) => {
  const onLogout = async (e) => {
    await logout();
    setAuth(false);
  };
  return <MeetingRoomIcon onClick={onLogout} />
};

export default LogoutButton;
