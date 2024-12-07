import React from 'react';
import "./Landing.css";
import Character from './Character';
import { useNavigate } from 'react-router-dom';


export default function Landing() {

  const navigate = useNavigate();

  return (
    <div className='landing'>
      Landing Page
    
    <h1>Willkommen Abenteurer, bist du bereit für deine nächste Reise?</h1>

    <button onClick={()=>navigate("/login")}>Los geht's</button>
    </div>
  )
}
