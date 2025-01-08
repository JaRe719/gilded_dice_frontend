import React from 'react';
import { useNavigate } from 'react-router-dom';
import "./Landing.css";


export default function Landing() {

  const navigate = useNavigate();

  

  return (
    <div className='landing'>
    
    <h1>Willkommen Abenteurer, bist du bereit für deine nächste Reise?</h1>

    <button onClick={()=>navigate("/login")}>Los geht's</button>
    </div>
  )
}
