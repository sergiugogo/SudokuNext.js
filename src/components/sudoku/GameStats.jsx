
import React, { useState, useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const GameStats = ({ mistakes, maxMistakes = 3, gameStarted, gamePaused, gameCompleted }) => {
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    let intervalId;
    
    if (gameStarted && !gamePaused && !gameCompleted) {
      intervalId = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 1000);
    }
    
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [gameStarted, gamePaused, gameCompleted]);
  
  // Format time as mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };
  
  return (
    <div className="flex justify-between items-center px-4 py-2 glass rounded-md mb-4">
      <div className="flex items-center">
        <Clock className="mr-2 h-5 w-5 text-muted-foreground" />
        <span className="font-medium">{formatTime(time)}</span>
      </div>
      
      <div className="flex items-center">
        <AlertTriangle className="mr-2 h-5 w-5 text-muted-foreground" />
        <div className="flex space-x-1">
          {Array.from({ length: maxMistakes }).map((_, index) => (
            <span 
              key={index}
              className={`h-2 w-2 rounded-full ${
                index < mistakes ? 'bg-destructive' : 'bg-muted'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameStats;
