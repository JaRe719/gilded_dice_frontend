import React, { useState } from 'react';
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import DeleteProfile from './DeleteProfile';

export default function Navbar() {
    const navigate = useNavigate();
    

    const [actionMessage, setActionMessage] = useState(null);
    const [isActive, setIsActive] = useState(false);

    const handleMenu = () => {
        setIsActive(prev => !prev);
    };

    const handleLogout = () =>{
        sessionStorage.removeItem("token");
        navigate("/");
    };

    
  return (
    <div>

        <div>
            <img src="/gildedDiceLogo.png" alt="Gilded Dice Logo - pile of coins and a d20 dice" />
        </div>

        <div>
            {
                !isActive ?
                    <p onClick={handleMenu}>Menü</p>
                :
                    <ul>
                        <li onClick={handleLogout}>Logout</li>
                        <li><DeleteProfile setActionMessage={setActionMessage} /></li>
                        {actionMessage && <p>{actionMessage}</p>}
                        <li onClick={handleMenu}>Schließen</li>
                    </ul>
            }
        </div>
      
    </div>
  );
};
