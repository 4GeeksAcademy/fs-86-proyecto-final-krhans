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
    const videoId = "322909542675840";

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
    

    return (
        <div className="statistics-container">
            <div className="motivational-phrase">
                <h2>Keep it up, you can do it!</h2>
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

