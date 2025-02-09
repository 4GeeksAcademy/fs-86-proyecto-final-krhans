import React, { useState, useEffect } from "react";
import "../../styles/coachingInterviewOverview.css";
import KhransCoach from "../../img/khrans-coach.png";

const questionsData = {
    "Self-awareness": [
        {
            question: "¿Qué tan consciente eres de cómo tus emociones y pensamientos influyen en tus decisiones?",
            options: {
                low: "Casi nunca me doy cuenta",
                moderate: "A veces lo noto, pero no siempre",
                high: "Siempre lo tengo claro y lo analizo",
            },
        },
        {
            question: "Cuando algo no sale como esperabas, ¿qué tan bien puedes identificar lo que salió mal y cómo mejorarlo?",
            options: {
                low: "Me cuesta mucho identificarlo",
                moderate: "A veces lo analizo",
                high: "Siempre identifico lo que puedo mejorar",
            },
        },
        {
            question: "Cuando tomas decisiones importantes, ¿qué tanto confías en tu intuición y análisis personal?",
            options: {
                low: "Siempre dudo de mis decisiones",
                moderate: "Depende de la situación",
                high: "Confío completamente en mi",
            },
        }],
    "Habits":[
        {
            question: "¿Qué tan consistente eres con tus rutinas y hábitos diarios?",
            options: {
                low: "Nunca sigo una rutina",
                moderate: "Intento seguir una rutina",
                high: "Tengo hábitos sólidos",
            },
        },
        {
            question: "Cuando intentas formar un nuevo hábito, ¿qué tan fácil te resulta mantenerlo?",
            options: {
                low: "Siempre abandono",
                moderate: "Aguanto un poco",
                high: "Puedo mantenerlo sin problemas",
            },
        }, 
        {
            question: "¿Qué tan bien manejas las distracciones cuando intentas establecer un nuevo hábito?",
            options: {
                low: "Me distraigo facilmente",
                moderate: "A veces me distraigo",
                high: "Siempre mantengo mi enfoque",
            },
        }
    ],
    "Discipline":[
        {
            question: "Cuando te propones hacer algo, ¿qué tan constante eres, incluso cuando no tienes ganas de hacerlo?",
            options: {
                low: "Siempre abandono",
                moderate: "Depende del día ",
                high: "Siempre cumplo mis compromisos",
            },
        },
        {
            question: "¿Qué tan bien sigues un plan a largo plazo sin desviarte?",
            options: {
                low: "Siempre me desvío",
                moderate: "Intento seguirlo",
                high: "Cumplo mis planes",
            },
        }, 
        {
            question: "¿Qué tan bien manejas la procrastinación cuando tienes tareas importantes por hacer?",
            options: {
                low: "Siempre lo dejo para después",
                moderate: "A veces procrastino",
                high: "Siempre priorizo mis responsabilidades",
            },
        }
    ],
    "Growth Mindset":[
        {
            question: "¿Cómo reaccionas cuando enfrentas un desafío difícil que requiere aprender algo nuevo?",
            options: {
                low: "Me frustro y evito intentarlo",
                moderate: "Lo intento ",
                high: "Me gustan los retos y los veo como oportunidades",
            },
        },
        {
            question: "Cuando fallas en algo en lo que pusiste esfuerzo, ¿cómo lo interpretas?",
            options: {
                low: "Me frustro y siento que no sirvo para eso",
                moderate: "Intento seguir adelante, pero me afecta mucho el fracaso",
                high: "veo el fracaso como una oportunidad de aprendizaje y mejora",
            },
        }, 
        {
            question: "Con qué frecuencia buscas aprender cosas nuevas o mejorar tus habilidades actuales?",
            options: {
                low: "Nunca",
                moderate: "A veces lo hago",
                high: "Siempre busco aprender algo nuevo",
            },
        }
    ],
    "Emotional Management":[
        {
            question: "Cuando te sientes estresado, ¿qué tan bien manejas tus emociones?",
            options: {
                low: "Me dejo llevar",
                moderate: "Intento controlarlo ",
                high: " Tengo estrategias para manejar el estrés",
            },
        },
        {
            question: "Cuando enfrentas un obstáculo o una mala noticia, ¿cómo afecta tu motivación para seguir adelante?",
            options: {
                low: "Pierdo la motivación y me rindo",
                moderate: "Intento seguir adelante",
                high: "Uso los obstáculos como impulso",
            },
        }, 
        {
            question: "¿Qué tan bien manejas tus emociones cuando interactúas con otras personas, especialmente en situaciones de estrés o conflicto?",
            options: {
                low: "Impulsivamente",
                moderate: "Intento controlar mis emociones",
                high: "Gestiono mis emociones con calma",
            },
        }
    ]
};

const CoachingInterviewOverview = () => {

    const [selectedArea, setSelectedArea] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [sliderValue, setSliderValue] = useState(3);

    const handleButtonClick = (area) => {
        setSelectedArea(area);
        setCurrentQuestion(0);
    };

    const handleNextQuestion = () => {
        if (currentQuestion + 1 < questionsData[selectedArea].length) {
            setCurrentQuestion(currentQuestion + 1);
        } return ;
    };
    console.log("Cuestionario Finalizado");

    const handleSliderChange = (event) => {
        setSliderValue(event.target.value);
    };

    const [step, setStep] = useState(-1);

    useEffect(() => {
        const timer0 = setTimeout(() => setStep(0), 1000);
        const timer1 = setTimeout(() => setStep(1), 3000);
        const timer2 = setTimeout(() => setStep(2), 8000);
        const timer3 = setTimeout(() => setStep(3), 12000);

        return () => {
            clearTimeout(timer0);
            clearTimeout(timer1);
            clearTimeout(timer2);
            clearTimeout(timer3);
        };
    }, []);

    return (
        <div className="coachingInterview-container">

            {step === 1 && <p className="fade-text">"Choosing to delve into yourself is one of the wisest decisions you can make."</p>}
            {step === 2 && <p className="fade-text">"It will be an honor to guide you on a path to a different and better life."</p>}

            {step === 3 && <p className="area-message">"Select an area to explore"</p>}

            <div className={`coachingInterview-avatar ${step >= 0 ? "fade-in" : ""}`}>
                <img src={KhransCoach} alt="Khrans Coach" className="KhransCoach"/>
            </div>

            {step === 3 && !selectedArea && (
                <div className="area-options">
                    {Object.keys(questionsData).map((area, index) => (
                        <div
                            key={index}
                            className={`area-button area-button${index + 1}`}
                            onClick={() => handleButtonClick(area)}>
                            {area}
                        </div>
                    ))}
                </div>
            )}
            {selectedArea && (
                <>
                    <div className="question-text">
                        <p>{questionsData[selectedArea][currentQuestion].question}</p>
                    </div>

                    <div className="slider-widget">
                        <div className="slider-labels">
                            <span>{questionsData[selectedArea][currentQuestion].options.low}</span>
                            <span>{questionsData[selectedArea][currentQuestion].options.moderate}</span>
                            <span>{questionsData[selectedArea][currentQuestion].options.high}</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            className="slider"
                        />
                        <div className="slider-value">Selected Level: {sliderValue}</div>
                    </div>

                    <button className="next-button" onClick={handleNextQuestion}>
                        That´s how I feel
                    </button>
                </>
            )}
        </div>
    );
};

export default CoachingInterviewOverview;