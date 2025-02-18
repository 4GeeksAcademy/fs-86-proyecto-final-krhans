import React, { useContext, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getGeminiResponse } from './geminiService';
import { Context } from "../store/appContext";
import { dispatcherUser } from '../store/dispatcher';
import "../../styles/geminiresponseSurvy.css"


const GenerateRoutine = ({videoUrl}) => {
  const location = useLocation();
  const coachResponse = location.state?.responses || {};
  const fitAnswers = location.state?.answers || {};
   
  const { actions } = useContext(Context);
  const [rutinaGenerada, setRutinaGenerada] = useState("");
  const [mensaje, setMensaje] = useState("");

  const navigate = useNavigate()

  const token = localStorage.getItem("jwt-token");

  const generarRutina = async () => {
    let prompt = "";

    if (Object.keys(coachResponse).length > 0) {
      prompt = `Genera una rutina de entrenamiento personalizada en formato JSON basado en las respuestas del usuario.

      Formato de salida esperado (solo JSON, sin explicaciones):
      \`\`\`json
      {
          "routine": {
              "name": "Nombre de la rutina",
              "description": "Breve descripción",
              "days_per_week": Número de días recomendados, un solo valor numerico
          },
          "workout": [
              {
                  "fitness_level": "Principiante/Intermedio/Avanzado",
                  "category": "Lectura/Recuperación/Mentalidad/Desarrollo Personal",
                  "goal": "Objetivo basado en el usuario",
                  "difficulty": "Baja/Media/Alta",
                  "trainings": [
                      {
                          "name": "Ejercicio 1",
                          "is_complete":"false por defecto",
                          "mode": "minutos o segudos",
                          "duration": "Duración, un solo valor, aunque mode me devuelva repeticiones dame un tiempo en donde el usuario realize el ejerccicio",
                          "repetitions": "cantidad de repeticiones " ,
                          "rest": "tiempo de descanso entre ejercicios"
                      }
                  ]
              }
          ]
      }
      \`\`\`
      Recuerda devolver solo el JSON sin texto adicional.
      `;
    } else if (Object.keys(fitAnswers).length > 0) {
      prompt = `Basado en las respuestas del usuario, genera una rutina de entrenamiento en formato JSON.

      Formato de salida esperado (solo JSON, sin explicaciones):
      \`\`\`json
      {
          "routine": {
              "name": "Nombre de la rutina",
              "description": "Breve descripción",
              "days_per_week": Número de días recomendados, un solo valor numerico
          },
          "workout": [
              {
                  "fitness_level": "Principiante/Intermedio/Avanzado",
                  "category": "Cardio/Fuerza/Flexibilidad",
                  "goal": "Objetivo basado en el usuario",
                  "difficulty": "Baja/Media/Alta",
                  "trainings": [
                      {
                          "name": "Ejercicio 1",
                          "is_complete":"false por defecto",
                          "mode": " minutos o segundos ",                          
                          "duration": "Duración, un solo valor, aunque mode me devuelva repeticiones dame un tiempo en donde el usuario realize el ejerccicio",
                          "repetitions": "cantidad de repeticiones " ,
                          "rest": "tiempo de descanso entre ejercicios"
                      }
                  ]
              }
          ]
      }
      \`\`\`
      Devuelve solo el JSON sin texto adicional.
      `;
    }

    console.log("Prompt generado:", prompt);

    try {

      const respuestaGemini = await getGeminiResponse(prompt);
      if (!respuestaGemini) throw new Error("Respuesta vacía de Gemini");

      console.log("Respuesta de Gemini:", respuestaGemini);

      // Limpiar la respuesta de posibles caracteres extraños
      const jsonMatch = respuestaGemini.match(/\{[\s\S]*\}/);
      if (!jsonMatch) throw new Error("El formato de JSON no es válido.");

      const jsonString = jsonMatch[0].trim();
      const rutinaJSON = JSON.parse(jsonString);

      console.log("JSON parseado correctamente:", rutinaJSON);

      setRutinaGenerada(JSON.stringify(rutinaJSON, null, 2));
      setMensaje("Rutina generada correctamente");

      // await actions.createdRoutine(rutinaJSON);
      await dispatcherUser.postRoutine(token, rutinaJSON);
      navigate('/dashboard/landing')

    } catch (error) {
      console.error("Error al generar la rutina:", error);
      setMensaje("Hubo un error generando la rutina.");
    }
  };

  return (
    <div className='gemini-container'>
      <div className='gemini-container_items'>
      <h1 className='gemini_title'>"¡Estás a un paso de transformar tu esfuerzo en resultados! Haz clic y comienza tu viaje hacia una mejor versión de ti mismo."</h1>
      <div className="avatar-container">
                <video src={videoUrl} className="khrans-video" autoPlay loop muted />
            </div>
      <button className='gemini-button' onClick={generarRutina}>Generar rutina</button>
      <p>{mensaje}</p>
      </div>
    </div>
  );
};

export default GenerateRoutine;
