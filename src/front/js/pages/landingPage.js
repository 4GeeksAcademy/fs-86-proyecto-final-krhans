import React, { useEffect, useState } from "react";
// import FitPageOverview from "../component/fitPageOverview";
import { useNavigate } from "react-router-dom";
import Frases from "../component/motivationalPhrase";
import AvatarEmotions from "../component/avatarEmotion";
import Calendar from "../component/calendar";
import StartRoutineButton from "../component/startRoutine";
import '../../styles/landingPageOverview.css'
import RoutineOverview from "../component/routineOverview.js";
import { dispatcherUser } from "../store/dispatcher.js";

const LandingPage = () => {
    const navigate = useNavigate();
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const today = new Date();
    const monthName = today.toLocaleString('en-US', { month: 'long' });
    const formattedMonthName = monthName.charAt(0).toUpperCase() + monthName.slice(1);
    const [showPlayer, setShowPlayer] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const videoId = "322634554020544";

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };

        fetchVideo();
    }, [videoId]);

    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const day = new Date();
        day.setDate(today.getDate() - today.getDay() + i + 1);
        return {
            name: daysOfWeek[i],
            date: day.getDate(),
        };
    });

    const statistics = () => {
       navigate("/dashboard/statisticsscreen");
    }
    const routineTable = () => {
        navigate("/dashboard/routine");
    }
    const handleRedoInterview = () => {
        navigate("/dashboard");
    };

    return (
        <div className="fit-page-container">
            <div className="motivational-phrase"><Frases /></div>
            <div className="calendar-avatar-container">
                <Calendar monthName={monthName} currentWeek={currentWeek} />
                <AvatarEmotions avatarSrc={videoUrl} onStatisticsClick={statistics} />
            </div>
            <div className="bottom-container">
                <StartRoutineButton onClick={routineTable} />
                <button className="interview-button" onClick={handleRedoInterview}>Redo Interview</button>
            </div>
            
        </div>
    );
}

export default LandingPage;
