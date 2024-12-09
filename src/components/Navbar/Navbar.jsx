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
    <div className='navbar'>

        <div className='img'>
            <img src="/gildedDiceLogo.png" alt="Gilded Dice Logo - pile of coins and a d20 dice" />
        </div>

        <h1>Gilded Dice – <span>das Streben nach Reichtum in einer Welt voller Würfelglück</span></h1>

        <div className='menu'>
            {
                !isActive ?
                    <p onClick={handleMenu}>Menü</p>
                :
                    <ul>
                        <li onClick={handleLogout}>Logout</li>
                        <li><DeleteProfile setActionMessage={setActionMessage} /></li>
                        {actionMessage ? <p className='actionMessageMenu'>{actionMessage}</p> : <p></p>}
                        <li onClick={handleMenu} alt="schließen" className='closeMenu'>X</li>
                    </ul>
            }
        </div>
      
    </div>
  );
};
