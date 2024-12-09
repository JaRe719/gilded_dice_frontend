import React from 'react'

export default function GameOptionCard(props) {

  const handleOption = () => {
    props.setChosenOption(props.option.id);

    if(props.isReturning) {
      const newOptions = props.options;

      newOptions.splice(props.option.id, 1);

      props.setOptions(newOptions);
    };

    props.setPhaseOfPhase(3);

  };

  return (
    <div >
        <h2>{props.option.title}</h2>
        <button
          onClick={()=> handleOption()}
          disabled={props.option.cost !== null && props.option.cost > props.money}
        >
          {props.option.cost !== null && props.option.cost > 0 ? `Für ${props.option.cost} kaufen` : props.option.cost !== null && props.option.cost < 0 ? `Für ${props.option.cost} verkaufen` : 'Auswählen'}
        </button>
    </div>
  )
}
