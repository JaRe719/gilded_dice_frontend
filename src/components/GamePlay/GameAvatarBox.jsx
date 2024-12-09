import React from 'react';


export default function GameAvatarBox(props) {
  return (
    <div>
        <div>
            <img src={props.avatar} alt="Avatar" />
        </div>
        <p>{props.name}</p>
    </div>
  )
};
