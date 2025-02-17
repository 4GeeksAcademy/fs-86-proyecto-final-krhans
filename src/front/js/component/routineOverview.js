import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/routineOverview.css";

const RoutineOverview = () => {
    const [timeLeft, setTimeLeft] = useState(420);
    const [totalTime, setTotalTime] = useState(420);
    const [isRunning, setIsRunning] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsRunning(false);
            setMessage(":marca_de_verificación_gruesa: ¡Rutina completada!");
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft]);
    const handleToggleTimer = () => {
        setIsRunning((prev) => !prev);
    };
    const handleWorkDone = () => {
        setIsRunning(false);
        setMessage("");
        navigate("/dashboard/statisticsscreen");
    };
    const handleBack = () => {
        navigate("/fitpageoverview");
    };
    return (
        <div className="routine-page-container">
            {/* <div className="routine-details">
                <p>ROUTINE</p>
            </div> */}
            <div className="bottom-container">
                <div className="music-timer-wrapper">
                    <div className="music-container">
                        <iframe width="100%" height="166" scrolling="no" frameBorder="no"
                            src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/soundcloud/tracks&color=ff6600">
                        </iframe>
                    </div>
                    <div className="timer-buttons-container">
                        <div className="timer-container">
                            <svg className="progress-circle" width="90" height="90">
                                <circle className="background-circle" cx="45" cy="45" r="40" />
                                <circle className="progress-ring" cx="45" cy="45" r="40"
                                    style={{
                                        strokeDasharray: 251,
                                        strokeDashoffset: (1 - timeLeft / totalTime) * 251
                                    }}
                                />
                                <text x="50%" y="50%" textAnchor="middle" dy=".3em" transform="rotate(90 45 45)" className="timer-text">
                                    {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
                                </text>
                            </svg>
                        </div>
                        <div className="buttons-container">
                            <button className="start-timer-button" onClick={handleToggleTimer}>
                                {isRunning ? "❚❚" : "▶️"}
                            </button>
                            <button className="work-done-button" onClick={handleWorkDone}>
                                Work Done!
                            </button>
                        </div>
                    </div>
                    {message && <p className="timer-message">{message}</p>}
                </div>
                {/* <div className="exercise-table">
                    <button className="start-routine-button" onClick={handleBack}>
                        BACK
                    </button>
                </div> */}
            </div>
        </div>
    );
};
export default RoutineOverview;