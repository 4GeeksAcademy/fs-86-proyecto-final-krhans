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
    const [videoUrls, setVideoUrls] = useState({});
    const [videoUrl, setVideoUrl] = useState(null);
    const [motivationalPhrase, setMotivationalPhrase] = useState(""); 

    const videoIds = {
        beginner: "324499025909376",
        intermediate: "322909542675840",
        advanced: "324498284724544"
    };

    useEffect(() => {
        const fetchVideos = async () => {
            const videoRequests = Object.entries(videoIds).map(async ([level, videoId]) => {
                const result = await dispatcherUser.fetchVideoUrl(videoId);
                return { level, url: result.url || null };
            });

            const videos = await Promise.all(videoRequests);
            const videoMap = videos.reduce((acc, { level, url }) => {
                acc[level] = url;
                return acc;
            }, {});

            setVideoUrls(videoMap);
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowStats(true);
        }, 2000); 
    }, []);

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

    const getRandomPhrase = (level) => {
        const levelPhrases = phrases[level];
        return levelPhrases[Math.floor(Math.random() * levelPhrases.length)];
    };

    useEffect(() => {
        let level = "beginner"; 

        if (dailyProgress > 40) {
            level = "advanced";
        } else if (dailyProgress > 20) {
            level = "intermediate";
        }

        setMotivationalPhrase(getRandomPhrase(level)); 
        setVideoUrl(videoUrls[level]); 
    }, [dailyProgress, videoUrls]); 

    return (
        <div className="statistics-container">
            <div className="motivational-phrase">
                <h2>{motivationalPhrase}</h2>
                {videoUrl && <video src={videoUrl} className="khrans-video" autoPlay loop muted />}
            </div>

            <div className="progress-container">
                <DailyProgress routine={store.userData.routines[0]} onDailyProgressUpdate={setDailyProgress} />
                <WeeklyProgress routine={store.userData.routines[0]} dailyProgress={dailyProgress} />
            </div>
        </div>
    );
};

export default StatisticsScreen;