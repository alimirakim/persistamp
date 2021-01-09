import React, { useContext } from "react";

import ProgramBoardContext from '../../context/ProgramBoardContext'
import { ProgramEditForm, ProgramDeleteForm } from '../forms/ProgramForm'
import RewardShopButton from "./RewardShopButton";
import CurrentWeekRow from "./CurrentWeekRow";
import HabitRow from './HabitRow'


export default function ProgramCard({ program }) {
  const { habits } = useContext(ProgramBoardContext)
  return (
    <li key={program.id}>
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
              key={hid}
              habit={habits[hid]}
              program={program}
            />
          ))
          }
        </tbody>
      </table>
    </li>
  )
}