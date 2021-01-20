import React, { useState, useContext, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import ProgramBoardContext from '../../context/ProgramBoardContext'
import HabitRow from './HabitRow'

export default function ProgramCardBody({ program }) {
  const { habits } = useContext(ProgramBoardContext)
  const [hidOrder, setHidOrder] = useState(program.hids_order)

  useEffect(() => {
    setHidOrder(Array.from(program.hids).reverse())
  }, [Object.keys(habits).length])

  const handleOnDragEnd = (e) => {
    console.log("drag", e)
    if (!e.destination) return;
    const items = [...hidOrder]
    const [reorderedItem] = items.splice(e.source.index, 1)
    items.splice(e.destination.index, 0, reorderedItem)
    setHidOrder(items)
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="habit-rows">
        {(provided) => (
          <tbody
            className="habit-rows"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >

            {hidOrder.length && <>
              {hidOrder.map((hid, i) => (
                <Draggable key={hid} draggableId={String(hid)} index={i}>
                  {(provided) => (
                    <tr
                      className="habit-row"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <HabitRow habit={habits[hid]} program={program} />
                    </tr>
                  )}
                </Draggable>
              ))}
            </>}

            {!hidOrder.length && <tr className="msg-none lo-center">This program has no habits yet.</tr>}

            {provided.placeholder}
          </tbody>
        )}
      </Droppable>
    </DragDropContext>
  )
}