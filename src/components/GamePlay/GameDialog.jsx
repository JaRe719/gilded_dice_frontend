import React, { useEffect, useState } from 'react';
import "./GameDialog.css";
import { useNavigate } from 'react-router-dom';
import LoadingElement from '../LoadingElement/LoadingElement';
import GameAvatarBox from './GameAvatarBox';
import DiceRoller from '../DiceRoller/DiceRoller';
import { getAvatarPaths } from '../../utils/AvatarProvider';

export default function GameDialog(props) {

  const token = sessionStorage.getItem("token");

    const navigate = useNavigate(); 

    const [isLoading, setIsLoading] = useState(true);

  const [chosenOptionDetails, setChosenOptionDetails] = useState(null);
  const [chosenInvest, setChosenInvest] = useState(null);
  const [diceResult, setDiceResult] = useState(null);
  const [diceRollDone, setDiceRollDone] = useState(false);
  const [showInvest, setShowInvest] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const [optionResult, setOptionResult] = useState(null);

  const [dialogPhase, setDialogPhase] = useState(1);

  useEffect(()=>{
    setIsLoading(true);
    if(token){
        fetch(`${process.env.REACT_APP_BACKEND}/api/v1/game/choice/${props.chosenOption}`, {
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
                setChosenOptionDetails(null);
            }
        })
        .then(data =>{
            setChosenOptionDetails(data);
            console.log("data chosenOption: " + JSON.stringify(data));
            setIsLoading(false);
            props.setPhaseOfPhase(3);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    } else{
        navigate("/login");
    };
},[props, token, navigate]);


const handleInvest = () => {
  if(props.money >= chosenInvest){
   if(token){
    fetch(`${process.env.REACT_APP_BACKEND}/api/v1/game/investing?storyId=${chosenOptionDetails.id}&investValue=${chosenInvest}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    })
    .then(response => {
        if (response.ok) {
          setIsLoading(false);
          setShowInvest(false);
        } else {
            setErrorMessage("Da ist etwas schief gelaufen, bitte versuche es erneut.");
        }
    })
    .catch(error => {
        console.error("Error:", error);
        setErrorMessage("Da ist etwas schief gelaufen, bitte versuche es erneut.")
    });
} else{
    navigate("/login");
}} else {
  setErrorMessage("Dein geplantes Investment übersteigt deine liquiden Mittel, bitte reduziere den Betrag!")
}
}

const handleDiceRolled = (e) => {
  e.preventDefault();
  setIsLoading(true);
if(token){
    fetch(`${process.env.REACT_APP_BACKEND}/api/v1/game/choice/${props.chosenOption}?diceResult=${diceResult}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            setOptionResult(null);
        }
    })
    .then(data =>{
        setOptionResult(data);
        // console.log("optionresult data: " + JSON.stringify(data));
        setIsLoading(false);
        setDiceRollDone(true);
        setDialogPhase(4);
    })
    .catch(error => {
        console.error("Error:", error);
    });
} else{
    navigate("/login");
}
}

// const handleDice = (e)=>{
//   e.preventDefault();
//   const result = Math.floor(Math.random() * 20) + 1;
//     setDiceResult(result);
// };

console.log("dialogPhase: " + dialogPhase);

const avatars = getAvatarPaths(); 

  return (
    <div className='gameDialog'>

      {isLoading && <LoadingElement />}

      {!isLoading && chosenOptionDetails &&
      <div className='gameDialogPlayWrapper' onClick={(e) => {
        e.preventDefault();
        if(dialogPhase < 3){
        setDialogPhase(dialogPhase+1)
        }
      }}>
        <GameAvatarBox avatar={chosenOptionDetails?.npcFilename} name={chosenOptionDetails.npcName} />
        {dialogPhase===1?
          <div className='dialogNpcWrapper'>
            <p className='dialogNpc'>{chosenOptionDetails?.startMessage}</p>
          </div>
        : dialogPhase === 4 && isLoading ?
          <LoadingElement /> 
          : dialogPhase === 4 && !isLoading && optionResult && diceRollDone ?
          <div className='dialogNpcWrapper'>
           <p className='dialogNpc speech-bubble'>{optionResult?.endMessage}</p>
        <button
          onClick={(e) => {
            e.preventDefault();
            console.log("GameDialog props.isReturning" + props.isReturning)
            if (props.isReturning && optionResult.choiceWon === false) {
              props.setPhaseOfPhase(2);
              props.setIsReturning(false);
            } else if (props.lastPhase) {
              props.setPhaseOfPhase(5);
            } else {
              props.setPhaseOfPhase(1)
              props.handleNewPhase();
            }
          }}
        >
          Weiter
        </button>
          </div>
          : ""
        }
        {dialogPhase===2 && props.isInvest?
          <div className='dialogCharWrapper'>
            <p className='dialogChar'>{`Ich würde gerne ${chosenInvest} investieren.`}</p>
          </div>
          : ""
        }
        <GameAvatarBox avatar={avatars[props.avatar]} name={props.username ? props.username : "Du"} />
        {props.isInvest && showInvest &&
        <div className='dialogNpcWrapper'>
          <p className='dialogNpc'>Wie viel möchtest du investieren?</p>
          <input type="number" name="investInput" id="investInput" onChange={(e) => setChosenInvest(e.target.value)}/>
          <button onClick={(e) => handleInvest(e)}>Investieren</button>
          {errorMessage && <p>{errorMessage}</p>}
        </div>}

        <div>
        {!diceRollDone && dialogPhase === 3 && (
  <div className="diceField">
    <DiceRoller setDiceResult={setDiceResult} />
    {/* <button onClick={(e)=> handleDice(e)}>Würfle</button> */}
    {diceResult && <p>{`Dein Ergebnis lautet: ${diceResult}`}</p>}
    <button
      onClick={(e) => {
        e.preventDefault();
        handleDiceRolled(e);
      }}
    >
      Weiter
    </button>
  </div>
)}

{/* {diceRollDone && optionResult && dialogPhase === 4 && (
  <div>
    <p>{optionResult.endMessage}</p>
    <button
      onClick={(e) => {
        e.preventDefault();
        if (props.isReturning && optionResult.choiceWon === false) {
          props.setPhaseOfPhase(2);
        } else if (props.lastPhase) {
          props.setPhaseOfPhase(5);
        } else {
          props.setPhaseOfPhase(1);
        }
      }}
    >
      Weiter
    </button>
  </div>
)} */}
         
  </div>
      </div>
      }
 
    </div>
  )
}
