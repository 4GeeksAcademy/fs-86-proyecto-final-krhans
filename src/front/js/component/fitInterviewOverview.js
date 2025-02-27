import React, { useState, useEffect } from "react";
import "../../styles/fitInterviewOverview.css";
import { dispatcherUser } from "../store/dispatcher.js";
import { useNavigate } from "react-router-dom";

const getQuestions = (answers) => [
    { 
        id: 1, 
        question: "What is your main goal?", 
        options: ["Lose fat", "Gain muscle", "Running endurance", "Improve flexibility"] 
    },
    { 
        id: 3, 
        question: "Where do you prefer to train?", 
        options: answers[0] === "Running endurance" 
            ? ["At the gym", "Outdoors"] 
            : ["At the gym", "Outdoors", "At home"] 
    },
    { 
        id: 4, 
        question: "What equipment do you have?", 
        options: ["Dumbbells", "Bars", "Ropes and similar", "I don't have"] 
    },
    { 
        id: 5, 
        question: "What motivates you most to keep training?", 
        options: ["Quick results", "Improve health", "Feel good mentally", "Train with others"] 
    }
];

const FitInterviewOverview = () => {
    const [videoUrl, setVideoUrl] = useState(null);
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState({});
    const [visibleOptions, setVisibleOptions] = useState([]);
    const [questions, setQuestions] = useState(getQuestions({}));
    const [currentQuestion, setCurrentQuestion] = useState(questions[0]);

    const videoId = "322980648122496";
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };

        fetchVideo();
    }, [videoId]);

    useEffect(() => {
        setVisibleOptions([]);
        const filteredOptions = questions[index].options;

        setCurrentQuestion({ ...questions[index], options: filteredOptions });

        filteredOptions.forEach((_, i) => {
            setTimeout(() => {
                setVisibleOptions(prev => [...prev, i]);
            }, (i + 1) * 1000); 
        });
    }, [index, questions]);

    const handleAnswer = (option) => {
        const newAnswers = { ...answers, [index]: option };
        setAnswers(newAnswers);

        if (index === 0) {
            setQuestions(getQuestions(newAnswers));
            setIndex(1);
        } else if (index === 1) {
            if (option === "At home" && answers[0] !== "Running endurance") {
                setIndex(2); 
            } else {
                setIndex(3); 
            }
        } else if (index < questions.length - 1) {
            setIndex(index + 1);
        } else {
            console.log("Completed answers:", newAnswers);
            navigate('/dashboard/generate-routine', { state: { answers: newAnswers } });
        }
    };

    return (
        <div className="fitinterview-container">
            <div className="fitinterview-question">
                <h2>{currentQuestion.question}</h2>
            </div>
            <div className="fitinterview-options">
                {currentQuestion.options.slice(0, 2).map((option, idx) => (
                    <button
                        key={idx}
                        className={`fitinterview-button ${visibleOptions.includes(idx) ? "fade-in" : "hidden"} top-option-${idx}`}
                        onClick={() => handleAnswer(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
            <div className="avatar-container">
                <video src={videoUrl} className="khransFit-video" autoPlay loop muted />
            </div>
            <div className="fitinterview-options">
                {currentQuestion.options.slice(2).map((option, idx) => (
                    <button
                        key={idx + 2}
                        className={`fitinterview-button ${visibleOptions.includes(idx + 2) ? "fade-in" : "hidden"} bottom-option-${idx}`}
                        onClick={() => handleAnswer(option)}
                    >
                        {option}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default FitInterviewOverview;

