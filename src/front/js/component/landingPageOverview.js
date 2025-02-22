// import React, { useState, useEffect, useContext } from "react";
// import { useNavigate } from "react-router-dom";
// import { Context } from "../store/appContext";
// import "../../styles/landingPageOverview.css";
// import KhransAvatar from "../../img/Khrans-avatar.webp";

// const LandingPageOverview = () => {
//     const { store } = useContext(Context);
//     const [motivationalPhrase, setMotivationalPhrase] = useState("Today is a great day to make progress!");
//     const [todayDate, setTodayDate] = useState(""); 
//     const navigate = useNavigate();

//     useEffect(() => {
//         const today = new Date().toLocaleDateString();
//         setTodayDate(today);
//     }, []);

//     // 📌 Función para ir a la rutina con el ID generado
//     const handleStartRoutine = () => {
//         if (store.userData.routine.id) {
//             navigate(`/dashboard/routine/`); 
//         } else {
//             console.error("❌ No se encontró un ID de rutina.");
//         }
//     };

//     return (
//         <div className="fit-page-container">
//             <div className="motivational-phrase">
//                 <p><b>{motivationalPhrase}</b></p>
//             </div>
//             <div className="calendar-avatar-container">
//                 <div className="calendar">
//                     <h3>Weekly Calendar</h3>
//                     <ul>
//                         <li>{todayDate}</li> 
//                     </ul>
//                 </div>
//                 <div className="avatar-emotions">
//                     <img src={KhransAvatar} alt="Avatar" className="avatar-image" />
//                     <p>Avatar with various emotions...</p>
//                     <button className="statistics-button">STATISTICS</button>
//                 </div>
//             </div>
//             <div className="bottom-container">
//                 <div className="spotify-api">
//                     <p>SOUND CLOUD</p>
//                 </div>
//                 <div className="exercise-table">
//                     <button className="start-routine-button" onClick={handleStartRoutine}>
//                         Start Routine
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default LandingPageOverview;
