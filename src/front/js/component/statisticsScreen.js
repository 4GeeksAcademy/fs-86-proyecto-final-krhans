import React, { useState, useEffect, useContext } from 'react'; 
import { Context } from "../store/appContext";
import '../../styles/statisticsScreen.css';
import { dispatcherUser } from "../store/dispatcher.js";
import DailyProgress from './dailyProgres';
import WeeklyProgress from './weeklyProgress';

const StatisticsScreen = () => {
    const { store } = useContext(Context);
    const [dailyProgress, setDailyProgress] = useState(0);
    const [showStats, setShowStats] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);
    const [motivationalPhrase, setMotivationalPhrase] = useState("");

    const videoId = "322909542675840";

    const phrases = {
        beginner: [
            "You can do it, this is just the beginning!",
            "Step by step, you'll go far.",
            "The important thing is not to give up."
        ],
        intermediate: [
            "Don't stop now! Today's effort is tomorrow's victory.",
            "You have the strength to achieve it, just keep pushing.",
            "When you believe in yourself, nothing is impossible."
        ],
        advanced: [
            "You have no limits! Your mind and body are powerful.",
            "If you've come this far, you can go even further.",
            "Discipline has brought you here, and it will take you to the top!"
        ]
    };

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };
        fetchVideo();
    }, [videoId]);

    useEffect(() => {
        setTimeout(() => {
            setShowStats(true);
        }, 2000); 
    }, []);

    useEffect(() => {
        let level;
        if (dailyProgress < 20) {
            level = "beginner";
        } else if (dailyProgress < 40) {
            level = "intermediate";
        } else {
            level = "advanced";
        }

        const randomPhrase = phrases[level][Math.floor(Math.random() * phrases[level].length)];
        setMotivationalPhrase(randomPhrase);
    }, [dailyProgress]); 

    return (
        <div className="statistics-container">
            <div className="motivational-phrase">
                <h2>{motivationalPhrase}</h2>
                <video src={videoUrl} className="khrans-video" autoPlay loop muted />
            </div>

            <div className="progress-container">
                <DailyProgress routine={store.userData.routines[0]} onDailyProgressUpdate={setDailyProgress} />
                <WeeklyProgress routine={store.userData.routines[0]} dailyProgress={dailyProgress} />
            </div>
        </div>
    );
};

export default StatisticsScreen;

