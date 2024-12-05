import React, { useState } from 'react';
import "./AvatarChoice.css";
import {getAvatarPaths} from "../../utils/AvatarProvider";

export default function AvatarChoice() {
    const avatars = getAvatarPaths();
    console.log(avatars);
    

    const [selectedAvatar, setSelectedAvatar] = useState(avatars[0]);
    const [currentAvatar, setCurrentAvatar] = useState(0);
    const totalAvatars = 12;

    const nextAvatar = () => {
        setCurrentAvatar((prevValue) => (prevValue + 1) % totalAvatars);
    }

    const previousAvatar = () => {
        setCurrentAvatar((prevValue) => (prevValue - 1 + totalAvatars) % totalAvatars);
    }

    const chooseAvatar = () => {
        setSelectedAvatar(avatars[currentAvatar]);
    }

    console.log("selectedAvatar: " + selectedAvatar)
  
    return (
    <div>
        <button onClick={previousAvatar}>Prev</button>

        <div className='avatarChoice'>
            <img src={avatars[currentAvatar]} alt={"Avatar" + currentAvatar} />
        </div>


        <button onClick={nextAvatar}>Next</button>
        <button onClick={chooseAvatar}>Auswählen</button>
    </div>
  )
};
