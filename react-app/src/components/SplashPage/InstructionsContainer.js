import React from 'react';
import {InstructionBox} from './InstructionBox';

import instruction1 from '../../images/persistamp-instruction1.PNG';
import instruction2 from '../../images/persistamp-instruction2.PNG';
// import instruction3 from '../../images/persistamp-instruction3-resize.PNG';
const instructions = [
    {
        number: 1,
        text: "Create programs and habits that you want to commit to.",
        image: instruction1
    },
    {
        number: 2,
        text: "Customize and keep track of each habit.",
        image: instruction2
    },
    {
        number: 3,
        text: "Follow how you're doing and reward yourself.",
        // image: instruction3
    },
]

export default function InstructionsContainer () {
    return (<>
        {/* <div className="instructionscontainer"> */}
            {instructions.map((obj) => {
                return (<>
                    <InstructionBox  obj={obj} />
                </>)
            })}
        {/* </div> */}
    </>)
}
