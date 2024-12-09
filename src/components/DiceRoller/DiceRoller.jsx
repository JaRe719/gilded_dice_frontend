import React from 'react';
import "./DiceRoller.css"
import DisplayResults from "@3d-dice/dice-ui/src/displayResults"; // fui index exports are messed up -> going to src
import DiceParser from "@3d-dice/dice-parser-interface";
import { Dice } from "./diceBox";
import AdvRollBtn from "./AdvRollBtn";


const DRP = new DiceParser();

const DiceResults = new DisplayResults("#dice-box");

let diceInitialized = false;

Dice.init({
    bounds: {
      x: [-20, 20],
      y: [-20, 20],
      z: [0, 20], 
    },
    
  }).then(() => {
  if (!diceInitialized) {
    diceInitialized = true;

 
    document.addEventListener("mousedown", () => {
      const diceBoxCanvas = document.getElementById("dice-canvas");
      if (window.getComputedStyle(diceBoxCanvas).display !== "none") {
        Dice.hide().clear();
        DiceResults.clear();
      }
    });
  }
});


export default function DiceRoller(props) {

    Dice.onRollComplete = (results) => {
        console.log(results);
    
        const finalResults = DRP.parseFinalResults(results);

        console.log('results:', results); 
console.log('finalResults:', finalResults.value);
    
        // show the results
        // DiceResults.showResults(finalResults);
    
        const resultDisplay = document.getElementById("result-display");
        if (resultDisplay) {
          resultDisplay.textContent = `Dein Würfelergebnis: ${finalResults.value}`;
        }
        props.setDiceResult(finalResults.value);
      };
    
     
      const rollDice = (notation, group) => {
        Dice.show().roll(DRP.parseNotation(notation));
      };
    

  return (
    <div id='dice'>
       {/* <div id="result-display" style={{ margin: "20px 0", fontWeight: "bold" }}>
        
      </div> */}
      <div className="buttonList">
        <AdvRollBtn
          label="Würfle"
          notation="1d20"
          onRoll={rollDice}
        />
      </div>
    </div>
  )
}
