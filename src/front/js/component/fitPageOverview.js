import React, { useState, useEffect } from "react";
import "../../styles/fitPageOverview.css";
import KhransAvatar from "../../img/Khrans-avatar.webp";
import { getAccessToken } from "./get_spotify_token";

const FitPageOverview = () => {
    const [motivationalPhrase, setMotivationalPhrase] = useState("Today is a great day to make progress!");
    const [todayDate, setTodayDate] = useState(""); 
    const [clientName, setClientName] = useState("Cristian Gabri Marcos");
    const [currentTrack, setCurrentTrack] = useState(null);

    useEffect(() => {
        const today = new Date().toLocaleDateString();
        setTodayDate(today);
    }, []);

    useEffect(() => {
        const fetchSpotifyData = async () => {
            const accessToken = await getAccessToken(); 

            if (!accessToken) {
                console.error("⚠️ ERROR: No se pudo obtener el token de Spotify.");
                return;
            }

            fetch("https://api.spotify.com/v1/playlists/37i9dQZF1DWUVpAXiEPK8P/tracks", {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`❌ Error en la petición: ${response.status} - ${response.statusText}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("✅ Datos de Spotify recibidos:", data);
                if (data.items && data.items.length > 0) {
                    const firstTrack = data.items[0].track;
                    setCurrentTrack({
                        name: firstTrack.name,
                        artist: firstTrack.artists.map(artist => artist.name).join(", "),
                        image: firstTrack.album.images[0]?.url || "",
                        preview_url: firstTrack.preview_url
                    });
                }
            })
            .catch(error => console.error("❌ Error al obtener datos de Spotify:", error));
        };

        fetchSpotifyData();
    }, []);

    return (
        <div className="fit-page-container">
            <div className="avatar-profile">
                <h2 className="animated-name">{clientName}</h2>
                <img src={KhransAvatar} alt="Khrans Avatar" className="khrans-image" />
            </div>
            <div className="motivational-phrase">
                <p><b>{motivationalPhrase}</b></p>
            </div>
            <div className="calendar-avatar-container">
                <div className="calendar">
                    <h3>Weekly Calendar</h3>
                    <ul>
                        <li>{todayDate}</li> 
                    </ul>
                </div>
                <div className="avatar-emotions">
                    <img src={KhransAvatar} alt="Avatar" className="avatar-image" />
                    <p>Avatar with various emotions...</p>
                    <button className="statistics-button">STATISTICS</button>
                </div>
            </div>
            <div className="bottom-container">
                <div className="spotify-api">
                    {currentTrack ? (
                        <div className="spotify-player">
                            <img src={currentTrack.image} alt={currentTrack.name} className="track-image" />
                            <h4>{currentTrack.name}</h4>
                            <p>{currentTrack.artist}</p>
                            {currentTrack.preview_url ? (
                                <audio controls>
                                    <source src={currentTrack.preview_url} type="audio/mpeg" />
                                    Tu navegador no soporta el audio de Spotify.
                                </audio>
                            ) : (
                                <p>No hay vista previa disponible</p>
                            )}
                        </div>
                    ) : (
                        <p>Cargando canción...</p>
                    )}
                </div>
                <div className="exercise-table">
                    <button className="start-routine-button">Start Routine</button>
                </div>
            </div>
        </div>
    );
};

export default FitPageOverview;