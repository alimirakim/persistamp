import React from "react";
import { logout } from "../../services/auth";
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };
  return <MeetingRoomIcon onClick={onLogout} />
};

export default LogoutButton;
