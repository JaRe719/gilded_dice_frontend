import React, { useEffect, useState } from 'react';
import AvatarChoice from '../components/Character/AvatarChoice';
import SkillTree from '../components/Character/SkillTree';
import { getAvatarPaths } from '../utils/AvatarProvider';

export default function Character() {

    const [token, setToken] = useState("");

    useEffect(()=>{
        setToken(sessionStorage.getItem("token"))
    },[])

    const avatars = getAvatarPaths();
    console.log(avatars);
    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);

    const [intelligence, setIntelligence] = useState(0);
    const [negotiate, setNegotiate] = useState(0);
    const [ability, setAbility] = useState(0);
    const [planning, setPlanning] = useState(0);
    const [stamina, setStamina] = useState(0);

    const [saveMessage, setSaveMessage] = useState(null);

    useEffect(()=>{
        setSaveMessage(null);
    },[])

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
    <div>
        <h1>Dein Held, deine Entscheidungen – Bearbeite oder erstelle deinen Charakter!</h1>

      <AvatarChoice selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} avatars={avatars}/>
      <SkillTree intelligence={intelligence} setIntelligence={setIntelligence} negotiate={negotiate} setNegotiate={setNegotiate} ability={ability} setAbility={setAbility} planning={planning} setPlanning={setPlanning} stamina={stamina} setStamina={setStamina}/>

      <button onClick={saveHandler}>Speichern</button>

        {saveMessage && <p>{saveMessage}</p>}
    </div>
  )
}
