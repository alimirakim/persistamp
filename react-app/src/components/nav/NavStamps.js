import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import UserSettings from '../forms/UserSettings'
import ProgramForm from '../forms/ProgramForm'
import Message from './Message'
// import NavStampJoin from './NavStampJoin'
import NavStampHome from './NavStampHome'
import NavStampAbout from './NavStampAbout'
import NavStampLogout from './NavStampLogout'
import NavStampMessages from './NavStampMessages'
import NavStampProgram from './NavStampProgram'
import NavStampSettings from './NavStampSettings'
import NavStampHabit from './NavStampHabit'
import NavStampReward from './NavStampReward'
import NavStampGithub from './NavStampGithub'
import HabitEditForm from '../forms/HabitEditForm'
import HabitDeleteForm from '../forms/HabitDeleteForm'
import RewardForm from '../forms/RewardForm'


export default function NavStamps({
    setAuth,
    setUser,
    habit,
    program
  }) {
  const user = useContext(UserContext)
  const [openSettings, setOpenSettings] = useState(false)
  const [openCreateProgram, setOpenCreateProgram] = useState(false)
  const [openCreateReward, setOpenCreateReward] = useState(false)
  const [openEditHabit, setOpenEditHabit] = useState(false)
  const [openDeleteHabit, setOpenDeleteHabit] = useState(false)
  const [openMessage, setOpenMessage] = useState(false)
  const path = useHistory().location.pathname

  const toggleEditHabit = (e) => setOpenEditHabit(!openEditHabit)
  const toggleDeleteHabit = (e) => setOpenDeleteHabit(!openDeleteHabit)
  const toggleCreateReward = (e) => setOpenCreateReward(!openCreateReward)
  const toggleMessage = (e) => setOpenMessage(!openMessage)
  const toggleCreateProgram = (e) => setOpenCreateProgram(!openCreateProgram)
  const toggleSettings = (e) => setOpenSettings(!openSettings)

  // if (!auth || !user) return null
  
  return (<>
    {habit && <>
      <HabitEditForm
        open={openEditHabit}
        handleClose={toggleEditHabit}
        habit={habit}
        handleOpenDelete={toggleDeleteHabit}
      />
      <HabitDeleteForm
        open={openDeleteHabit}
        handleClose={toggleDeleteHabit}
        habit={habit}
      />
    </>}

    {program && <RewardForm
      open={openCreateReward}
      handleClose={toggleCreateReward}
      cid={program.cid}
      iid={program.iid}
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

    <Message
      open={openMessage}
      handleClose={toggleMessage}
    />

    <nav className="stamps">

      {path === "/" && user && <NavStampProgram toggleCreate={toggleCreateProgram} />}
      {habit && user && <NavStampHabit toggleEdit={toggleEditHabit} />}
      {program && <NavStampReward toggleCreate={toggleCreateReward} />}
      {(path == "/about" || !user) && <NavStampGithub />}
      <NavStampMessages toggleMessage={toggleMessage} />
      {path !== "/" && <NavStampHome />}
      {path == "/" && user && <NavStampSettings toggleSettings={toggleSettings} />}
      <NavStampAbout />
      {user && <NavStampLogout setAuth={setAuth} />}
      {/* {!user && <NavStampJoin setAuth={setAuth} />} */}

    </nav>


  </>)
}
