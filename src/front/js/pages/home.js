import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import KhransAvatar from "../../img/Khrans-avatar.webp";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [showWelcome, setShowWelcome] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

	useEffect(() => {
        
        const timer = setTimeout(() => {
            setShowWelcome(true);
        }, 2000);

        const helpTimer = setTimeout(() => {
            setShowWelcome(false);
            setShowHelp(true);
        }, 4000); 

        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(helpTimer);
        };
    }, []);

	return (
		<div className="home-container">
			<div className="messages-container">
                {showWelcome && <h1 className="welcome-message">¡Bienvenido a Khrans!</h1>}
                {showHelp && <h2 className="help-message">¿En qué te puedo ayudar?</h2>}
            </div>
            <div className="avatar-container">
                <img src={KhransAvatar} alt="Khrans Avatar" className="khrans-image" />
            </div>
        </div>
	);
};
