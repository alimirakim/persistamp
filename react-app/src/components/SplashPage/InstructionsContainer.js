import React from 'react';
import {InstructionBox} from './InstructionBox';

import instruction1 from '../../images/sc1.PNG';
import instruction2 from '../../images/sc5.PNG';
import instruction3 from '../../images/sc4.PNG';
import instruction4 from '../../images/sc3.PNG';


const instructions = [
    {
        number: 1,
        text: "Create your habit goals and categories.",
        image: instruction1,
    },
    {
        number: 2,
        text: "Stamp your progress and earn points.",
        image: instruction2,
    },
    {
        number: 3,
        text: "Create rewards for your Shop to redeem them with points!",
        image: instruction3,
    },
]

export default function InstructionsContainer () {
    return (<>
            {instructions.map((obj) => {
                return (<>
                    <InstructionBox  obj={obj} />
                </>)
            })}
            <div className={`instruction-4-image`}>
                <img className="instruction-screenshot" src={instruction4} alt="instruction pic" />
            </div>
    </>)
}
