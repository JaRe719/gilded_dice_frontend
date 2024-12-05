import React, { useState, useEffect } from "react";
import "./LoadingElement.css";

const LoadingElement = () => {
  const [story, setStory] = useState(false); 

  useEffect(() => {
    // Optional: Setze story auf true nach 10 Sekunden für Testzwecke
    const timeout = setTimeout(() => {
      setStory(true);
    }, 10000); // Nach 10 Sekunden wird der Zustand auf true gesetzt.

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`bookWrapper ${story ? 'hidden' : ''}`}>
    <div className="book">
      
      <div className="book__static-front"></div>
      <div className="book__static-back"></div>

    
      <div className="book__pg book__pg--1"></div>
      <div className="book__pg book__pg--2"></div>
      <div className="book__pg book__pg--3"></div>
      <div className="book__pg book__pg--4"></div>
      <div className="book__pg book__pg--5"></div>
      <div className="book__pg book__pg--6"></div>
      <div className="book__pg book__pg--7"></div>
    </div>
    </div>
  );
};

export default LoadingElement;
