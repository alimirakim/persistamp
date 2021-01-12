import React from 'react';

export const InstructionBox = ({obj}) => {
    return (<>
        <div className={`instruction-${obj.number}-numarrow`}>
        </div>
        <div className={`instruction-${obj.number}-text`}>
        </div>
        <div className={`instruction-${obj.number}-image`}>
            <img className="instruction-screenshot" src={obj.image} alt="instruction pic" />
        </div>
    </>)
}
