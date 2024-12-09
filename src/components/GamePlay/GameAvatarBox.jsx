import React from 'react';



export default function GameAvatarBox(props) {
  console.log("Avatar: "+ props.avatar);
  

  return (
    <div className='gameAvatarBox'>
        <div className='gameAvatarImgBox'>
            <img src={props.avatar} alt="Avatar" />
        </div>
        <p>{props.name}</p>
    </div>
  )
};
