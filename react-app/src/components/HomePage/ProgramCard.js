import React, { useContext } from "react";

import UserContext from '../../context/UserContext'
import HabitBoardContext from '../../context/HabitBoardContext'
import { ProgramEditForm, ProgramDeleteForm } from '../forms/ProgramForm'
import RewardShopButton from "./RewardShopButton";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'


export default function ProgramCard({ program }) {
  const { user } = useContext(UserContext)
  const { habits } = useContext(HabitBoardContext)
  const mid = String(program.membership_ids.find(m => user.membership_ids.includes(m)))
  return (
    <li key={program.id}>
    <i>TEST</i>
      <table className="board" style={{ color: program.color }}>

        <thead>
          <tr key={program.id} style={{ color: program.color }}>
            <td colSpan={8}>
              <div className="program">
                <div style={{ display: "flex" }}>
                  <ProgramEditForm program={program} />
                  <ProgramDeleteForm program={program} />

                  <h3 className="program-title">
                    <i className={`fas fa-${program.stamp}`}></i> {program.title}
                  </h3>
                </div>
                <RewardShopButton
                  mid={mid}
                  points={user.memberships[mid].points}
                  program={program}
                />
              </div>
              <blockquote>{program.description}</blockquote>

            </td>
          </tr>
          {/* TODO Where is dispatchHabits?  */}
          <CurrentWeekRow program={program} />
        </thead>

        <tbody>
          {/* style={{display: "flex", flexDirection: "column-reverse"}}> */}
          {program.habit_ids.map(hid => (
            <HabitRow
              membership={user.memberships[mid]}
              habit={habits[hid]}
            />
          ))
          }
        </tbody>
      </table>
    </li>
  )
}