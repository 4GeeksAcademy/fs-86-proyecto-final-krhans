import React, { useState, useEffect } from 'react'; 
import '../../styles/statisticsScreen.css';
import KhransAvatar from "../../img/Khrans-avatar.webp";

const StatisticsScreen = () => {
    const [showStats, setShowStats] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowStats(true);
        }, 2000); 
    }, []);

    return (
        <div className="statistics-container">
            <div className="motivational-phrase">
                <h2>Sigue así, ¡tú puedes!</h2>
                <img src={KhransAvatar} alt="Avatar" className="avatar-image" />
            </div>
            <div className="progress-container">
                <div className="progress-chart">
                    <h3>Progreso Semanal</h3>
                    
                </div>
                <div className="exercise-info">
                    <h3>Ejercicio Destacado</h3>
                    <div className="exercise-graph">
                       
                    </div>
                    <div className={`exercise-stats ${showStats ? 'show' : ''}`}>
                        <div className="stat-item">
                            <h4>Porcentaje</h4>
                            <div className="stat-value">80%</div>
                        </div>
                        <div className="stat-item">
                            <h4>Nivel</h4>
                            <div className="stat-value">Avanzado</div>
                        </div>
                        <div className="stat-item">
                            <h4>Pendiente</h4>
                            <div className="stat-value">15%</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatisticsScreen;

