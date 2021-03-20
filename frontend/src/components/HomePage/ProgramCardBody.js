import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import ProgramBoardContext from '../../context/ProgramBoardContext'
import ActivityRow from './ActivityRow'

export default function ProgramCardBody({ program }) {
  const { activities } = useContext(ProgramBoardContext)
  const [aidOrder, setAidOrder] = useState(program.aids_order)

  useEffect(() => {
    setAidOrder(Array.from(program.aids).reverse())
  }, [Object.keys(activities).length])

  const handleOnDragEnd = (e) => {
    if (!e.destination) return;
    const items = [...aidOrder]
    const [reorderedItem] = items.splice(e.source.index, 1)
    items.splice(e.destination.index, 0, reorderedItem)
    setAidOrder(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="activity-rows">
        {(provided) => (
          <tbody
            className="activity-rows"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

            {aidOrder.length ? <>
              {aidOrder.map((aid, i) => (
                <Draggable key={aid} draggableId={String(aid)} index={i}>
                  {(provided) => (
                    <tr
                      className="activity-row"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ActivityRow activity={activities[aid]} program={program} />
                    </tr>
                  )}
                </Draggable>
              ))}
            </> : ""}

            {!aidOrder.length && <tr className="msg-none lo-center">This program card has no activities yet.</tr>}

            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  )
}