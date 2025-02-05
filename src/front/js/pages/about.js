import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/about.css";
import rigoImageUrl from "../../img/rigo-baby.jpg";

export const About = () => {
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    
    useEffect(() => {
        setTimeout(() => setShowText(true), 1000);
    }, []);

    const teamMembers = [
        { id: "gabriel", name: "Gabriel", image: rigoImageUrl },
        { id: "cristian", name: "Cristian", image: rigoImageUrl },
        { id: "marco", name: "Marco", image: rigoImageUrl },
        { id: "albanta", name: "Albanta", image: rigoImageUrl }
    ];

    return (
        <div className="container text-center">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid justify-content-end">
                    <button className="home-button" onClick={() => navigate("/")}> 
                        <i className="fas fa-home"></i>
                    </button>
                </div>
            </nav>

            <div className="about-message">
                {showText && <h2 className="fade-in">Our journey: Dream, fight and achieve</h2>}
            </div>

            <div className="row justify-content-center team-section">
                {teamMembers.map(member => (
                    <div key={member.id} className="col-md-3">
                        <div className="team-member-card" onClick={() => navigate(`/profile/${member.id}`)}>
                            <img src={member.image} alt={member.name} className="member-image" />
                            <h2 className="member-name">{member.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
