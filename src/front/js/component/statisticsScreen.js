import React, { useState, useEffect } from 'react'; 
import '../../styles/statisticsScreen.css';
import KhransAvatar from "../../img/Khrans-avatar.webp";

const StatisticsScreen = () => {
    const [showStats, setShowStats] = useState(false);
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
            const fetchVideoUrl = async () => {
                try {
                    const apiKey = "sk-e2f5fccd94ede4b8b0920f640ecdf3bd";
                    
                    const jwtToken = localStorage.getItem("jwt-token"); 
                    if (!jwtToken) {
                        console.error("No hay token disponible, el usuario no está autenticado.");
                        return;
                    }
        
                    const videoId = "322635580604544";
    
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
        setTimeout(() => {
            setShowStats(true);
        }, 2000); 
    }, []);

    return (
        <div className="statistics-container">
            <div className="motivational-phrase">
                <h2>Sigue así, ¡tú puedes!</h2>
                {videoUrl ? (
                    <video src={videoUrl} className="khrans-video" autoPlay loop muted />
                ) : (
                    <img src={KhransAvatar} alt="Khrans Avatar" className="avatar-image" />
                )}
            </div>
            <div className="progress-container">
                <div className="progress-chart">
                    <h3>Progreso Semanal</h3>
                    
                </div>
                <div className="exercise-info">
                    <h3>Ejercicio Destacado</h3>
                    <div className="exercise-graph">
                       
                    </div>
                    <div className={`exercise-stats ${showStats ? 'show' : ''}`}>
                        <div className="stat-item">
                            <h4>Porcentaje</h4>
                            <div className="stat-value">80%</div>
                        </div>
                        <div className="stat-item">
                            <h4>Nivel</h4>
                            <div className="stat-value">Avanzado</div>
                        </div>
                        <div className="stat-item">
                            <h4>Pendiente</h4>
                            <div className="stat-value">15%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsScreen;

