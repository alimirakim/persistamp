import React from 'react';
import {InstructionBox} from './InstructionBox';

import instruction1 from '../../images/persistamp-instruction1.PNG';

const instructions = [
    {
        number: 1,
        text: "Create a program and habits you want to track.",
        image: instruction1
    },
    {
        number: 2
    },
    {
        number: 3
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
