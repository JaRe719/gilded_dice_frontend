import React from 'react';



export default function GameAvatarBox(props) {
  console.log("Avatar: "+ props.avatar);
  

  return (
    <div>
        <div>
            <img src={props.avatar} alt="Avatar" />
        </div>
        <p>{props.name}</p>
    </div>
  )
};
