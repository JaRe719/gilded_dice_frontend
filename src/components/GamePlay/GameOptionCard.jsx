import React from 'react';
import "./GameOptions.css";

export default function GameOptionCard(props) {

  console.log("GameOptionCard isReturning: " + props.option.returning)

  const handleOption = () => {
    props.setChosenOption(props.option.id);

    if(props.option.returning) {
      const newOptions = props.options;

      const index = newOptions.findIndex(obj => obj.id === props.option.id);

      newOptions.splice(index, 1);

      props.setOptions(newOptions);
      console.log("newOptions :" + newOptions);
      props.setIsReturning(true);
    };

    props.setPhaseOfPhase(3);

  };

  return (
    <div className='gameOptionCard'>
        <h2>{props.option.title}</h2>
        {!props.option.title === "Autokauf" && props.driverLicense === false && <p>Beachte, dass du noch keinen Führerschein hast!</p>}
        {props.option.cost !== null && props.option.cost > props.money && <p>Du hast nicht genügend Geld zur Verfügung!</p>}
        <button
          onClick={()=> handleOption()}
          disabled={props.option.cost !== null && props.option.cost > props.money}
        >
          {props.option.cost !== null && props.option.cost > 0 ? `Für ${props.option.cost} kaufen` : props.option.cost !== null && props.option.cost < 0 ? `Für ${props.option.cost} verkaufen` : 'Auswählen'}
        </button>
    </div>
  )
}
