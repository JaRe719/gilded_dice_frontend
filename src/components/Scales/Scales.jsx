import React from 'react';
import "./Scales.css";

export default function Scales(props) {

  return (
    <div>
        <div class="progress-container">
            <progress className='progressPos' id="progressBarHealth" value={props.health ? props.health : 0} max="20"></progress>
            <span class="progress-label">{`Gesundheit: ${props.health} / 20`}</span>
        </div>
        <div class="progress-container">
            <progress className='progressNeg' id="progressBarStress" value={props.stress ? props.stress : 0} max="20"></progress>
            <span class="progress-label">{`Stress: ${props.stress} / 20`}</span>
        </div>
        <div class="progress-container">
            <progress className='progressPos' id="progressBarSatisfaction" value={props.satisfaction ? props.satisfaction : 0} max="20"></progress>
            <span class="progress-label">{`Zufriedenheit: ${props.satisfaction} / 20`}</span>
        </div>
      
    </div>
  )
}
