import React, { useState, useEffect } from "react";
import "../../styles/coachingInterviewOverview.css";
import KhransCoach from "../../img/khrans-coach.png";
import questionsData from "./trainingQuestions";
import { useNavigate } from "react-router-dom";

const CoachingInterviewOverview = () => {
    const [selectedArea, setSelectedArea] = useState(null);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [sliderValue, setSliderValue] = useState(3);
    const [hiddenAreas, setHiddenAreas] = useState([]);
    const [responses, setResponses] = useState({});

    const navigate = useNavigate();


    const handleButtonClick = (area) => {
        setSelectedArea(area);
        setCurrentQuestion(0);
    };

    const handleNextQuestion = () => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [selectedArea]: {
                ...prevResponses[selectedArea],
                [questionsData[selectedArea][currentQuestion].question]: sliderValue,
            },
        }));
    
        if (currentQuestion + 1 < questionsData[selectedArea].length) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setHiddenAreas((prev) => [...prev, selectedArea]);
            setSelectedArea(null);
        }
    };
    

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
                <img src={KhransCoach} alt="Khrans Coach" className="KhransCoach" />
            </div>
            {step === 3 && !selectedArea && (
                <div className="area-options">
                    {Object.keys(questionsData).map((area, index) => (
                        <div
                            key={index}
                            className={`area-button area-button${index + 1} ${hiddenAreas.includes(area) ? "hidden-area" : ""}`}
                            onClick={() => !hiddenAreas.includes(area) && handleButtonClick(area)}
                        >
                            {area}
                        </div>
                    ))}
                </div>
            )}
               
            {step === 3 && hiddenAreas.length === Object.keys(questionsData).length && (
                
                <button className="continue-button" onClick={() => {
                    setResponses((prevResponses) => {
                        console.log("Responses finales antes de navegar:", prevResponses);
                        navigate('/dashboard/generate-routine', { state: { responses: prevResponses } });
                        return prevResponses;
                    });
                }}>
                    Continue
                </button>
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
