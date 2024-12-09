import React, { useEffect, useState } from 'react';
import "./Character.css";
import AvatarChoice from '../components/Character/AvatarChoice';
import SkillTree from '../components/Character/SkillTree';
import { getAvatarPaths } from '../utils/AvatarProvider';
import { useNavigate } from 'react-router-dom';

export default function Character() {

    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [isGetCharDone, setIsGetCharDone] = useState(false);

    const [token, setToken] = useState("");

    useEffect(() => {
        const tokenFromStorage = sessionStorage.getItem("token");
        if (tokenFromStorage) {
            setToken(tokenFromStorage);
        }
        setIsLoading(false);
    }, []);

    const avatars = getAvatarPaths();
    console.log(avatars);
    const [selectedAvatar, setSelectedAvatar] = useState(0);

    const [charDetails, setCharDetails] = useState(null);

    useEffect(()=>{
        if(!isLoading && token){
        fetch(`${process.env.REACT_APP_BACKEND}/api/v1/char`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setCharDetails(null);
            }
        })
        .then(data =>{
            setCharDetails(data);
            console.log("data: " + JSON.stringify(data));
            setIsGetCharDone(true);
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }},[token, isLoading]);

    const [intelligence, setIntelligence] = useState(0);
    const [negotiate, setNegotiate] = useState(0);
    const [ability, setAbility] = useState(0);
    const [planning, setPlanning] = useState(0);
    const [stamina, setStamina] = useState(0);

    const [saveMessage, setSaveMessage] = useState(null);

    useEffect(() => {
        setSaveMessage(null);
    
        if (charDetails) {
            setIntelligence(parseInt(charDetails.intelligence) || 0);
            setNegotiate(parseInt(charDetails.negotiate) || 0);
            setAbility(parseInt(charDetails.ability) || 0);
            setPlanning(parseInt(charDetails.planning) || 0);
            setStamina(parseInt(charDetails.stamina) || 0);
            setSelectedAvatar(parseInt(charDetails.avatar) || 0)
        }
    }, [charDetails, isGetCharDone]);

    const saveHandler = (e)=>{
        e.preventDefault();
    
        const characterData = {
            intelligence: intelligence,
            negotiate: negotiate,
            ability: ability,
            planning: planning,
            stamina: stamina,
            avatar: selectedAvatar   
        };
    
        fetch(`${process.env.REACT_APP_BACKEND}/api/v1/char`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token,
            },
            body: JSON.stringify(characterData),
        })
        .then(response => {
            if (response.ok) {
                setSaveMessage("Profile updated successfully");
            } else {
                setSaveMessage("Failed to update profile");
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    }

  return (
    <div className='characterPage'>
        <h1>Dein Held, deine Entscheidungen – Bearbeite oder erstelle deinen Charakter!</h1>

      <AvatarChoice selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} avatars={avatars}/>
      <SkillTree intelligence={intelligence} setIntelligence={setIntelligence} negotiate={negotiate} setNegotiate={setNegotiate} ability={ability} setAbility={setAbility} planning={planning} setPlanning={setPlanning} stamina={stamina} setStamina={setStamina}/>

        <div className='buttonWrapperChar'>
            <button onClick={saveHandler}>Speichern</button>

            {saveMessage && <p>{saveMessage}</p>}

            <button onClick={()=>navigate("/home")}>Zurück</button>
        </div>
    </div>
  )
};
