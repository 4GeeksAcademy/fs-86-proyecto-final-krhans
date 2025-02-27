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
    const fechas = [];
    for (let i = 0; i < diasEntrenamiento; i++) {
      const fechaEntrenamiento = new Date(hoy);
      fechaEntrenamiento.setDate(hoy.getDate() + i);
      fechas.push(fechaEntrenamiento.toISOString().split('T')[0]);
    }
    return fechas;
  };

  const generarPrompt = (responses, answers) => {
    let prompt = "";
    const diasEntrenamiento = 7;
    const fechas = obtenerFechasDeLaSemana(diasEntrenamiento).map(fecha => `"day": "${fecha}"`).join(", ");

    if (Object.keys(responses).length > 0 || Object.keys(answers).length > 0) {
      prompt = `Genera una rutina de entrenamiento personalizada en formato JSON basado en las respuestas del usuario, con 7 workout para los 7 días de la semana. 
      Formato esperado:
      {
          "routine": {
              "name": "Nombre",
              "description": "Descripción",
              "days_per_week": Número
          },
          "workout": [
              {
                  "fitness_level": "Nivel",
                  "category": "Categoría",
                  "goal": "Objetivo",
                  "difficulty": "Dificultad",
                  "trainings": [
                      {
                          "name": "Ejercicio",
                          "is_complete": false,
                          "mode": "tiempo o repeticiones",
                          "duration": "Duración o null",
                          "repetitions": "Número o null",
                          "rest": "Tiempo",
                          "day": [${fechas}]
                      }
                  ]
              }
          ]
      }
      Devuelve solo el JSON sin explicaciones.`;
    }
    return prompt;
  };

  const extraerJSON = (respuesta) => {
    try {
      const content = respuesta.response.candidates[0].content.parts[0].text;
     
      let jsonLimpio = content.replace(/```json/g, "").replace(/```/g, "").trim();
      return JSON.parse(jsonLimpio);
    } catch (error) {
      throw new Error("El formato de JSON no es válido.");
    }
  };
  

  const generarRutina = async () => {
    const prompt = generarPrompt(coachResponse, fitAnswers);
    console.log("Prompt generado:", prompt);
  
    try {
      const respuestaGemini = await getGeminiResponse(prompt);
      if (!respuestaGemini) throw new Error("Respuesta vacía de Gemini");
  
      console.log("Respuesta de Gemini:", respuestaGemini);
      // const rutinaJSON = extraerJSON(respuestaGemini);
  
      setRutinaGenerada(JSON.stringify(respuestaGemini, null, 2));
      setMensaje("Successfully generated routine");
  
      await dispatcherUser.postRoutine(token, respuestaGemini);
      navigate('/dashboard/landing');
  
    } catch (error) {
      console.error("Error generating the routine:", error);
      setMensaje(error.message);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      const videoIds = {
        static: "323170867849472", 
        running: "324392158865024", 
        celebration: "323171351359104" 
      };
      const videos = await Promise.all(Object.entries(videoIds).map(async ([key, videoId]) => {
        const result = await dispatcherUser.fetchVideoUrl(videoId);
        return { key, url: result.url || null };
      }));
      setVideoUrls(videos.reduce((acc, { key, url }) => ({ ...acc, [key]: url }), {}));
    };
    fetchVideos();
  }, []);

  return (
    <div className='gemini-container'>
      <div className='gemini-container_items'>
        <div className='gemini_title'>"You're just one step away! Click and start your journey."</div>
        <div className="avatarGenerateRoutine-container">
          <video src={videoUrls.static} className="khransRoutine-video" autoPlay loop muted />
        </div>
        <button className='gemini-button' onClick={generarRutina}>Create Routine</button>
        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default GenerateRoutine;
