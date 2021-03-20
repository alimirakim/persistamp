import React from 'react';

export const InstructionBox = ({ obj }) => {
  const numbers = [1, 2, 3]
  return (<>
    <div className={`instruction-${obj.number}-numarrow`}>
    </div>
    <div className={`spl-instruct instruction-${obj.number}-text`}>
      <div className="instructionContent">
        {/* <img className="numberIcons" src={obj.numberIcon} /> */}
        <div className={`splash-num num-${obj.number}`}>
          <span className="lo-center num">{obj.number}</span>
        </div>
        <div className='lo-center instructionText'>
          {obj.text}
        </div>
      </div>
    </div>
    <div className={`instruction-${obj.number}-image`}>
      <img className="instruction-screenshot" src={obj.image} alt="instruction pic" />
    </div>
  </>)
}
