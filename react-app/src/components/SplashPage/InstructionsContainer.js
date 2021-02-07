import React from 'react';
import { InstructionBox } from './InstructionBox';

import instruction1 from '../../images/screenshots/sc1.png';
import instruction2 from '../../images/screenshots/sc5.png';
import instruction3 from '../../images/screenshots/sc4.png';
import instruction4 from '../../images/screenshots/sc3.png';


const instructions = [
  {
    number: 1,
    text: "Create your activity goals and categories.",
    image: instruction1,
  },
  {
    number: 2,
    text: "Track your progress and earn points.",
    image: instruction2,
  },
  {
    number: 3,
    text: "Create rewards. Redeem them with points!",
    image: instruction3,
  },
]

export default function InstructionsContainer() {
  return (<>

    {instructions.map((obj) => {
      return <InstructionBox key={obj.number} obj={obj} />
    })}
    <div className={`instruction-4-image`}>
      <img className="instruction-screenshot" src={instruction4} alt="instruction pic" />
    </div>
  </>)
}
