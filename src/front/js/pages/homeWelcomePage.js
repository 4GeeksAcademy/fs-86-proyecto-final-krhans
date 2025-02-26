import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { dispatcherUser } from "../store/dispatcher.js";
import { Loader } from "../component/loader.js";

export const HomeWelcomePage = () => {
    const { store, actions } = useContext(Context);
    const [videoUrls, setVideoUrls] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
    const [visibleAvatars, setVisibleAvatars] = useState([]);

    const videoIds = [
        "323171701139328",
        "324358958924032",
        "324358873712576",
        "324358804794560",
        "324358727048384", 
        "324358561612224"
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            const videoRequests = videoIds.map(async (videoId) => {
                const result = await dispatcherUser.fetchVideoUrl(videoId);
                return result.url || null;
            });

            const urls = await Promise.all(videoRequests);
            const validUrls = urls.filter(url => url !== null);
            console.log("Videos Cargados", validUrls);
            setVideoUrls(urls.filter(url => url !== null));
            setVisibleAvatars(new Array(validUrls.length - 1).fill(false));
        };

        fetchVideos();
    }, []);

    useEffect(() => {
        if (videoUrls.length <= 1) return;
        const interval = setInterval(() => {
            setVisibleAvatars(prev => {
                const newVisibility = prev.map(() => Math.random() > 0.2);
                return newVisibility;
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [videoUrls]);

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadData();

        const welcomeTimer = setTimeout(() => setShowWelcome(true), 2000);
        const helpTimer = setTimeout(() => {
            setShowWelcome(false);
            setShowHelp(true);
        }, 3500);

        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(helpTimer);
        };
    }, []);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className="home-container">
            <div className="messages-container">
                {showWelcome && <h1 className="welcome-message">¡Welcome to Khrans!</h1>}
                {showHelp && <h2 className="help-message">¿How can I help you?</h2>}
            </div>
            <div className="avatar-container">
                <video src={videoUrls[0]} className="khransHome-video" autoPlay muted />
            </div>

            <div className="background-avatars">
                {videoUrls.slice(1).map((url, index) => (
                    <video
                        key={index}
                        src={url}
                        className={`floating-avatar avatar-${index} ${visibleAvatars[index] ? "visible" : "hidden"}`}
                        autoPlay
                        muted
                        loop
                    />
                ))}
            </div>
        </div>
    );
};