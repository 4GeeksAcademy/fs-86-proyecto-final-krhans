import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Frases from "../component/motivationalPhrase";
import AvatarEmotions from "../component/avatarEmotion";
import Calendar from "../component/calendar";
import StartRoutineButton from "../component/startRoutine";
import '../../styles/landingPageOverview.css';
import { dispatcherUser } from "../store/dispatcher.js";
import { Context } from "../store/appContext.js";

const LandingPage = () => {
    const navigate = useNavigate();
    const [videoUrl, setVideoUrl] = useState(null);
    const videoId = "322634554020544";
    const [selectedDate, setSelectedDate] = useState(null);
    const { store, actions } = useContext(Context);
    const [selectedOddDays, setSelectedOddDays] = useState([]);

    useEffect(() => {
        const fetchVideo = async () => {
            const result = await dispatcherUser.fetchVideoUrl(videoId);
            if (result.url) {
                setVideoUrl(result.url);
            }
        };

        fetchVideo();
    }, [videoId, store.userData]);

    const today = new Date();
    const currentMonth = today.toLocaleString('en-US', { month: 'long' });
    const currentDate = today.getDate();

    const currentWeek = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(today);
        date.setDate(today.getDate() + i);
        return {
            name: date.toLocaleString('en-US', { weekday: 'long' }),
            date: date.getDate(),
            fullDate: date 
        };
    });

    const handleDateClick = (day) => {
        const isOdd = day.date % 2 !== 0;
        if (isOdd) {
            setSelectedOddDays(prevDays => {
                const newDays = [...prevDays, day.date];
                if (newDays.length === 3) {
                    navigate("/secret-video");
                    return [];
                }
                return newDays;
            });
        } else {
            setSelectedOddDays([]);
        }
    
        setSelectedDate(prevDate => (prevDate?.name === day.name ? null : day));
    };

    const statistics = () => {
        navigate("/dashboard/statisticsscreen");
    };

    const handleRedoInterview = () => {
        navigate("/dashboard");
    };

    const workouts = (store.userData?.routines?.[0]?.workouts || []);
    const sortedWorkouts = workouts.sort((a, b) => {
        const dateA = new Date(a.day);
        const dateB = new Date(b.day);
        return dateA - dateB; 
    });

    const assignedWorkouts = sortedWorkouts.map((workout, index) => {
        const today = new Date(); 
        const day = new Date(today); 
        day.setDate(today.getDate() + index);  
        return {
            ...workout,
            day: day.toISOString().split('T')[0] 
        };
    });
    

    console.log("Assigned Workouts:", assignedWorkouts);

    const selectedWorkout = assignedWorkouts.find(workout => {
        if (selectedDate?.fullDate) {
            const workoutDate = new Date(workout.day).toISOString().split('T')[0];
            const selectedWorkoutDate = selectedDate.fullDate.toISOString().split('T')[0];
            console.log(`Comparando: Workout Day ${workoutDate} con Selected Day ${selectedWorkoutDate}`);
            return workoutDate === selectedWorkoutDate;
        }
        return false;
    });

    console.log("Selected Workout:", selectedWorkout);

    const routineTable = () => {
        if (!selectedWorkout) {
            alert("No routine found for today.");
            return;
        }

        navigate("/dashboard/routine", { state: { day: currentWeek, workout: selectedWorkout } });
    };

    const handleStartRoutine = () => {
        if (selectedDate?.date === currentDate) {
            routineTable();
        } else {
            alert("You can only start the routine for today.");
        }
    };

    const getWorkoutForDate = (date) => {
        const formattedDate = date.toISOString().split('T')[0];  // Convertir a YYYY-MM-DD
        return assignedWorkouts.find(workout => {
            const workoutDate = new Date(workout.day).toISOString().split('T')[0]; // Asegurar formato
            console.log(`Comparando workoutDate ${workoutDate} con formattedDate ${formattedDate}`);
            return workoutDate === formattedDate;
        });
    };
    

    console.log("Días en currentWeek:", currentWeek);
    currentWeek.forEach(day => {
        console.log(`Buscando workout para ${day.fullDate}:`, getWorkoutForDate(day.fullDate));
    });

    return (
        <div className="landing-container">
            <div className="calendar-container">
                <Calendar 
                    monthName={currentMonth} 
                    currentWeek={currentWeek} 
                    onDateClick={handleDateClick} 
                    workouts={currentWeek.map(day => ({
                        date: day.fullDate,
                        workout: getWorkoutForDate(day.fullDate)
                    }))}
                />
            </div>

            <div className="routine-section">
                {selectedDate ? (
                    <>
                        <h3 className="selected-day-title">{selectedDate.name}</h3>
                        <ul className="routine-list">
                            {selectedWorkout && selectedWorkout.trainings && selectedWorkout.trainings.length > 0 ? (
                                selectedWorkout.trainings.map((exercise, i) => (
                                    <li key={i}>
                                        {exercise.fitness_level === "Descanso" ? "Descanso" : exercise.name}
                                    </li>
                                ))
                            ) : (
                                <p>No workout assigned for this day</p>
                            )}
                            <li className="texto-secreto">
                                Some days are more special than others... but only when they come in threes.
                            </li>
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
                <StartRoutineButton 
                    onClick={handleStartRoutine} 
                    className="routine-button" 
                />
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
