import React from 'react';
import "./GameOptions.css";
import GameOptionCard from './GameOptionCard';

export default function GameOptions(props) {
  console.log(props.isReturning)
  console.log(props.options)
  console.log(props.isSkipable)

  // category options:
  // WIN, --> überspringen Option
  // LOSE, --> überspringen Option
  // EXTRA, --> z.B. Autokauf, Urlaub, 
  // MAIN --> zurück zu Optionsauswahl
  

  return (
    <div className='gameOption'>
      <h1>Wähle eine Option aus den folgenden</h1>
      {props.options.map((option, index)=>{
        return(
          <GameOptionCard key={index} driverLicense={props.driverLicense} option={option} options={props.options} setOptions={props.setOptions} money={props.money} setChosenOption={props.setChosenOption} setPhaseOfPhase={props.setPhaseOfPhase} isReturning={props.isReturning}/>
        )
      })}

      {props.isSkipable &&
        <div className='gameOptionCard'>
        <h2>Überspringen</h2>
        <button
          onClick={()=> {
            props.setPhaseOfPhase(1);
            props.handleNewPhase()}}
        >
         Auswählen
        </button>
    </div>
      }
      
    </div>
  )
};
