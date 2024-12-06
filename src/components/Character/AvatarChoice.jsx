import React, { useEffect, useState } from 'react';
import "./AvatarChoice.css";


export default function AvatarChoice({selectedAvatar, setSelectedAvatar, avatars}) {
  
    const [currentAvatar, setCurrentAvatar] = useState(selectedAvatar);
    console.log("currentAvatar: " + currentAvatar)
    const totalAvatars = 12;

    const nextAvatar = () => {
        setCurrentAvatar((prevValue) => (prevValue + 1) % totalAvatars);
    }

    const previousAvatar = () => {
        setCurrentAvatar((prevValue) => (prevValue - 1 + totalAvatars) % totalAvatars);
    }

    const chooseAvatar = () => {
        setSelectedAvatar(currentAvatar);
    }

    useEffect(()=>{
        setCurrentAvatar(selectedAvatar)
    },[selectedAvatar])

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
