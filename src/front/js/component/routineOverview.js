import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import "../../styles/routineOverview.css";
import Timer from "./timer";

const RoutineOverview = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  // Timer
  const [trainings, setTrainings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [isResting, setIsResting] = useState(false);
  
  const REST_PERIOD = 10;

  // SoundCloud

  const genres = { 
    running: "running", 
    workout: "workout", 
    walking: "walking", 
    relax: "relax"
  };

  const [genre, setGenre] = useState(""); 
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const genres = ["running", "workout", "walking", "relax"];
  const [playlists, setPlaylists] = useState({ running: [], workout: [], walking: [], relax: [] });
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentTrackData, setCurrentTrackData] = useState(null);
  const playerRef = useRef(null);


  const clientId = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SOUNDCLOUD_CLIENT_SECRET;

  // Asignar género según la rutina recibida
  useEffect(() => {
    const fetchRoutine = async () => {
      try {
        const routine = await actions.getRoutine(); 
        if (routine) {
          if (routine.category in genres) {
            setGenre(genres[routine.category]);
          } else {
            setGenre("workout"); 
          }
        }
      } catch (error) {
        console.error("❌ Error al obtener la rutina:", error);
      }
    };
    fetchRoutine();
  }, [actions]);

  const loadSoundCloudAPI = () => {
    if (typeof window.SC === "undefined") {
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => console.log("✅ API de SoundCloud cargada.");
      script.onerror = () => console.log("❌ Error al cargar SoundCloud");
      document.body.appendChild(script);
    }
  };

  useEffect(() => {
    loadSoundCloudAPI();
  }, []);

  const waitForSoundCloudAPI = (callback) => {
    let attempts = 0;
    const maxAttempts = 50;

    const interval = setInterval(() => {
      console.log(`Intento ${attempts + 1}: Verificando API de SoundCloud...`);
      if (typeof window.SC !== "undefined") {
        clearInterval(interval);
        console.log("✅ API de SoundCloud está lista.");
        callback();
      }
      attempts++;
      if (attempts >= maxAttempts) {
        clearInterval(interval);
        console.error("❌ No se pudo cargar la API de SoundCloud.");
      }
    }, 100);
  };

  const getAccessToken = async () => {
     //TODO:PREGUNTAR A HANS COMO CONTROLO SI EL TOKEN HA EXPIRADO O NO
    localStorage.removeItem("soundcloud_token");
    const storedToken = localStorage.getItem("soundcloud_token");
    if (storedToken) {
      setAccessToken(storedToken);
      return;
    }

    try {
      const response = await fetch("https://api.soundcloud.com/oauth2/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: clientId,
          client_secret: clientSecret,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        localStorage.setItem("soundcloud_token", data.access_token);
        setAccessToken(data.access_token);
      } else {
        console.error("❌ Error obteniendo el token:", data);
      }
    } catch (error) {
      console.error("❌ Error al autenticar con OAuth:", error);
    }
  };

  const getTracks = async () => {
    if (!accessToken || tracks.length > 0 || !genre) return;


  const getPlaylist = async (genre) => {
    try {
      const response = await fetch(`/playlists/${genre}`);
      const data = await response.json();
      if (data.playlist) {

        setTracks(data.playlist.tracks);
      } else {
        console.error(`⚠️ No se obtuvo lista de reproducción para ${genre}`);
        setTracks([]);
      }
    } catch (error) {
      console.error("❌ Error fetching playlist: ", error);
      setTracks([]);

    }
  };

  useEffect(() => {
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken && genre) {
      getTracks();
    }
  }, [accessToken, genre]);

  useEffect(() => {
    if (tracks.length > 0) {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      setCurrentTrackUrl(randomTrack.stream_url);
    }
  }, [tracks]);

  useEffect(() => {
    if (currentTrackUrl) {
      waitForSoundCloudAPI(() => {
        const iframe = document.getElementById("soundcloud-player");
        if (iframe) {
          playerRef.current = window.SC.Widget(iframe);
          playerRef.current.load(currentTrackUrl, { auto_play: false });

          playerRef.current.bind(window.SC.Widget.Events.READY, () => {
            console.log("🎵 Reproductor listo");
            setIsPlayerReady(true);
          });

          playerRef.current.bind(window.SC.Widget.Events.ERROR, (e) => {
            console.error("❌ Error en el reproductor de SoundCloud", e);
          });
        }
      });
    }
  }, [currentTrackUrl]);

  const startPlaying = () => {
    if (isPlayerReady && playerRef.current) {
      playerRef.current.play();
    }
  };

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        console.log("Solicitando entrenamientos..."); 
        
        const data = await actions.getTrainings();
        
        if (!data || data.length === 0) {
          console.warn("⚠️ No se recibieron entrenamientos o la lista está vacía.", data);
          return;
        }

      } catch (error) {
        console.error("❌ Error:", error.message);

      }
    };
  
    fetchTrainings();
  }, []);

  return (
    <div className="routine-page-container">
      <div className="routine-details">
        {message && <p className="timer-message">{message}</p>}
      </div>
      <div className="bottom-container">
        <div className="music-timer-wrapper">
          <div className="soundcloud-player">
            {currentTrackUrl && (

              <iframe
                id="soundcloud-player"
                width="100%"
                height="166"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(currentTrackUrl)}&auto_play=true`}
              />
            )}
          </div>
          <div className="timer-buttons-container">
            <Timer timeLeft={timeLeft} />
            <button className="start-timer-button" onClick={startPlaying}>
              ▶️
            </button>

          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineOverview;