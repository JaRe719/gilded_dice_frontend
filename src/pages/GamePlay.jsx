import React, { useEffect, useState } from 'react';
import LoadingElement from '../components/LoadingElement/LoadingElement';
import GamePhaseIntro from '../components/GamePlay/GamePhaseIntro';
import GameOptions from '../components/GamePlay/GameOptions';
import GameDialog from '../components/GamePlay/GameDialog';
import { useNavigate } from 'react-router-dom';
// import GamePhaseOutro from '../components/GamePlay/GamePhaseOutro';
import GameEnd from '../components/GamePlay/GameEnd';
import Scales from '../components/Scales/Scales';
import Money from '../components/Scales/Money';

export default function GamePlay() {

    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);

    const [charDetails, setCharDetails] = useState(null);
    const [moneyDetails, setMoneyDetails] = useState(null);

    const [options, setOptions] = useState([]);
    const [isInvest, setIsInvest] = useState(false);
    const [phaseDetails, setPhaseDetails] = useState(null);
    const [chosenOption, setChosenOption] = useState(null);
    const [isReturning, setIsReturning] = useState(false);
    const [isSkipable, setIsSkipable] = useState(false);

   
   

    const [phaseOfPhase, setPhaseOfPhase] = useState(null);

    useEffect(()=>{
        if(token){
            fetch(`${process.env.REACT_APP_BACKEND}/api/v1/char`, {
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
                    setCharDetails(null);
                }
            })
            .then(data =>{
                setCharDetails(data);
                console.log("chardata: " + JSON.stringify(data));
            })
            .catch(error => {
                console.error("Error:", error);
            });

            fetch(`${process.env.REACT_APP_BACKEND}/api/v1/char/money`, {
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
                    setMoneyDetails(null);
                }
            })
            .then(data =>{
                setMoneyDetails(data);
                console.log("moneydata: " + JSON.stringify(data));
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }, [phaseOfPhase, token]);

    useEffect(()=>{
        // setOptions(phaseDetails?.choices);
        if(phaseDetails?.category === "INVESTMENT"){
            setIsInvest(true);
        } else {
            setIsInvest(false);
        };

        if(phaseDetails?.skipable){
            setIsSkipable(true);
        } else {
            setIsSkipable(false);
        };

        if(phaseDetails?.category === "MAINX"){
            setIsReturning(true);
        } else{
            setIsReturning(false);
        };
    }, [phaseDetails]);
    

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
                const { choices } = data || {};
                
                
                setOptions(Array.isArray(choices) ? choices : []);
                
                console.log("Choices set in options:", choices);
                console.log("data phase details: " + JSON.stringify(data));
                setIsLoading(false);
                setPhaseOfPhase(1);
            })
            .catch(error => {
                console.error("Error:", error);
            });
        } else{
            navigate("/login");
        };
    };

    useEffect(() => {
        console.log("Updated phaseDetails:", phaseDetails);
        console.log("pase of phase: " + typeof(phaseOfPhase) + phaseOfPhase);
        console.log("options: " + options);
        console.log("isInvest: " + isInvest)
    }, [phaseDetails, phaseOfPhase, options, isInvest]);


console.log("phaseOfPhase" + phaseOfPhase );
console.log("phaseDetails" + phaseDetails);
  return (
    <div>
      {isLoading && <LoadingElement />}

      <Scales health={charDetails?.healthLvl} stress={charDetails?.stressLvl} satisfaction={charDetails?.satisfactionLvl} />
      <Money income={moneyDetails?.income} outcome={moneyDetails?.outcome} money={moneyDetails?.money} invest={moneyDetails?.invest} />

      {!phaseOfPhase && <button onClick={handleNewPhase}>Los geht's</button>}

      {phaseOfPhase === 1 && phaseDetails && <GamePhaseIntro intro={phaseDetails?.intro} setChosenOption={setChosenOption} setPhaseOfPhase={setPhaseOfPhase}/>}
      {phaseOfPhase === 2 && phaseDetails && options && <GameOptions setChosenOption={setChosenOption} phaseDetails={phaseDetails} options={options} setOptions={setOptions} setPhaseOfPhase={setPhaseOfPhase} money={moneyDetails?.money} isSkipable={isSkipable} isReturning={isReturning} />}
      {phaseOfPhase === 3 && phaseDetails && <GameDialog chosenOption={chosenOption} isInvest={isInvest} setPhaseOfPhase={setPhaseOfPhase} phaseDetails={phaseDetails} setPhaseDetails={setPhaseDetails} avatar={charDetails?.avatar} lastPhase={phaseDetails?.gameEnd} isReturning={isReturning} handleNewPhase={handleNewPhase}/>}
      {/* {phaseOfPhase === 4 && <GamePhaseOutro chosenOption={chosenOption} isInvest={isInvest} setPhaseOfPhase={setPhaseOfPhase} phaseDetails={phaseDetails} setPhaseDetails={setPhaseDetails} />} */}
      {phaseOfPhase === 5 && phaseDetails && <GameEnd chosenOption={chosenOption} isInvest={isInvest} setPhaseOfPhase={setPhaseOfPhase} phaseDetails={phaseDetails} setPhaseDetails={setPhaseDetails} />}

      {phaseOfPhase === 2 && !options.length && <p>Keine Optionen verfügbar</p>}
    </div>
  )
};
