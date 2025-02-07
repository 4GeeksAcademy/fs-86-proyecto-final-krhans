import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/welcomePage.css";
import KhransWelcome from "../../img/KHRANSWelcome.gif";

const WelcomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => {
            navigate("/dashboard");
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigate]);

    return (
        <div className="welcome-container">
            <h2>CONGRATULATIONS!!</h2>
            <div className="message-container">
                <h3 className="philosophical-message">
                    "The first step is always the hardest, but it's also the most important."
                </h3>
            </div>
            <div className="avatar-container">
                <img
                    src={KhransWelcome}
                    alt="Khrans Avatar"
                    className="khrans-avatar"
                />
            </div>
        </div>
    );
};

export default WelcomePage;