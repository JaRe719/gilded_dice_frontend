import React from 'react';
import "./DiceRoller.css"
import DisplayResults from "@3d-dice/dice-ui/src/displayResults"; // fui index exports are messed up -> going to src
import DiceParser from "@3d-dice/dice-parser-interface";
import { Dice } from "./diceBox";
import AdvRollBtn from "./AdvRollBtn";


const DRP = new DiceParser();

const DiceResults = new DisplayResults("#dice-box");

let diceInitialized = false;

Dice.init().then(() => {
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


export default function DiceRoller() {

    Dice.onRollComplete = (results) => {
        console.log(results);
    
        const finalResults = DRP.parseFinalResults(results);
    
        // show the results
        // DiceResults.showResults(finalResults);
    
        // Additional calculation: Skill, Bonus, Malus
        const skill = 5; // Example skill value
        const bonus = 3; // Example bonus value
        const malus = 2; // Example malus value
    
        const adjustedResult = finalResults.value + skill + bonus - malus;
        console.log("Adjusted Result:", adjustedResult);
    
        const resultDisplay = document.getElementById("result-display");
        if (resultDisplay) {
          resultDisplay.textContent = `Final Result: ${adjustedResult}`;
        }
      };
    
     
      const rollDice = (notation, group) => {
        Dice.show().roll(DRP.parseNotation(notation));
      };
    

  return (
    <div id='dice'>
       <div id="result-display" style={{ margin: "20px 0", fontWeight: "bold" }}>
        {/* Result will be displayed here */}
      </div>
      <div className="buttonList">
        <span className="header">Roll Action</span>
        <span className="header">Notation</span>
        <span className="header">Explanation</span>
        <AdvRollBtn
          label="Roll d20"
          notation="1d20"
          onRoll={rollDice}
        />
      </div>
    </div>
  )
}
