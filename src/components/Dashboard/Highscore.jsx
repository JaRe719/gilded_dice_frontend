import React from 'react';
import "./Dashboard.css";

export default function Highscore({list}) {

  return (
    <div className='highscores'>
      <div>
        <h3>Spieler</h3>
        <h3>Highscore</h3>
      </div>
      <ol>
       { list &&
       list.map((player, index)=>{
        return (
            <li key={index}>
                <span>{player.username}</span>
                <span>{player.score}</span>
            </li>
        )
       })}
      </ol>
    </div>
  )
}
