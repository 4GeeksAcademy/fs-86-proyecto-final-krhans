import React from "react";
import '../../styles/accessRoutine.css';
import RoutineOverview from "../component/routineOverview.js";

    const ExerciseTable = () => {
        const exercises = [
            { id: 1, name: "Push-ups", type: "Strength", duration: "10 min" },
            { id: 2, name: "Running", type: "Cardio", duration: "30 min" },
            { id: 3, name: "Yoga", type: "Flexibility", duration: "20 min" }
        ];

        return (
            <div className="exercise-container">
                <h2 className="exercise-container__title">Exercise Table</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Name</th>
                            <th className="border p-2">Type</th>
                            <th className="border p-2">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {exercises.map((exercise) => (
                            <tr key={exercise.id} className="border">
                                <td className="border p-2">{exercise.name}</td>
                                <td className="border p-2">{exercise.type}</td>
                                <td className="border p-2">{exercise.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    // Página que contiene ambos componentes
    const ExercisePage = () => {
        return (
            <div className="p-8 flex flex-col gap-4">
                <RoutineOverview />
                <ExerciseTable />
                
            </div>
        );
    };

    export default ExercisePage;