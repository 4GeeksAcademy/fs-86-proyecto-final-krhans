import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import { dispatcherUser } from "../store/dispatcher.js";
import { Loader } from "../component/loader.js";


export const HomeWelcomePage = () => {
    const { store, actions } = useContext(Context);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showHelp, setShowHelp] = useState(false);
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

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadData();

        const welcomeTimer = setTimeout(() => {
            setShowWelcome(true);
        }, 4000);

        const helpTimer = setTimeout(() => {
            setShowWelcome(false);
            setShowHelp(true);
        }, 6000);

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
                <video src={videoUrl} className="khrans-video" autoPlay loop muted />
            </div>

        </div>
    );
};
