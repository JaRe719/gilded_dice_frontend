import React from 'react';
import "./GamePhaseIntro.css";

export default function GamePhaseIntro(props) {
  return (
    <div className='gamePhaseIntro' onClick={()=> props.setPhaseOfPhase(2)}>
      <p>{props.intro}</p>
    </div>
  )
}
