import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/routineOverview.css";
import { dispatcherUser } from "../store/dispatcher.js";
import Timer from "./timer";

const RoutineOverview = () => {
  const navigate = useNavigate();
  const { actions } = useContext(Context);
  const location = useLocation();
  const { day, workout } = location.state || {};
  const [trainings, setTrainings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [videoUrl, setVideoUrl] = useState(null);
  const [showAvatar, setShowAvatar] = useState(false);
  const [timerState, setTimerState] = useState({
    timeLeft: 0,
    isRunning: false,
    message: "Rest Day",
    isResting: false,
  });

  const REST_PERIOD = 10;
  const [soundCloudState, setSoundCloudState] = useState({
    genre: "jazz",
    tracks: [],
    accessToken: "",
    currentTrackUrl: "",
    isPlayerReady: false,
  });

  const playerRef = useRef(null);

  const loadSoundCloudAPI = () => {
    if (typeof window.SC === "undefined") {
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
      if (typeof window.SC !== "undefined") {
        clearInterval(interval);
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
    const getAccessToken = async () => {
      const token = await actions.getSoundCloudAccessToken();
      setSoundCloudState(prev => ({ ...prev, accessToken: token }));
    };
    getAccessToken();
  }, []);

  useEffect(() => {
    const getTracksByGenre = async () => {
      const tracks = await actions.getSoundCloudTracksByGenre(soundCloudState.genre);
      setSoundCloudState(prev => ({ ...prev, tracks }));
    };
    if (soundCloudState.accessToken) getTracksByGenre();
  }, [soundCloudState.accessToken]);

  useEffect(() => {
    if (soundCloudState.tracks.length > 0) {
      const randomTrack = soundCloudState.tracks[Math.floor(Math.random() * soundCloudState.tracks.length)];
      setSoundCloudState(prev => ({ ...prev, currentTrackUrl: randomTrack.permalink_url }));
    }
  }, [soundCloudState.tracks]);

  useEffect(() => {
    if (soundCloudState.currentTrackUrl) {
      waitForSoundCloudAPI(() => {
        const iframe = document.getElementById("soundcloud-player");
        if (iframe) {
          playerRef.current = window.SC.Widget(iframe);
          playerRef.current.load(soundCloudState.currentTrackUrl, { auto_play: false });
          playerRef.current.bind(window.SC.Widget.Events.READY, () => {
            setSoundCloudState(prev => ({ ...prev, isPlayerReady: true }));
          });
        }
      });
    }
  }, [soundCloudState.currentTrackUrl]);

  const startPlaying = () => {
    if (soundCloudState.isPlayerReady && playerRef.current) {
      playerRef.current.play();
    }
  };

  const pausePlaying = () => {
    if (playerRef.current) {
        playerRef.current.pause();
    }
};

  useEffect(() => {
    let timer;
    if (timerState.isRunning && timerState.timeLeft > 0) {
      timer = setInterval(() => {
        setTimerState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
    } else if (timerState.timeLeft === 0) {
      clearInterval(timer);
      setTimerState(prev => ({ ...prev, isRunning: false }));
      setShowAvatar(false);
    }

    return () => clearInterval(timer);
  }, [timerState.isRunning, timerState.timeLeft]);

  const handleToggleTimer = () => {
    setTimerState(prev => {
      const newIsRunning = !prev.isRunning;
      if (newIsRunning) {
        startPlaying();
        setShowAvatar(true);
      }else{
        setShowAvatar(false);
        pausePlaying();
      }
      return { ...prev, isRunning: newIsRunning };
    });
  };

  const handleWorkDone = async () => {
    const trainingData=workout.trainings[currentIndex]
    const updatedTraining=await actions.updateTraining(trainingData)
    console.log("Entrenamiento actualizado: ",updatedTraining)

    //TODO: Hay que modificar el campo is_Active de workout. Cambiarlo a is_Completed 
    
    //Y actualizarlo al porcentaje de todos sus trainings que se han completado. (Esto sacaría la estadística diaria)
    //También habria que crear un campo en routine para hacer lo mismo con la estdística semanal
    setTimerState(prev => ({ ...prev, isRunning: false, message: "" }));
    handleNextTraining();
  };

  const handleNextTraining = () => {
    if (currentIndex < workout.trainings.length - 1) {
      setCurrentIndex(currentIndex + 1);
      getTimeLeft(currentIndex + 1, workout);
    } else {
      alert("¡Routine completed! 🎉");
    }
  };

  const getTimeLeft = (index, workout) => {
    if (!workout || !workout.trainings || !workout.trainings[index]) return;

    const training = workout.trainings[index];
    let trainingTime = 10 //TODO: DEJAR DE COMENTAR:     training.duration || 60;

    setTimerState({
      timeLeft: trainingTime,
      isRunning: false,
      message: training.name || "Rest Day",
      isResting: false,
    });
  };

  useEffect(() => {
    if (workout && workout.trainings) {
      getTimeLeft(currentIndex, workout);
    }
  }, [currentIndex, workout]);

  if (!day || !workout) {
    return <span>There is no routine available for this day.</span>;
  }

  const currentTraining = workout.trainings[currentIndex];

  const videoId = "323665558860352";

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
    <div className="routine-page-container">
      <div className="soundcloud-player-container">
        <div className="soundcloud-player">
          {soundCloudState.currentTrackUrl && (
            <iframe
              id="soundcloud-player"
              width="100%"
              height="100"
              scrolling="no"
              frameBorder="no"
              allow="autoplay"
              src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundCloudState.currentTrackUrl)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
              onLoad={() => console.log("Iframe cargado con éxito")}
            />
          )}
        </div>
      </div>
      {showAvatar && videoUrl && (
        <div className="routineAvatar-container">
          <video src={videoUrl} className="routineOverview-avatar" autoPlay loop muted />
        </div>
      )}

      <div className="bottom-container">

        <div className="music-timer-wrapper">
          <div className="soundcloud-player">
            {soundCloudState.currentTrackUrl && (
              <iframe
                id="soundcloud-player"
                width="100%"
                height="100"
                scrolling="no"
                frameBorder="no"
                allow="autoplay"
                src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(soundCloudState.currentTrackUrl)}&auto_play=true&hide_related=true&show_comments=false&show_user=false&show_reposts=false`}
                onLoad={() => console.log("Iframe cargado con éxito")}
              />
            )}
          </div>
          <div className="routine-details">
            <h3>{currentTraining ? currentTraining.name : "Rest Day"}</h3>
            <p>
              {currentTraining?.repetitions > 0 && (
                <span>Repeticiones: {currentTraining.repetitions}</span>
              )}
            </p>
          </div>

          <div className="timer-buttons-container">
            <Timer
              timeLeft={timerState.timeLeft}
              isResting={timerState.isResting}
              workout={workout}
              currentIndex={currentIndex}
            />
            {timerState.message !== "Rest Day" && (
              <div className="buttons-container">
                <button className="start-timer-button" onClick={handleToggleTimer}>
                  {timerState.isRunning ? "❚❚" : "▶️"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoutineOverview;
