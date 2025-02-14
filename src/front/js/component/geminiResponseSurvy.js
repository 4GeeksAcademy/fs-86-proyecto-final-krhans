import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getGeminiResponse } from './geminiService';

const GenerateRoutine = () => {
  const location = useLocation();
  const coachResponse = location.state?.responses || {}; // Respuestas del coaching
  const fitAnswers = location.state?.answers || {}; // Respuestas del fit
  console.log("Respuestas recibidas coach:", coachResponse); 
  console.log("Respuestas recibidas fit:", fitAnswers);  // Verifica que recibes las respuestas

  const [rutinaGenerada, setRutinaGenerada] = useState("");
  const [mensaje, setMensaje] = useState("");

  const generarRutina = async () => {
    let prompt = '';

    // Verifica si las respuestas vienen del coaching o fit
    if (coachResponse && Object.keys(coachResponse).length > 0) {
      // Crear el prompt basado en las respuestas de Coaching
      prompt = `
        Basado en las siguientes respuestas del usuario sobre su mentalidad y hábitos, genera una rutina de entrenamiento personalizada en formato JSON. 

    **IMPORTANTE:** Las respuestas van de 1 a 5, donde:
    - 1: Muy bajo
    - 2: Bajo
    - 3: Medio
    - 4: Alto
    - 5: Muy alto

    **Respuestas del usuario:**
    - **Mentalidad de Crecimiento:** 
      - ¿Cómo reaccionas cuando enfrentas un desafío difícil? ${coachResponse["Growth Mindset"]?.["¿Cómo reaccionas cuando enfrentas un desafío difícil que requiere aprender algo nuevo?"] || 3}
      - ¿Cómo interpretas el fracaso? ${coachResponse["Growth Mindset"]?.["Cuando fallas en algo en lo que pusiste esfuerzo, ¿cómo lo interpretas?"] || 3}
      - ¿Con qué frecuencia buscas aprender cosas nuevas? ${coachResponse["Growth Mindset"]?.["Con qué frecuencia buscas aprender cosas nuevas o mejorar tus habilidades actuales?"] || 3}

    - **Disciplina:** 
      - ¿Qué tan constante eres con tus compromisos? ${coachResponse["Discipline"]?.["Cuando te propones hacer algo, ¿qué tan constante eres, incluso cuando no tienes ganas de hacerlo?"] || 3}
      - ¿Sigues planes a largo plazo? ${coachResponse["Discipline"]?.["¿Qué tan bien sigues un plan a largo plazo sin desviarte?"] || 3}
      - ¿Cómo manejas la procrastinación? ${coachResponse["Discipline"]?.["¿Qué tan bien manejas la procrastinación cuando tienes tareas importantes por hacer?"] || 3}

    - **Autoconciencia:** 
      - ¿Qué tan consciente eres de tus emociones y decisiones? ${coachResponse["Self-awareness"]?.["¿Qué tan consciente eres de cómo tus emociones y pensamientos influyen en tus decisiones?"] || 3}
      - ¿Cómo identificas y mejoras errores? ${coachResponse["Self-awareness"]?.["Cuando algo no sale como esperabas, ¿qué tan bien puedes identificar lo que salió mal y cómo mejorarlo?"] || 3}
      - ¿Confías en tu intuición y análisis? ${coachResponse["Self-awareness"]?.["Cuando tomas decisiones importantes, ¿qué tanto confías en tu intuición y análisis personal?"] || 3}

    - **Manejo emocional:** 
      - ¿Cómo manejas el estrés? ${coachResponse["Emotional Management"]?.["Cuando te sientes estresado, ¿qué tan bien manejas tus emociones?"] || 3}
      - ¿Cómo afecta tu motivación cuando enfrentas problemas? ${coachResponse["Emotional Management"]?.["Cuando enfrentas un obstáculo o una mala noticia, ¿cómo afecta tu motivación para seguir adelante?"] || 3}
      - ¿Cómo gestionas emociones en interacciones sociales? ${coachResponse["Emotional Management"]?.["¿Qué tan bien manejas tus emociones cuando interactúas con otras personas, especialmente en situaciones de estrés o conflicto?"] || 3}

    - **Hábitos:** 
      - ¿Qué tan consistente eres con tus hábitos diarios? ${coachResponse["Habits"]?.["¿Qué tan consistente eres con tus rutinas y hábitos diarios?"] || 3}
      - ¿Qué tan fácil es mantener nuevos hábitos? ${coachResponse["Habits"]?.["Cuando intentas formar un nuevo hábito, ¿qué tan fácil te resulta mantenerlo?"] || 3}
      - ¿Qué tan bien manejas distracciones? ${coachResponse["Habits"]?.["¿Qué tan bien manejas las distracciones cuando intentas establecer un nuevo hábito?"] || 3}

    **Genera una rutina personalizada en el siguiente formato JSON. NO incluyas explicaciones, solo devuelve el JSON:**

    {
        "routine": {
            "name": "Nombre de la rutina basada en las respuestas del usuario",
            "description": "Breve descripción de la rutina teniendo en cuenta las fortalezas y debilidades del usuario",
            "days_per_week": Número de días recomendados en base a su disciplina y hábitos
        },
        "workout": [
            {
                "fitness_level": "Principiante/Intermedio/Avanzado según la constancia y motivación del usuario",
                "category": "Cardio/Fuerza/Flexibilidad según sus necesidades",
                "goal": "Objetivo basado en la mentalidad y disciplina del usuario",
                "difficulty": "Baja/Media/Alta según su nivel de consistencia y hábitos",
                "trainings": [
                    {
                        "name": "Ejercicio 1",
                        "mode": "Repeticiones o tiempo",
                        "duration": Duración en minutos
                    },
                    {
                        "name": "Ejercicio 2",
                        "mode": "Repeticiones o tiempo",
                        "duration": Duración en minutos
                    },
                
                    {
                        "name": "Ejercicio 3",
                        "mode": "Repeticiones o tiempo",
                        "duration": Duración en minutos
                    },
                    {
                        "name": "Ejercicio 4",
                        "mode": "Repeticiones o tiempo",
                        "duration": Duración en minutos
                    }
                ]
            }
        ],
        "personal_growth": [
            {
                "name": "Hábito de desarrollo personal",
                "description": "Descripción de la actividad basada en las respuestas del usuario",
                "frequency": "Diario/Semanal",
                "duration": Duración en minutos
            },
            {
                "name": "Hábito de desarrollo personal",
                "description": "Descripción de la actividad basada en las respuestas del usuario",
                "frequency": "Diario/Semanal",
                "duration": Duración en minutos
            },
            {
                "name": "Hábito de desarrollo personal",
                "description": "Descripción de la actividad basada en las respuestas del usuario",
                "frequency": "Diario/Semanal",
                "duration": Duración en minutos
            }
        ]
    }
  `;

      console.log("Prompt generado:", prompt); // Verifica el prompt en consola
    } else if (fitAnswers && Object.keys(fitAnswers).length > 0) {
      // Crear el prompt basado en las respuestas de Fitness
      prompt = `
       Basado en las siguientes respuestas del usuario, genera una rutina de entrenamiento personalizada en formato JSON.
      - Motivación: ${fitAnswers[4]}
      - Ejercicio preferido: ${fitAnswers[0]}
      - Días disponibles: ${fitAnswers[1]}
      - Lugar de entrenamiento: ${fitAnswers[2]}

      Devuelve solo un objeto JSON con la siguiente estructura sin ningún texto adicional:
      {
          "routine": {
              "name": "Nombre de la rutina",
              "description": "Breve descripción",
              "days_per_week": Número de días recomendados
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
                          "mode": "Repeticiones o tiempo",
                          "duration": Duración en minutos
                      },
                      {
                          "name": "Ejercicio 2",
                          "mode": "Repeticiones o tiempo",
                          "duration": Duración en minutos
                      },
                  
                      {
                          "name": "Ejercicio 3",
                          "mode": "Repeticiones o tiempo",
                          "duration": Duración en minutos
                      },
                      {
                          "name": "Ejercicio 4",
                          "mode": "Repeticiones o tiempo",
                          "duration": Duración en minutos
                      }
                  ]
              }
          ]
      }
    `;
    }

    console.log("Prompt generado:", prompt);

    try {
      // Suponiendo que tienes una función `getGeminiResponse` para obtener la respuesta de Gemini:
      const respuestaGemini = await getGeminiResponse(prompt);
      console.log("rutina generada", respuestaGemini);
      if (respuestaGemini) {
        setRutinaGenerada(respuestaGemini);
        setMensaje("Rutina generada correctamente");
      } else {
        setMensaje("Hubo un error generando la rutina.");
      }
    } catch (error) {
      console.error("Error al generar la rutina", error);
      setMensaje("Hubo un error generando la rutina.");
    }
  };

  return (
    <div>
      <h2>Generar Rutina Personalizada</h2>
      <button onClick={generarRutina}>Generar rutina</button>
      <p>{mensaje}</p>
      {rutinaGenerada && <pre>{rutinaGenerada}</pre>}  {/* Mostrar la rutina generada */}
    </div>
  );
};

export default GenerateRoutine;