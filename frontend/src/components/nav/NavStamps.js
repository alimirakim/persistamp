import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import UserSettings from '../forms/UserSettings'
import ProgramForm from '../forms/ProgramForm'
// import NavStampJoin from './NavStampJoin'
import NavStampHome from './NavStampHome'
import NavStampAbout from './NavStampAbout'
import NavStampLogout from './NavStampLogout'
import NavStampRewardShop from './NavStampRewardShop'
import NavStampProgram from './NavStampProgram'
import NavStampSettings from './NavStampSettings'
import NavStampActivity from './NavStampActivity'
import NavStampReward from './NavStampReward'
import NavStampGithub from './NavStampGithub'
import ActivityEditForm from '../forms/ActivityEditForm'
import ActivityDeleteForm from '../forms/ActivityDeleteForm'
import RewardForm from '../forms/RewardForm'


export default function NavStamps({
    setAuth,
    setUser,
    activity,
    program
  }) {
  const user = useContext(UserContext)
  const [openSettings, setOpenSettings] = useState(false)
  const [openCreateProgram, setOpenCreateProgram] = useState(false)
  const [openCreateReward, setOpenCreateReward] = useState(false)
  const [openEditActivity, setOpenEditActivity] = useState(false)
  const [openDeleteActivity, setOpenDeleteActivity] = useState(false)
  const path = useHistory().location.pathname

  const toggleEditActivity = (e) => setOpenEditActivity(!openEditActivity)
  const toggleDeleteActivity = (e) => setOpenDeleteActivity(!openDeleteActivity)
  const toggleCreateReward = (e) => setOpenCreateReward(!openCreateReward)
  const toggleCreateProgram = (e) => setOpenCreateProgram(!openCreateProgram)
  const toggleSettings = (e) => setOpenSettings(!openSettings)

  // if (!auth || !user) return null
  
  return (<>
    {activity && <>
      <ActivityEditForm
        open={openEditActivity}
        handleClose={toggleEditActivity}
        activity={activity}
        handleOpenDelete={toggleDeleteActivity}
      />
      <ActivityDeleteForm
        open={openDeleteActivity}
        handleClose={toggleDeleteActivity}
        activity={activity}
      />
    </>}

    {path.includes("reward") && <RewardForm
      open={openCreateReward}
      handleClose={toggleCreateReward}
      cid={program ? program.cid : user.cid}
      iid={program ? program.iid : user.iid}
    />}

    {user &&
    <UserSettings
      open={openSettings}
      handleClose={toggleSettings}
      user={user}
      setUser={setUser}
    />}

    {user && 
    <ProgramForm
      open={openCreateProgram}
      handleClose={toggleCreateProgram}
    />}

    <nav className="stamps">

      <NavStampHome />
      {(path == "/about" || !user) && <NavStampGithub />}
      <NavStampRewardShop />
      {path === "/" && user && <NavStampProgram toggleCreate={toggleCreateProgram} />}
      {activity && user && <NavStampActivity toggleEdit={toggleEditActivity} />}
      {path.includes("reward") && <NavStampReward toggleCreate={toggleCreateReward} />}
      {path == "/" && user && <NavStampSettings toggleSettings={toggleSettings} />}
      <NavStampAbout />
      {user && <NavStampLogout setAuth={setAuth} />}
      {/* {!user && <NavStampJoin setAuth={setAuth} />} */}

    </nav>


  </>)
}
