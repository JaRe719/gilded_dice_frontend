import React, { useEffect, useState } from 'react';
import "./Dashboard.css";
import Highscore from './Highscore';

export default function Dashboard() {

    const [topTen, setTopTen] = useState(null);
    const [highscoresAll, setHighscoresAll] = useState(null);


    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND}/api/v1/highscore/toplist`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setTopTen(null);
            }
        })
        .then(data =>{
            setTopTen(data);
            console.log("data toplist: " + JSON.stringify(data));
        })
        .catch(error => {
            console.error("Error:", error);
        });
    },[]);

    useEffect(()=>{
        fetch(`${process.env.REACT_APP_BACKEND}/api/v1/highscore/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                setHighscoresAll(null);
            }
        })
        .then(data =>{
            setHighscoresAll(data);
            console.log("data highscores all: " + JSON.stringify(data));
        })
        .catch(error => {
            console.error("Error:", error);
        });
    },[]);


  return (
    <div>
      <div>
        <h2>Top 10 Highscores</h2>
        <Highscore list={topTen} />
      </div>
      <div>
        <h2>Gesamt Highscores</h2>
        <Highscore list={highscoresAll} />
      </div>
    </div>
  )
}
