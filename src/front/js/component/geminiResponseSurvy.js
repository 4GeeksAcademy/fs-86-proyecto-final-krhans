import React, { useContext, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getGeminiResponse } from "./geminiService";
import { Context } from "../store/appContext";
import { dispatcherUser } from "../store/dispatcher";
import "../../styles/geminiresponseSurvy.css";

const GenerateRoutine = () => {
  const [videoUrls, setVideoUrls] = useState({});
  const [posicionKhrans, setPosicionKhrans] = useState(0);
  const [hasFinished, setHasFinished] = useState(false);
  const location = useLocation();
  const { responses: coachResponse = {}, answers: fitAnswers = {} } = location.state || {};

  const { actions } = useContext(Context);
  const [rutinaGenerada, setRutinaGenerada] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("jwt-token");

  const obtenerFechasDeLaSemana = (diasEntrenamiento) => {
    const hoy = new Date();
    return Array.from({ length: diasEntrenamiento }, (_, i) => {
      const fecha = new Date(hoy);
      fecha.setDate(hoy.getDate() + i);
      return fecha.toISOString().split("T")[0];
    });
  };
  const generateDates = () => {
    const today = new Date();
    const dates = [];
  
    // Generar las fechas para los próximos 7 días (incluyendo hoy)
    for (let i = 0; i < 8; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i); // Ajustar la fecha sumando días
      const formattedDate = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      dates.push(formattedDate);
    }
  
    return dates; // Devuelve un array con las fechas
  };

  const generarPrompt = (responses, answers) => {
    const diasEntrenamiento = 7;
    const dates = generateDates();
    const fechas = obtenerFechasDeLaSemana(diasEntrenamiento).map(fecha => `"day": "${fecha}"`).join(", ");

    return `Genera una rutina de entrenamiento personalizada en formato JSON basada en las respuestas del usuario, con 7 workouts para los 7 días de la semana.
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[0]}" // Día 1
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[0]}" // Día 1, igual que el anterior
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[0]}" // Día 1, igual que el anterior
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[1]}" // Día 2
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[1]}" // Día 2
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[1]}" // Día 2
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[2]}" // Día 3
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[2]}" // Día 3
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[2]}" // Día 3
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[3]}" // Día 4
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[3]}" // Día 4
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[3]}" // Día 4
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[4]}" // Día 5
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[4]}" // Día 5
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[4]}" // Día 5
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[5]}" // Día 6
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[5]}" // Día 6
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[5]}" // Día 6
                }
            ]
        },
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
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[6]}" // Día 7
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[6]}" // Día 7
                },
                {
                    "name": "Ejercicio",
                    "is_complete": false,
                    "mode": "tiempo o repeticiones",
                    "duration": "Duración o null",
                    "repetitions": "un único Número o null
                    "rest": "Tiempo",
                    "day": "${dates[6]}" // Día 7
                }
            ]
        }
    ]
}
Devuelve solo el JSON sin explicaciones.`;
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
    try {
      const prompt = generarPrompt(coachResponse, fitAnswers);
      const respuestaGemini = await getGeminiResponse(prompt);
      if (!respuestaGemini) throw new Error("Respuesta vacía de Gemini");

      console.log("Respuesta de Gemini:", respuestaGemini);
      setRutinaGenerada(JSON.stringify(respuestaGemini, null, 2));

      setMensaje("Successfully generated routine");

      await dispatcherUser.postRoutine(token, respuestaGemini);
      navigate("/dashboard/landing");
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

      const videos = await Promise.all(
        Object.entries(videoIds).map(async ([key, videoId]) => {
          const result = await dispatcherUser.fetchVideoUrl(videoId);
          return { key, url: result.url || null };
        })
      );

      setVideoUrls(videos.reduce((acc, { key, url }) => ({ ...acc, [key]: url }), {}));
    };

    fetchVideos();
  }, []);

  const moverKhrans = () => {
    setPosicionKhrans((prev) => {
      if (prev >= 150) {
        setHasFinished(true);
        return prev;
      }
      return prev + 20;
    });
  };

  return (
    <div className="gemini-container">
      <div className="gemini-container_items">
        <div className="gemini_title">
          "You're just one step away! Click and start your journey."
        </div>
        <div className="avatarGenerateRoutine-container">
          <video src={videoUrls.static} className="khransRoutine-video" autoPlay loop muted />
        </div>
        <button className="gemini-button" onClick={generarRutina}>
          Create Routine
        </button>

        <div className="raceHint-container">
          {!hasFinished ? (
            <p className="race-hint">⬇️ Press to reach the goal ⬇️</p>
          ) : (
            <p className="race-success">🎉 You did it! 🎉</p>
          )}
        </div>

        <div className="race-container">
          {!hasFinished && <div className="meta">🏁 GOAL</div>}
          <div
            className="avatarGenerateRoutine-container"
            style={{ transform: `translateX(${posicionKhrans}px)` }}
            onClick={moverKhrans}
          >
            {videoUrls.running && !hasFinished && (
              <video src={videoUrls.running} className="khransRoutineRunning-video" autoPlay loop muted />
            )}
            {videoUrls.celebration && hasFinished && (
              <video src={videoUrls.celebration} className="khransRoutineCelebration-video" autoPlay loop muted />
            )}
          </div>
        </div>

        <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default GenerateRoutine;
