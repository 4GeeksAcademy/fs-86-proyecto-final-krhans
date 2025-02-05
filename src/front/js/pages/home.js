import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import KhransAvatar from "../../img/Khrans-avatar.webp";
import {Loader} from "../component/loader.js";

export const Home = () => {
	const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(true);
	const [showWelcome, setShowWelcome] = useState(false);
	const [showHelp, setShowHelp] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            await new Promise((resolve) => setTimeout(resolve, 2000));
            setIsLoading(false);
        };

        loadData();

        const welcomeTimer = setTimeout(() => {
            setShowWelcome(true);
        }, 4000);

        const helpTimer = setTimeout(() => {
            setShowWelcome(false);
            setShowHelp(true);
        }, 6000);

        return () => {
            clearTimeout(welcomeTimer);
            clearTimeout(helpTimer);
        };
    }, []);

    if (isLoading) {
        return <Loader />;
    }

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
