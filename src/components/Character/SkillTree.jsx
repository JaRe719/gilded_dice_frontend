import React, { useEffect, useState } from 'react';
import "./SkillTree.css";

export default function SkillTree({intelligence, setIntelligence, negotiate, setNegotiate, ability, setAbility, planning, setPlanning, stamina, setStamina}) {

   

    const [remainingSkillPoints, setRemainingSkillPoints] = useState();
    const skillPoints = 8;

    useEffect(()=>{
        setRemainingSkillPoints(skillPoints-intelligence-negotiate-ability-planning-stamina);
    }, [intelligence, negotiate, ability, planning, stamina]);

    const calculateMax = (currentValue) => {
        return parseInt(currentValue) + remainingSkillPoints;
    };

    const handleInputChange = (value, setter, currentValue) => {
        const numericValue = parseInt(value) || 0; 
        const max = calculateMax(currentValue);
    
       
        if (numericValue >= 0 && numericValue <= max) {
          setter(numericValue);
        }
      };

      const handleBlur = (value, setter) => {
        if (value === "") {
          setter(0); 
        }
      };
    
      
      const handleKeyDown = (e, currentValue, max) => {
        if (
          (e.key === "ArrowUp" && currentValue >= max) || 
          (e.key === "ArrowDown" && currentValue <= 0) || 
          (!/^\d$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") 
        ) {
          e.preventDefault();
        }
      };

    return (
        <div className='skillTree'>
            <h2>Lege die Punkte für deine Fähigkeiten fest</h2>

            <p>Du hast noch <span>{remainingSkillPoints}</span> Punkte von <span>{skillPoints}</span> Punkten zur Verfügung</p>
      
            <form className='skillForm'>
                <label htmlFor="intelligenceInput">Intelligenz</label>
                <input
                  type="number"
                  id="intelligenceInput"
                  value={intelligence === 0 ? "" : intelligence}
                  max={calculateMax(intelligence)}
                  min={0}
                  onChange={(e) => handleInputChange(e.target.value, setIntelligence, intelligence)}
                  onKeyDown={(e) => handleKeyDown(e, intelligence, calculateMax(intelligence))}
                  onBlur={() => handleBlur(intelligence, setIntelligence)}
                />

                <label htmlFor="negotiateInput">Verhandeln</label>
                <input
                    type="number"
                    id="negotiateInput"
                    value={negotiate === 0 ? "" : negotiate}
                    max={calculateMax(negotiate)}
                    min={0}
                    onChange={(e) => handleInputChange(e.target.value, setNegotiate, negotiate)}
                    onKeyDown={(e) => handleKeyDown(e, negotiate, calculateMax(negotiate))}
                    onBlur={() => handleBlur(negotiate, setNegotiate)}
                />

                <label htmlFor="abilityInput">Geschicklichkeit</label>
                <input
                  type="number"
                  id="abilityInput"
                  value={ability === 0 ? "" : ability}
                  max={calculateMax(ability)}
                  min={0}
                  onChange={(e) => handleInputChange(e.target.value, setAbility, ability)}
                  onKeyDown={(e) => handleKeyDown(e, ability, calculateMax(ability))}
                  onBlur={() => handleBlur(ability, setAbility)}
                />

                <label htmlFor="planningInput">Planen</label>
                <input
                    type="number"
                    id="planningInput"
                    value={planning === 0 ? "" : planning}
                    max={calculateMax(planning)}
                    min={0}
                    onChange={(e) => handleInputChange(e.target.value, setPlanning, planning)}
                    onKeyDown={(e) => handleKeyDown(e, planning, calculateMax(planning))}
                    onBlur={() => handleBlur(planning, setPlanning)}
                />

                <label htmlFor="staminaInput">Durchhaltevermögen</label>
                <input
                  type="number"
                  id="staminaInput"
                  value={stamina === 0 ? "" : stamina} 
                  max={calculateMax(stamina)}
                  min={0}
                  onChange={(e) => handleInputChange(e.target.value, setStamina, stamina)}
                  onKeyDown={(e) => handleKeyDown(e, stamina, calculateMax(stamina))}
                  onBlur={() => handleBlur(stamina, setStamina)}
                />

            </form>

        </div>
  )
}
