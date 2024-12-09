import React from 'react'

export default function GameOptionCard(props) {

  console.log(props.isReturning)

  const handleOption = () => {
    props.setChosenOption(props.option.id);

    if(props.isReturning) {
      const newOptions = props.options;

      const index = newOptions.findIndex(obj => obj.id === props.option.id);

      newOptions.splice(index, 1);

      props.setOptions(newOptions);
      console.log("newOptions :" + newOptions)
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
