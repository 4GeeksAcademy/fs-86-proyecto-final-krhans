import React, { useState, useEffect } from 'react'; 
import '../../styles/statisticsScreen.css';
import { dispatcherUser } from "../store/dispatcher.js";

const StatisticsScreen = () => {
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
                <div className="progress-chart">
                    <h3>Weekly Progress</h3>
                    
                </div>
                <div className="exercise-info">
                    <h3>Featured Exercise</h3>
                    <div className="exercise-graph">
                       
                    </div>
                    <div className={`exercise-stats ${showStats ? 'show' : ''}`}>
                        <div className="stat-item">
                            <h4>Percentage</h4>
                            <div className="stat-value">80%</div>
                        </div>
                        <div className="stat-item">
                            <h4>Level</h4>
                            <div className="stat-value">Advanced</div>
                        </div>
                        <div className="stat-item">
                            <h4>Pending</h4>
                            <div className="stat-value">15%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsScreen;

