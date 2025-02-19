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
  const genres = ["running", "workout", "walking", "relax"];
  const [playlists, setPlaylists] = useState({ running: [], workout: [], walking: [], relax: [] });
  const [currentTrackUrl, setCurrentTrackUrl] = useState("");
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [currentTrackData, setCurrentTrackData] = useState(null);
  const playerRef = useRef(null);

  useEffect(() => {
    // Suponemos que el género se establece desde el backend basado en la rutina
    const determineGenreFromRoutine = async () => {
      const routine = await actions.getRoutine(); // Obtén la rutina desde el backend
      if (routine.category === "running") {
        setSelectedGenre("running");
      } else if (routine.category === "workout") {
        setSelectedGenre("workout");
      } else if (routine.category === "walking") {
        setSelectedGenre("walking");
      } else if (routine.category === "relax") {
        setSelectedGenre("relax");
      }
    };

    determineGenreFromRoutine();
  }, [actions]);

  const getPlaylist = async (genre) => {
    try {
      const response = await fetch(`/playlists/${genre}`);
      const data = await response.json();
      if (data.playlist) {
        setPlaylists((prevPlaylists) => ({ ...prevPlaylists, [genre]: data.playlist.tracks }));
      } else {
        console.error(`Error: No se obtuvo una lista de reproducción para el género ${genre}`, data);
        setPlaylists((prevPlaylists) => ({ ...prevPlaylists, [genre]: [] }));
      }
    } catch (error) {
      console.error("Error fetching playlist: ", error);
      setPlaylists((prevPlaylists) => ({ ...prevPlaylists, [genre]: [] }));
    }
  };

  useEffect(() => {
    if (selectedGenre) {
      getPlaylist(selectedGenre);
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (playlists[selectedGenre] && playlists[selectedGenre].length > 0) {
      const randomTrack = playlists[selectedGenre][Math.floor(Math.random() * playlists[selectedGenre].length)];
      setCurrentTrackUrl(randomTrack.stream_url);
      setCurrentTrackData(randomTrack);
    }
  }, [playlists, selectedGenre]);

  useEffect(() => {
    if (currentTrackUrl) {
      console.log("Esperando que la API de SoundCloud esté lista...");
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

  // Métodos Timer
  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        console.log("Solicitando entrenamientos..."); 
        
        const data = await actions.getTrainings();
        
        if (!data || data.length === 0) {
          console.warn("⚠️ No se recibieron entrenamientos o la lista está vacía.", data);
          return;
        }
  
        console.log("✅ Entrenamientos obtenidos correctamente:", data);
  
        setTrainings(data);
        setCurrentIndex(0);
        setTimeLeft(parseInt(data[0].duration, 10));
        setMessage(data[0].name);
        
      } catch (error) {
        console.error("❌ Error al obtener entrenamientos:", error.message);
      }
    };
  
    fetchTrainings();
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
      if (currentIndex + 1 < trainings.length) {
        setCurrentIndex((prev) => prev + 1);
        setTimeLeft(parseInt(trainings[currentIndex + 1].duration, 10));
        setIsResting(false);
        setMessage(trainings[currentIndex + 1].name);
      } else {
        setIsRunning(false);
        setMessage("✔️ ¡Rutina completada!");
      }
    } else {
      setIsResting(true);
      setTimeLeft(REST_PERIOD);
      setMessage(`🛑 Descanso...`);
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
      <div className="routine-details">
        {message && <p className="timer-message">{message}</p>}
      </div>
      <div className="bottom-container">
        <div className="music-timer-wrapper">
          <div className="soundcloud-player">
            {currentTrackUrl && (
              <div>
                <iframe
                  id="soundcloud-player"
                  width="100%"
                  height="166"
                  scrolling="no"
                  frameBorder="no"
                  allow="autoplay"
                  src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(
                    currentTrackUrl
                  )}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
                  onLoad={() => console.log("Iframe cargado con éxito")}
                />
                <div className="track-info">
                  <p>Track: {currentTrackData?.title}</p>
                  <p>Artist: {currentTrackData?.user?.username}</p>
                  <p>
                    <a href={currentTrackData?.permalink_url} target="_blank" rel="noopener noreferrer">
                      View on SoundCloud
                    </a>
                  </p>
                </div>
              </div>
            )}
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