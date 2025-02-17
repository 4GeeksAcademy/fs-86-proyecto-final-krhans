import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext.js";
import "../../styles/home.css";
import KhransAvatar from "../../img/Khrans-avatar.webp";
import { Loader } from "../component/loader.js";


export const HomeWelcomePage = () => {
    const { store, actions } = useContext(Context);
    const [videoUrl, setVideoUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showWelcome, setShowWelcome] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        const fetchVideoUrl = async () => {
            try {
                const apiKey = "sk-e2f5fccd94ede4b8b0920f640ecdf3bd";
                
                const jwtToken = localStorage.getItem("jwt-token"); 
                if (!jwtToken) {
                    console.error("No hay token disponible, el usuario no está autenticado.");
                    return;
                }
    
                const videoId = "322634554020544";

                const myHeaders = new Headers();
                myHeaders.append("API-KEY", apiKey);
                myHeaders.append("Authorization", `Bearer ${jwtToken}`);
                myHeaders.append("Content-Type", "application/json");
    
                const requestOptions = {
                    method: "GET",
                    headers: myHeaders,
                    mode: "cors",
                    redirect: "follow"
                };
    
                const response = await fetch(`https://app-api.pixverse.ai/openapi/v2/video/result/${videoId}`, requestOptions);
    
                if (!response.ok) {
                    throw new Error(`Error HTTP: ${response.status}`);
                }
    
                const data = await response.json();
                console.log("Respuesta de la API:", data);

                if (data && data.Resp && data.Resp.url) {
                    const decodedUrl = decodeURIComponent(data.Resp.url);
            
                    localStorage.setItem("khransVideoUrl", decodedUrl);
                    
                    setVideoUrl(decodedUrl);
                } else {
                    console.error("La API no devolvió una URL de video válida.");
                    setVideoUrl(null);
                }
            } catch (error) {
                console.error("Error al obtener el video:", error);
            }
        };

        fetchVideoUrl();
        
    }, []);

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
                {showWelcome && <h1 className="welcome-message">¡Bienvenido a Khrans!</h1>}
                {showHelp && <h2 className="help-message">¿En qué te puedo ayudar?</h2>}
            </div>
            <div className="avatar-container">
                <video src={videoUrl} className="khrans-video" autoPlay loop muted />
            </div>

        </div>
    );
};
