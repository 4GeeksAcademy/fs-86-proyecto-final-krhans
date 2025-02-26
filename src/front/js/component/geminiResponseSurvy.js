import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGeminiResponse } from './geminiService';
import { Context } from "../store/appContext";
import { dispatcherUser } from '../store/dispatcher';
import "../../styles/geminiresponseSurvy.css";

const GenerateRoutine = () => {
  const [videoUrls, setVideoUrls] = useState({});
  const [posicionKhrans, setPosicionKhrans] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const [showRace, setShowRace] = useState(false);
  const location = useLocation();
  const { responses: coachResponse = {}, answers: fitAnswers = {} } = location.state || {};
  
  const { actions } = useContext(Context);
  const [rutinaGenerada, setRutinaGenerada] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");

  const obtenerFechasDeLaSemana = (diasEntrenamiento) => {
    const hoy = new Date();
    const diaDeLaSemana = hoy.getDay();
    const fechas = [];

    for (let i = 0; i < diasEntrenamiento; i++) {
      const fechaEntrenamiento = new Date(hoy);
      fechaEntrenamiento.setDate(hoy.getDate() + (i - diaDeLaSemana));
      if (fechaEntrenamiento.getDay() <= 6) {
        fechas.push(fechaEntrenamiento.toISOString().split('T')[0]); 
      }
    }

    return fechas;
  };

  const generarPrompt = (responses, answers) => {
    let prompt = "";
    const diasEntrenamiento = 7;
    const fechas = obtenerFechasDeLaSemana(diasEntrenamiento).map(fecha => {
      return `"day": "${fecha}"`;
    }).join(", ");

    if (Object.keys(responses).length > 0) {
      prompt = `Genera una rutina de entrenamiento personalizada en formato JSON basado en las respuestas del usuario, que sean 7 workout de acuerdo a los 7 días de la semana y solo 7.
      Formato de salida esperado (solo JSON, sin explicaciones):
      {
          "routine": {
              "name": "Nombre de la rutina",
              "description": "Breve descripción",
              "days_per_week": Número de días recomendados, un solo valor numérico
          },
          "workout": [
              {
                  "fitness_level": "Depende respuesta del usuario",
                  "category": "Lectura/Recuperación/Mentalidad/Desarrollo Personal",
                  "goal": "Objetivo basado en el usuario",
                  "difficulty": "Baja/Media/Alta",
                  "trainings": [
                      {
                          "name": "Ejercicio 1",
                          "is_complete": "false por defecto",
                          "mode": "tiempo, repeticiones",
                          "duration": "Duración del training (Si son repeticiones dejar vacío)",
                          "repetitions": "cantidad de repeticiones (si mode=tiempo dejar vacío)",
                          "rest": "tiempo de descanso entre ejercicios",
                          "day":${fechas}
                      }
                  ]
              }
          ]
      }
      Recuerda devolver solo el JSON sin texto adicional.`;
    } else if (Object.keys(answers).length > 0) {
      prompt = `Basado en las respuestas del usuario, genera una rutina de entrenamiento en formato JSON, que sean 7 workout de acuerdo a los 7 días de la semana y solo 7.
      Formato de salida esperado (solo JSON, sin explicaciones):
      {
          "routine": {
              "name": "Nombre de la rutina",
              "description": "Breve descripción",
              "days_per_week": Número de días recomendados, un solo valor numérico
          },
          "workout": [
              {
                  "fitness_level": "depende respuesta del usuario",
                  "category": "Cardio/Fuerza/Flexibilidad",
                  "goal": "Objetivo basado en el usuario",
                  "difficulty": "Baja/Media/Alta",
                  "trainings": [
                      {
                          "name": "Ejercicio 1",
                          "is_complete": "false por defecto",
                          "mode": "tiempo, repeticiones",
                          "duration": "Duración del training (Si son repeticiones dejar vacío)",
                          "repetitions": "cantidad de repeticiones (si mode=tiempo dejar vacío)",
                          "rest": "tiempo de descanso entre ejercicios",
                          "day":${fechas}
                      }
                  ]
              }
          ]
      }
      Devuelve solo el JSON sin texto adicional.`;
    }
    return prompt;
  };

  const generarRutina = async () => {
    const prompt = generarPrompt(coachResponse, fitAnswers);
  
    try {
      const respuestaGemini = await getGeminiResponse(prompt);
      if (!respuestaGemini) throw new Error("Respuesta vacía de Gemini");
  
      const jsonMatch = respuestaGemini.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("El formato de JSON no es válido.");
  
      const jsonString = jsonMatch[0].trim();
      const rutinaJSON = JSON.parse(jsonString);
  
      console.log("JSON parseado correctamente:", rutinaJSON);
      rutinaJSON.workout.forEach(workout => {
        workout.trainings.forEach(training => {
          if (training.mode === "tiempo") {
            training.repetitions = null;
            training.duration = (typeof training.duration === 'string' && training.duration.includes(" ")) 
                ? parseDurationToSeconds(training.duration) 
                : null;
            training.rest = (typeof training.rest === 'string' && training.rest.trim() !== "") 
                ? parseDurationToSeconds(training.rest) 
                : 30;
          } else if (training.mode === "repeticiones") {
            if (typeof training.repetitions === 'string' && training.repetitions.includes('-')) {  
              training.repetitions = parseInt(training.repetitions.split('-')[0].trim(), 10); // Toma el primer valor
            } else {
              training.repetitions = parseInt(training.repetitions, 10) || 0; 
            }
            training.duration = null;
            training.rest = (typeof training.rest === 'string' && training.rest.trim() !== "") 
                ? parseDurationToSeconds(training.rest) 
                : 30; 
          }
        });
      });
      setShowRace(true);
  
      // Asigna una única fecha a cada training
      const fechas = obtenerFechasDeLaSemana(7);
      rutinaJSON.workout.forEach((workout, workoutIndex) => {
        workout.trainings.forEach((training, trainingIndex) => {
          training.day = fechas[trainingIndex]; 
        });
      });
  
      setRutinaGenerada(JSON.stringify(rutinaJSON, null, 2));
      setMensaje("Successfully generated routine");
  
      await dispatcherUser.postRoutine(token, rutinaJSON);
      navigate('/dashboard/landing');
  
    } catch (error) {
      console.error("Error generating the routine:", error);
      if (error.message === "Gemini Empty Response") {
        setMensaje("No response was received from the service.");
      } else if (error.message === "The JSON format is invalid.") {
        setMensaje("Gemini's response is not in the expected format.");
      } else {
        setMensaje("There was an error generating the routine.");
      }
    }
  };

  const parseDurationToSeconds = (duration) => {
    const regex = /(\d+)\s*(minutos?|segundos?)/i;
    const match = duration.match(regex);
    if (match) {
      const value = parseInt(match[1], 10);
      const unit = match[2].toLowerCase();
      return unit.startsWith('min') ? value * 60 : value;
    }
    return null;
  };

  const videoIds = {
    static: "323170867849472", 
    running: "324392158865024", 
    celebration: "323171351359104" 
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const videoRequests = Object.entries(videoIds).map(async ([key, videoId]) => {
        const result = await dispatcherUser.fetchVideoUrl(videoId);
        return { key, url: result.url || null };
      });

      const videos = await Promise.all(videoRequests);
      const videoMap = videos.reduce((acc, { key, url }) => {
        acc[key] = url;
        return acc;
      }, {});

      setVideoUrls(videoMap);
    };

    fetchVideos();
  }, []);

  const moverKhrans = () => {
    setPosicionKhrans(prev => {
      if (prev >= 150) { 
        setHasFinished(true);
        return prev;
      }
      return prev + 20;
    });
  };

  return (
    <div className='gemini-container'>
      <div className='gemini-container_items'>
        <div className='gemini_title'>"You're just one step away from turning your effort into results! Click and start your journey towards a better version of yourself."</div>
        <div className="avatarGenerateRoutine-container">
          <video src={videoUrls.static} className="khransRoutine-video" autoPlay loop muted />
        </div>
        <button className='gemini-button' onClick={generarRutina}>Create Routine</button>
        {/* {showRace &&( */}
          <div className="raceHint-container">
            {!hasFinished ? (
              <p className="race-hint">⬇️ Press to reach the goal ⬇️</p>
            ) : (
              <p className="race-success">🎉 You did it! 🎉</p>
            )}
          </div>
          <div className="race-container">
            {!hasFinished &&<div className="meta">🏁 GOAL</div>}
            <div 
              className="avatarGenerateRoutine-container" 
              style={{ transform: `translateX(${posicionKhrans}px)` }}
              onClick={moverKhrans}>
              {videoUrls.running && !hasFinished && (
                <video src={videoUrls.running} className="khransRoutineRunning-video" autoPlay loop muted />
              )}
              {videoUrls.celebration && hasFinished && (
                <video src={videoUrls.celebration} className="khransRoutineCelebration-video" autoPlay loop muted />
              )}
            </div>
          </div>
        {/* )} */}
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default GenerateRoutine;
