// import React, { useState, useContext, useEffect } from "react";
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
// import ProgramBoardContext from "../../context/ProgramBoardContext"
// import ProgramCard from './ProgramCard'


// export default function ProgramBoard() {
//   const { programs } = useContext(ProgramBoardContext)
//   const [con, setCon] = useState("")
//   const [pidOrder, setPidOrder] = useState([])

//   useEffect(() => {
//     if (Object.keys(programs).length === 0) setCon("pbc-con-none")
//     else if (Object.keys(programs).length < 3) setCon("")
//     else setCon("programBoards-container")
//     setPidOrder(Array.from(Object.keys(programs).reverse()))
//   }, [Object.keys(programs).length])

//   const handleOnDragEnd = (e) => {
//     if (!e.destination) return;
//     const items = [...pidOrder]
//     const [reorderedItem] = items.splice(e.source.index, 1)
//     items.splice(e.destination.index, 0, reorderedItem)
//     setPidOrder(items)
//   }

//   return (
//     <main style={{ marginTop: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>

//       {con === "pbc-con-none" &&
//         <article className="msg-none lo-center th-txt-shadow">You have no programs yet. Click the 'Add' stamp icon in the top-left to start a new one.</article>
//       }

//       <DragDropContext onDragEnd={handleOnDragEnd}>
//         <Droppable droppableId="program-cards">
//           {(provided) => (
//             <ul id="program-cards" className={`${con} program-cards`} {...provided.droppableProps} ref={provided.innerRef}>
//               {pidOrder.map((pid, i) => (
//                 <Draggable key={pid} draggableId={String(pid)} index={i}>
//                   {(provided) => (
//                     <li
//                       className="th-card-shadow"
//                       ref={provided.innerRef}
//                       {...provided.draggableProps}
//                       {...provided.dragHandleProps}
//                     >
//                       <ProgramCard program={programs[pid]} />
//                     </li>
//                   )}
//                 </Draggable>
//               ))}
//               {provided.placeholder}
//             </ul>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </main>
//   )
// }
