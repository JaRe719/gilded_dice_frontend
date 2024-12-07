import React from 'react'

export default function GameOptionCard({props}) {
  return (
    <div onClick={()=> props.setChosenOption(props.id)}>
        <h2>{props.title}</h2>
    </div>
  )
}
