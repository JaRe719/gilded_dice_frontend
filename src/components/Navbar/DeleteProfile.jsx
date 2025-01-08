import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Navbar.css";

export default function DeleteProfile({props}) {

    const token = sessionStorage.getItem("token");
    const navigate = useNavigate();

    const [buttonToggle, setButtonToggle] = useState(false);

    const handleOnClick = () => {
        setButtonToggle(true);
    }

    const handleDelete = () => {

        if(token){

            fetch(`${process.env.REACT_APP_BACKEND}/api/v1/auth/delete`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                }
            })
            .then(response => {
                console.log(response.ok);
                if (response.ok) {
                    // props.setActionMessage("Dein Profil wurde erfolgreich gelöscht.");
                    alert("Profil gelöscht");
                    setTimeout(()=> navigate("/"), 1000);
                    setButtonToggle(false);
                
                    sessionStorage.removeItem("token");
                } else {
                    // props.setActionMessage("Da ist etwas schief gelaufen, bitte versuche es später noch einmal.");
                    alert("Profil Löschung nicht erfolgreich");
                    setButtonToggle(false);
                }
            })
            .catch(error => {
                console.error("Error:", error);
            });
        }
    }

  return (
    <div className='deleteProfile'>
        { 
            !buttonToggle ?
             <button className='deleteProfileText' onClick={handleOnClick}>Profil löschen</button>
            :
            <div>
                <p>Bist du sicher?</p>
                <div className='buttonBoxMenu'>
                    <button className='innerButton' onClick={()=>{setButtonToggle(false)}}>Nein, ich möchte bleiben</button>
                    <button className='innerButton' onClick={()=> {handleDelete()}}>Ja, löschen!</button>
                </div>
            </div>
        }
    </div>
  )
};
