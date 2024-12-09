import React from 'react';
import GameOptionCard from './GameOptionCard';

export default function GameOptions(props) {

  // category options:
  // WIN, --> überspringen Option
  // LOSE, --> überspringen Option
  // EXTRA, --> z.B. Autokauf, Urlaub, 
  // MAIN --> zurück zu Optionsauswahl
  

  return (
    <div>
      <h1>Wähle eine Option aus den folgenden</h1>
      {props.options.map((option, index)=>{
        return(
          <GameOptionCard key={index} option={option} options={props.options} setOptions={props.setOptions} money={props.money} setChosenOption={props.setChosenOption} setPhaseOfPhase={props.setPhaseOfPhase}/>
        )
      })}

      {props.isSkipable &&
        <div >
        <h2>Überspringen</h2>
        <button
          onClick={()=> props.setPhaseOfPhase(1)}
        >
         Auswählen
        </button>
    </div>
      }
      
    </div>
  )
};
