import React, { useEffect, useState } from 'react';
import "./Home.css";
import { getAvatarPaths } from '../utils/AvatarProvider';
import Navbar from '../components/Navbar/Navbar';
import Dashboard from '../components/Dashboard/Dashboard';
import { useNavigate } from 'react-router-dom';

export default function Home() {

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const avatars = getAvatarPaths();
  const [chosenAvatar, setChosenAvatar] = useState(null)
  const [charDetails, setCharDetails] = useState(null);
  const [token, setToken] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
      const tokenFromStorage = sessionStorage.getItem("token");
      if (tokenFromStorage) {
          setToken(tokenFromStorage);
      }
      setIsLoading(false);
  }, []);

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
    })
    .catch(error => {
        console.error("Error:", error);
    });
}},[token, isLoading]);

useEffect(()=>{
  if(!isLoading && charDetails){
    setChosenAvatar(charDetails.avatar)
  }
}, [charDetails, isLoading]);

useEffect(() => {
  if (!chosenAvatar) {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % avatars.length);
    }, 500); 
    return () => clearInterval(interval);
  }
}, [chosenAvatar, avatars.length]);
 

  return (
    <div className='home'>
      <Navbar />

      <div className='middleHome'>

      <Dashboard />

      <div>
        {
          chosenAvatar ?
          <div className='avatarWrapper' onClick={()=> navigate("/character")}>
            <h4>Dein erstellter Charakter:</h4>
            <div className='imgBox'>
              <img src={avatars[chosenAvatar]} alt="chosen avatar" />
            </div>
          </div>
          :
          <div className='avatarWrapper' onClick={()=> navigate("/character")}>
            <h4>Erstelle jetzt einen Charakter</h4>
            <div className='imgBox'>
              <img src={avatars[currentIndex]} alt="changing avatar" />
            </div>
          </div>
        }
      </div>
      </div>
      <button className='startButton' onClick={()=>navigate("/gameplay")}>Spiel starten</button>
    </div>
  )
}
