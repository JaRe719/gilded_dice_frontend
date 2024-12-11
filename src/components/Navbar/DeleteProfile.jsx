import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function DeleteProfile({props}) {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [isSure, setIsSure] = useState(false);
    const [buttonToggle, setButtonToggle] = useState(false);

    const handleOnClick = () => {
        setButtonToggle(true);
    }

    const handleDelete = () => {

        if(token && isSure){

            fetch(`${process.env.REACT_APP_BACKEND}/api/v1/auth/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                if (response.ok) {
                    props.setActionMessage("Dein Profil wurde erfolgreich gelöscht.");
                    setTimeout(()=> navigate("/"), 1000);
                    setButtonToggle(false);
                    setIsSure(false);
                    sessionStorage.removeItem("token");
                } else {
                    props.setActionMessage("Da ist etwas schief gelaufen, bitte versuche es später noch einmal.");
                    setButtonToggle(false);
                    setIsSure(false);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }

  return (
    <div className='deleteProfile'>
        <p>Profil löschen</p>
        { 
            !buttonToggle ?
             <button className='innerButton' onClick={handleOnClick}>Löschen</button>
            :
            <div>
                <p>Bist du sicher?</p>
                <div className='buttonBoxMenu'>
                    <button className='innerButton' onClick={()=>{setButtonToggle(false)}}>Nein, ich möchte bleiben</button>
                    <button className='innerButton' onClick={()=> {setIsSure(true); handleDelete()}}>Ja, löschen!</button>
                </div>
            </div>
        }
    </div>
  )
};
