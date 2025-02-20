import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext"; 
import "../../styles/routineOverview.css";
import Timer from "./timer";

const RoutineOverview = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);

  //Timer
  const [trainings, setTrainings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [isResting, setIsResting] = useState(false);

  const REST_PERIOD = 10;

  //SoundCloud
  const [genre, setGenre] = useState("jazz");
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState("");
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerRef = useRef(null);

  const clientId = process.env.REACT_APP_SOUNDCLOUD_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SOUNDCLOUD_CLIENT_SECRET;

  const isSoundCloudAPIAvailable = () => typeof window.SC !== "undefined";

  //Metodos SoundCloud
  const loadSoundCloudAPI = () => {
    if (!isSoundCloudAPIAvailable()) {
      const script = document.createElement("script");
      script.src = "https://w.soundcloud.com/player/api.js";
      script.async = true;
      script.onload = () => console.log("API de SoundCloud cargada.");
      script.onerror = () => console.log("Error al cargar la API de SoundCloud");
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
        console.error("❌ Error: No se pudo cargar la API de SoundCloud en el tiempo esperado.");
      }
    }, 100);
  };



  useEffect(() => {
    const getAccessToken=async ()=>{
      const token=await actions.getSoundCloudAccessToken()
      setAccessToken(token)
    }
    getAccessToken();
  }, []);

  useEffect(() => {
    if (accessToken) {
        const getTracksByGenre = async () => {
            const tracks = await actions.getSoundCloudTracksByGenre(genre);
            setTracks(tracks);
        };
        getTracksByGenre();
    }
}, [accessToken]); 



  useEffect(() => {
    if (tracks.length > 0) {
      const randomTrack = tracks[Math.floor(Math.random() * tracks.length)];
      setCurrentTrackUrl(randomTrack.permalink_url);
      console.log("URL de la canción seleccionada:", randomTrack.permalink_url);
    }
  }, [tracks]);


  useEffect(() => {
    if (currentTrackUrl) {
      console.log("Esperando que la API de SoundCloud esté lista...");
      waitForSoundCloudAPI(() => {
        const iframe = document.getElementById("soundcloud-player");
        if (iframe) {
          playerRef.current = window.SC.Widget(iframe);
          playerRef.current.load(currentTrackUrl, { auto_play: false });

          playerRef.current.bind(window.SC.Widget.Events.READY, () => {
            console.log("Reproductor listo");
            setIsPlayerReady(true);
          });

          playerRef.current.bind(window.SC.Widget.Events.ERROR, (e) => {
            console.error("Error en el reproductor de SoundCloud", e);
          });
        } else {
          console.error("Iframe no encontrado");
        }
      });
    }
  }, [currentTrackUrl]);

  const startPlaying = () => {
    if (isPlayerReady && playerRef.current) {
      console.log("Reproduciendo la canción...");
      playerRef.current.play();
    } else {
      console.error("Reproductor no disponible");
    }
  };



  //Metodos Timer
  useEffect(() => {
    const getTrainings = async () => {
      try {
        const data = await actions.getTrainings();
        if (data.length > 0) {
          setTrainings(data);
          setCurrentIndex(0);
          setTimeLeft(parseInt(data[0].duration, 10));
          setMessage(data[0].name);
        }
      } catch (error) {
        console.log("Error: ", error.message);
      }
    };

    getTrainings();
  }, []);

  useEffect(() => {
    let timer;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      clearInterval(timer);
      handleNextStep();
    }

    return () => clearInterval(timer);
  }, [isRunning, timeLeft]);

  const handleNextStep = () => {
    if (isResting) {
      // Si estamos descansando y no hemos completado todos los entrenamientos
      if (currentIndex + 1 < trainings.length) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(parseInt(trainings[currentIndex + 1].duration, 10));
        setIsResting(false);
        setMessage(trainings[currentIndex + 1].name);
      } else {
        setIsRunning(false);
        setMessage("✔️ ¡DO IT!");
      }
    } else {

      setIsResting(true);
      setTimeLeft(REST_PERIOD);
      setMessage(`🛑 Interval...`);
    }
  };

  const handleToggleTimer = () => {
    setIsRunning((prev) => {
      const newIsRunning = !prev;
      if (newIsRunning) {

        startPlaying();
      }
      return newIsRunning;
    });
  };


  const handleWorkDone = () => {
    setIsRunning(false);
    setMessage("");
    navigate("/dashboard/statisticsscreen");
  };

  const handleBack = () => {
    navigate("/fitpageoverview");
  };

  return (
    <div className="routine-page-container">
      <div className="soundcloud-player-container">
  <div className="soundcloud-player">
    {currentTrackUrl && (
      <iframe
        id="soundcloud-player"
        width="100%"
        height="100" // Reducimos la altura aquí
        scrolling="no"
        frameBorder="no"
        allow="autoplay"
        src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
          currentTrackUrl
        )}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
        onLoad={() => console.log("Iframe cargado con éxito")}
      />
    )}
  </div>
</div>

  
      {/* Routine Details ahora en la posición inferior */}
      <div className="bottom-container">
        <div className="music-timer-wrapper">
          
            <div className="routine-details">
              {message && <p className="timer-message">{message}</p>}
            </div>
          
  
          <div className="timer-buttons-container">
            <Timer
              timeLeft={timeLeft}
              isResting={isResting}
              trainings={trainings}
              currentIndex={currentIndex}
              handleToggleTimer={handleToggleTimer}
            />
  
            <div className="buttons-container">
              <button className="start-timer-button" onClick={handleToggleTimer}>
                {isRunning ? "❚❚" : "▶️"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default RoutineOverview;
