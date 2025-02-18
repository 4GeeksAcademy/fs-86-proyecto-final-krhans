import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import "../../styles/routineOverview.css";

const RoutineOverview = () => {
    const { store, actions } = useContext(Context);
    const routine = store.userData.routine;
    const trainings = store.trainings || []; 

    const [exerciseIndex, setExerciseIndex] = useState(0);
    const [timeLeft, setTimeLeft] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRoutine = async () => {
            try {
                const trainings = await actions.getTrainings();
                console.log("Entrenos almacenada en store:", trainings);

                if (trainings.length > 0) {
                    setExerciseIndex(0);
                    setTimeLeft(trainings[0].duration * 60); 
                }
            } catch (error) {
                console.error("Error al obtener la rutina:", error);
            }
        };

        fetchRoutine();
    }, []);

    useEffect(() => {
        let timer;
        if (isRunning && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft(prev => prev - 1);
            }, 1000);
        } else if (timeLeft === 0 && trainings.length > 0) {
            clearInterval(timer);

            if (isResting) {
                setIsResting(false);
                nextExercise();
            } else {
                setIsResting(true);
                setTimeLeft(40); 
            }
        }
        return () => clearInterval(timer);
    }, [isRunning, timeLeft, isResting]);

    const nextExercise = () => {
        if (exerciseIndex < trainings.length - 1) {
            setExerciseIndex(prev => prev + 1);
            setTimeLeft(trainings[exerciseIndex + 1].duration * 60);
        } else {
            setIsRunning(false);
            setMessage("✔️ ¡Rutina completada!");
        }
    };

    const handleToggleTimer = () => {
        setIsRunning(prev => !prev);
    };

    const handleWorkDone = () => {
        setIsRunning(false);
        setMessage("");
        navigate("/dashboard/statisticsscreen");
    };

    const handleBack = () => {
        navigate("/landingpageoverview");
    };

    return (
        <div className="routine-page-container">
            {trainings.length > 0 && (
                <div className="routine-details">
                    <p>{isResting ? "DESCANSO" : trainings[exerciseIndex].name}</p>
                </div>
            )}
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
                                        strokeDashoffset: (1 - timeLeft / (isResting ? 40 : trainings[exerciseIndex]?.duration * 60)) * 251
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
