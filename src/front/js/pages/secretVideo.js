import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/secretVideo.css";
import { dispatcherUser } from "../store/dispatcher.js";

const SecretVideo = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState(null);

    const videoId = "324147292010496";

    useEffect(() => {
            const fetchVideo = async () => {
                const result = await dispatcherUser.fetchVideoUrl(videoId);
                if (result.url) {
                    setVideoUrl(result.url);
                }
            };
    
            fetchVideo();
        }, [videoId]);
    
    return (
        <div className="secret-video-container">
            <h1>STOP LETTING THE DAYS PASS AND TRAIN!!</h1>
            <video src={videoUrl} className="hans-video" autoPlay loop muted />
            <button onClick={() => navigate("/dashboard/landing")} className="back-button">Back</button>
        </div>
    );
};

export default SecretVideo;