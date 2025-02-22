import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frases from "../component/motivationalPhrase";
import AvatarEmotions from "../component/avatarEmotion";
import Calendar from "../component/calendar";
import StartRoutineButton from "../component/startRoutine";
import '../../styles/landingPageOverview.css'
import { dispatcherUser } from "../store/dispatcher.js";
import { Context } from "../store/appContext.js";

const LandingPage = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState(null);
    const videoId = "322634554020544";
    const [selectedDate, setSelectedDate] = useState(null);
    const { store, actions } = useContext(Context);

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };

        fetchVideo();
    }, [videoId]);

    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'long' });

    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
            name: date.toLocaleString('en-US', { weekday: 'long' }),
            date: date.getDate()
        };
    });

    const handleDateClick = (day) => {
        setSelectedDate(prevDate => (prevDate?.name === day.name ? null : day));
    };

    const statistics = () => {
        navigate("/dashboard/statisticsscreen");
    };

    const handleRedoInterview = () => {
        navigate("/dashboard");
    };

    // Obtener workouts del store
    const workouts = store.userData?.routines?.[0]?.workouts || [];
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    // Asignar workouts a los días de la semana según su índice
    const assignedWorkouts = workouts.map((workout, index) => ({
        ...workout,
        day: weekDays[index % weekDays.length] // Se cicla entre los días de la semana
    }));

    // Buscar el workout del día seleccionado
    const selectedWorkout = assignedWorkouts.find(workout => workout.day === selectedDate?.name);

    const routineTable = () => {
        if (!selectedWorkout) {
            alert("No routine found for today.");
            return;
        }
        navigate("/dashboard/routine", { state: { day: currentWeek, workout: selectedWorkout} });
    };

    return (
        <div className="landing-container">
            <div className="calendar-container">
                <Calendar monthName={currentMonth} currentWeek={currentWeek} onDateClick={handleDateClick} />
            </div>

            <div className="routine-section">
                {selectedDate ? (
                    <>
                        <h3 className="selected-day-title">{selectedDate.name}</h3>
                        <ul className="routine-list">
                            {selectedWorkout ? (
                                selectedWorkout.trainings.map((exercise, i) => (
                                    <li key={i}>{exercise.name}</li>
                                ))
                            ) : (
                                <p>No workout assigned for this day</p>
                            )}
                        </ul>
                    </>
                ) : (
                    <div className="no-day-container">
                        <div className="arrow-to-calendar">⬆️</div>
                        <h3 className="no-day-selected">"Select a day to view the routine"</h3>
                    </div>
                )}
            </div>

            <div className="main-content">
                <StartRoutineButton onClick={routineTable} className="routine-button" />
            </div>

            <div className="bottom-section">
                <div className="avatar-motivation-container">
                    <div className="avatar-motivation"><Frases /></div>
                </div>
                <div className="avatar-landing-container">
                    <AvatarEmotions handleRedoInterview={handleRedoInterview} avatarSrc={videoUrl} onStatisticsClick={statistics} />
                </div>
            </div>
        </div>
    );
}

export default LandingPage;