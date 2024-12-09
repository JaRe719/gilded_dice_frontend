import React from 'react';

export default function GamePhaseIntro(props) {
  return (
    <div onClick={()=> props.setPhaseOfPhase(2)}>
      <p>{props.intro}</p>
    </div>
  )
}
