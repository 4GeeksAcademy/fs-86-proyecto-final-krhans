import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/about.css";
import gabrielImageUrl from "../../img/gabri-small.jpg";
import cristianImageUrl from "../../img/cristian-foto.jpg";
import albantaImageUrl from "../../img/albanta-small.jpg";
import marcoImageUrl from "../../img/marco-small.jpg";

export const About = () => {
    const navigate = useNavigate();
    const [showText, setShowText] = useState(false);
    
    useEffect(() => {
        setTimeout(() => setShowText(true), 1000);
    }, []);

    const teamMembers = [
        { id: "gabriel", name: "Mugiwara Tech", image: gabrielImageUrl },
        { id: "cristian", name: "Cristian", image: cristianImageUrl },
        { id: "marco", name: "Marco", image: marcoImageUrl },
        { id: "albanta", name: "Albanta", image: albantaImageUrl }
    ];

    return (
        <div className="container text-center">
            <nav className="navbar navbar-expand-lg custom-navbar">
                <div className="container-fluid justify-content-end">
                </div>
            </nav>

            <div className="about-message">
                {showText && <h2 className="fade-in">Our journey: Dream, fight and achieve</h2>}
            </div>

            <div className="team-section">
                {teamMembers.map(member => (
                    <div key={member.id} className="team-member-card" onClick={() => navigate(`/profile/${member.id}`)}>
                        <img src={member.image} alt={member.name} className="member-image" />
                        <h2 className="member-name">{member.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    );
};
