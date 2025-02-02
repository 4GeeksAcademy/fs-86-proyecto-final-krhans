import React from "react";
import "../../styles/about.css"; 
import rigoImageUrl from "../../img/rigo-baby.jpg"; 

export const About = () => {
    const teamMembers = [
        { id: 1, name: "GABRIEL", image: rigoImageUrl },
        { id: 2, name: "CRISTIAN", image: rigoImageUrl },
        { id: 3, name: "MARCO", image: rigoImageUrl },
        { id: 4, name: "ALBANTA", image: rigoImageUrl }
    ];

    return (
        <div className="container text-center">
            
            <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
                <div className="container-fluid">
                    <div className="navbar-brand d-flex align-items-center">
                        <img src={rigoImageUrl} className="mascot" alt="Mascot" />
                        <span className="team-name">KRHANS</span>
                    </div>
                    <button className="btn btn-outline-light back-button">
                        Volver
                    </button>
                </div>
            </nav>

      
            <div className="row justify-content-center team-section">
                {teamMembers.map(member => (
                    <div key={member.id} className="col-md-3">
                        <div className="team-member-card">
                            <img src={member.image} alt={member.name} className="member-image" />
                            <h2 className="member-name">{member.name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
