import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/secretVideo.css";
import { dispatcherUser } from "../store/dispatcher.js";

const SecretVideo = () => {
    const navigate = useNavigate();
    const [videoUrls, setVideoUrls] = useState([]);
    const [showMainVideo, setShowMainVideo] = useState(false); 

    const videosId = [
        "324147292010496", 
        "324498446532672", 
        "324498555911552",
        "324498702043200",
        "324498810766528" 
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            const videoRequests = videosId.map(async (videoId) => {
                const result = await dispatcherUser.fetchVideoUrl(videoId);
                return result.url || null;
            });

            const urls = await Promise.all(videoRequests);
            setVideoUrls(urls);
        };

        fetchVideos();

        const timer = setTimeout(() => {
            setShowMainVideo(true);
        }, 6000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="secret-video-container">
            <h1>STOP LETTING THE DAYS PASS AND TRAIN!!</h1>

            {!showMainVideo ? (
                <div className="video-grid">
                    {videoUrls.slice(1, 5).map((url, index) => (
                        <video key={index} src={url} className="grid-video" autoPlay loop muted />
                    ))}
                </div>
            ) : (
                <div className="main-video-overlay">
                    <video src={videoUrls[0]} className="hans-video" autoPlay loop muted />
                </div>
            )}
            <button onClick={() => navigate("/dashboard/landing")} className="back-button">Back</button>
        </div>
    );
};

export default SecretVideo;