import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);
  const [Popup, setPopup] = useState(false);
  const [BreakPopup, setBreakPopup] = useState(false);
  const [Break, setBreak] = useState(false);

  useEffect(() => {
    let timer;
    if (running) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            if (minutes === 0) {
              clearInterval(timer);
              setRunning(false);

              if (Break) {
                setBreakPopup(true);
              } else {
                setPopup(true);
              }
              return 0;
            }
            return 59;
          }
          return prevSeconds - 1;
        });

        if (seconds === 0 && minutes > 0) {
          setMinutes((prevMinutes) => prevMinutes - 1);
        }
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [running, seconds]);

  function startPauseTimer() {
    setRunning(!running);
  }

  function startBreak() {
    setMinutes(5);
    setSeconds(0);
    setRunning(true);
    setBreak(true);
    setPopup(false);
  }
  function Breakstart() {
    setMinutes(5);
    setSeconds(0);
    setRunning(true);
    setBreak(true);
    setPopup(false);
  }

  function handleRestartSession() {
    setMinutes(25);
    setSeconds(0);
    setRunning(true);
    setBreak(false);
    setPopup(false);
  }

  function handleBreakEnd() {
    setMinutes(25);
    setSeconds(0);
    setRunning(false);
    setBreak(false);
    setBreakPopup(false);
  }

  function resetTimer() {
    setMinutes(25);
    setSeconds(0);
    setRunning(false);
    setBreak(false);
    setPopup(false);
    setBreakPopup(false);
  }

  return (
    <div className="main">
      <h1>Pomodoro Timer</h1>
      <div>
        <div className="time">
          <h1>
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </h1>
        </div>
        <div className="buttons">
          <button onClick={startPauseTimer}>
            {(() => {
              if (running) {
                return "Pause";
              } else {
                return "Start";
              }
            })()}
          </button>
          <button onClick={resetTimer}>Reset</button>
          <button onClick={Breakstart}>Break</button>
        </div>

      </div>
      {Popup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Time's Up!</h2>
            <p>Your time is complete.</p>
            <button onClick={startBreak}>Take a 5-min break</button>
            <button onClick={handleRestartSession}>Cancel</button>
          </div>
        </div>
      )}
      {BreakPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>Break Completed!</h2>
            <p>Your break is completed</p>
            <button onClick={handleBreakEnd}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
