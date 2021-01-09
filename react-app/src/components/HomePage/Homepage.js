import React from 'react'

// OUR COMPONENTS
import UserProfileCard from './UserProfileCard'
import ProgramForm from '../forms/ProgramForm'
import ProgramBoard from './ProgramBoard'

export default function Homepage() {

  return (<main>
    <div className="hbd">
      <h1>Persistamp</h1>
      <UserProfileCard />
      <h2 className="cam">Habit Board Programs</h2>
      <ProgramForm />
    </div>

    <ProgramBoard />
  </main>
  )
}