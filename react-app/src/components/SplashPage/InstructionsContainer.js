import React from 'react';
import {InstructionBox} from './InstructionBox';

import instruction1 from '../../images/persistamp-instruction1.PNG';
import instruction2 from '../../images/persistamp-instruction2.PNG';
import instruction3 from '../../images/persistamp-instruction3.PNG';
import instruction4 from '../../images/persistamp-instruction4.PNG';

import numberOne from '../../images/number1.png';
import numberTwo from '../../images/number2.png';
import numberThree from '../../images/number3.png';

const instructions = [
    {
        number: 1,
        text: "Customize your own programs and habits.",
        image: instruction1,
        numberIcon: numberOne,
    },
    {
        number: 2,
        text: "Follow your progress and earn points.",
        image: instruction2,
        numberIcon: numberTwo,
    },
    {
        number: 3,
        text: "Buy rewards at your custom shop.",
        image: instruction3,
        numberIcon: numberThree,
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
