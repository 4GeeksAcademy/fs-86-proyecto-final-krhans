import React, { useState, useEffect } from "react";
import "../../styles/fitPageOverview.css";
import KhransAvatar from "../../img/Khrans-avatar.webp";

const FitPageOverview = () => {
    const [motivationalPhrase, setMotivationalPhrase] = useState("Today is a great day to make progress!");
    const [todayDate, setTodayDate] = useState(""); 
    const [clientName, setClientName] = useState("Cristian Gabri Marcos");

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setTodayDate(today);
    }, []);

    return (
        <div className="fit-page-container">
            <div className="avatar-profile">
                <h2 className="animated-name">{clientName}</h2>
                <img src={KhransAvatar} alt="Khrans Avatar" className="khrans-image" />
            </div>
            <div className="motivational-phrase">
                <p><b>{motivationalPhrase}</b></p>
            </div>
            <div className="calendar-avatar-container">
                <div className="calendar">
                    <h3>Weekly Calendar</h3>
                    <ul>
                        <li>{todayDate}</li> 
                    </ul>
                </div>
                <div className="avatar-emotions">
                    <img src={KhransAvatar} alt="Avatar" className="avatar-image" />
                    <p>Avatar with various emotions...</p>
                    <button className="statistics-button">STATISTICS</button>
                </div>
            </div>
            <div className="bottom-container">
                <div className="spotify-api">
                    <p>Spotify API</p>
                </div>
                <div className="exercise-table">
                    <button className="start-routine-button">Start Routine</button>
                </div>
            </div>
        </div>
    );
};

export default FitPageOverview;
