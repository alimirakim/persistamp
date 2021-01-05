import React, { useContext } from "react";

import UserContext from '../../context/UserContext'
import HabitBoardContext from '../../context/HabitBoardContext'
import OptionsContext from '../../context/OptionsContext'
import { ProgramEditForm, ProgramDeleteForm } from '../forms/ProgramForm'
import ProgramRewardShopButton from "./ProgramRewardShopButton";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'


export default function ProgramCard({ program }) {
const { user } = useContext(UserContext)
const { habits} = useContext(HabitBoardContext)
const { colors, stamps } = useContext(OptionsContext)
  const [mid] = program.memberships.filter(m => Object.keys(user.memberships).includes(String(m)))

  return (
    <li key={program.id}>
      <table className="board" style={{ color: program.color.hex }}>
      
        <thead>
          <tr key={program.id} style={{ color: program.color.hex }}>
            <td colSpan={8}>
              <div className="program">
                <div style={{ display: "flex" }}>
                  <ProgramEditForm program={program} />
                  <ProgramDeleteForm program={program} />

                  <h3 className="program-title">
                    <i className={`fas fa-${program.stamp.stamp}`}></i> {program.program}
                  </h3>
                </div>
                <ProgramRewardShopButton mid={mid} points={user.memberships[mid].points} program={program} />
              </div>
              <blockquote>{program.description}</blockquote>

            </td>
          </tr>
          {/* TODO Where is dispatchHabits?  */}
          <CurrentWeekRow program={program} />
        </thead>

        <tbody>
          {/* style={{display: "flex", flexDirection: "column-reverse"}}> */}
          {program.habits.map(hid => (
            <HabitRow habit={habits[hid]} mid={mid} />
            ))
          }
        </tbody>
      </table>
    </li>
  )
}