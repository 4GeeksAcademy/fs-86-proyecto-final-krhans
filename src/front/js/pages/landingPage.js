import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frases from "../component/motivationalPhrase";
import AvatarEmotions from "../component/avatarEmotion";
import Calendar from "../component/calendar";
import StartRoutineButton from "../component/startRoutine";
import '../../styles/landingPageOverview.css'
import { dispatcherUser } from "../store/dispatcher.js";

const LandingPage = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState(null);
    const videoId = "322634554020544";
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };

        fetchVideo();
    }, [videoId]);

    const today = new Date();

    const monthName = today.toLocaleString('en-US', { month: 'long' });
    const formattedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    
    const currentMonth = today instanceof Date && !isNaN(today) 
        ? today.toLocaleString('en-US', { month: 'long' }) 
        : "Unknown Month";

    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() - today.getDay() + i + 1);
        return {
            name: date.toLocaleString('en-US', { weekday: 'long' }),
            date: date.getDate()
        };
    });

    const handleDateClick = (day) => {
        setSelectedDate(day);
    };

    const statistics = () => {
        navigate("/dashboard/statisticsscreen")
    }
    const routineTable = () => {
        navigate("/dashboard/routine");
    }
    const handleRedoInterview = () => {
        navigate("/dashboard");
    };

    return (
        <div className="landing-container">
            <div className="calendar-container">
            <Calendar monthName={currentMonth} currentWeek={currentWeek} onDateClick={handleDateClick} />
            </div>
    
            <div className="routine-section">
                {selectedDate ? (
                    <>
                        <h3 className="selected-day-title">{selectedDate.name}</h3>
                        <ul className="routine-list">
                            <li>Ejercicio 1</li>
                            <li>Ejercicio 2</li>
                            <li>Ejercicio 3</li>
                            <li>Ejercicio 4</li>
                            <li>Ejercicio 5</li>
                        </ul>
                    </>
                ) : (
                    <div className="no-day-container">
                        <div className="arrow-to-calendar">⬆️</div>
                        <h3 className="no-day-selected">Selecciona un día para ver la rutina</h3>
                    </div>
                )}
            </div>
    
            <div className="main-content">
                <StartRoutineButton onClick={routineTable} className="routine-button" />
            </div>
    
            <div className="bottom-section">
                <div className="avatar-motivation"><Frases /></div>
                <div className="bottom-buttons">
                    <button className="interview-button" onClick={handleRedoInterview}>Redo Interview</button>
                    <AvatarEmotions avatarSrc={videoUrl} />
                    <button className="statistics-button" onClick={statistics}>STATISTICS</button>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
