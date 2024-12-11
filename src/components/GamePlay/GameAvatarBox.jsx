import React from 'react';

export default function GameAvatarBox(props) {
  return (
    <div className='gameAvatarBox'>
        <div className='gameAvatarImgBox'>
            <img src={props.avatar} alt="Avatar" />
        </div>
        <p>{props.name}</p>
    </div>
  )
};
