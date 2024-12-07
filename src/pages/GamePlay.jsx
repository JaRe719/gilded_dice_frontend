import React, { useState } from 'react';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import GamePhaseIntro from '../components/GamePlay/GamePhaseIntro';
import GameOptions from '../components/GamePlay/GameOptions';
import GameDialog from '../components/GamePlay/GameDialog';

export default function GamePlay() {

    const token = sessionStorage.getItem("token");

    const [isLoading, setIsLoading] = useState(true);

    const [phaseDetails, setPhaseDetails] = useState(null);
    const [chosenOption, setChosenOption] = useState(null);

    const [phaseOfPhase, setPhaseOfPhase] = useState(null);
    

    const handleNewPhase = ()=>{ 
        setIsLoading(true);
        if(token){
            fetch(`${process.env.REACT_APP_BACKEND}/api/v1/game`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    setPhaseDetails(null);
                }
            })
            .then(data =>{
                setPhaseDetails(data);
                console.log("data: " + JSON.stringify(data));
                setIsLoading(false);
                setPhaseOfPhase(1);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }};


  return (
    <div>
      {isLoading && <LoadingElement />}

      {!phaseOfPhase && <button onClick={handleNewPhase}>Los geht's</button>}

      {phaseOfPhase === 1 && <GamePhaseIntro intro={phaseDetails.intro} setChosenOption={setChosenOption} setPhaseOfPhase={setPhaseOfPhase}/>}
      {phaseOfPhase === 2 && <GameOptions setChosenOption={setChosenOption} phaseDetails={phaseDetails} setPhaseOfPhase={setPhaseOfPhase}/>}
      {phaseOfPhase === 3 && <GameDialog chosenOption={chosenOption} setPhaseOfPhase={setPhaseOfPhase} phaseDetails={phaseDetails} setPhaseDetails={setPhaseDetails} />}


    </div>
  )
};
