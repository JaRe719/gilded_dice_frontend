import React from 'react';
import "./Landing.css";
// import DiceRoller from '../components/DiceRoller/DiceRoller';
import AvatarChoice from '../components/Character/AvatarChoice';
import SkillTree from '../components/Character/SkillTree';

export default function Landing() {
  return (
    <div className='landing'>
      Landing Page
    <AvatarChoice />
    <SkillTree />
    </div>
  )
}
