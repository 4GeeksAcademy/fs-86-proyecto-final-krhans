import React from "react";
import "../../styles/profile.css";
import { Link, useParams } from "react-router-dom";
import gabrielImageUrl from "../../img/gabriel-foto.png";
import cristianImageUrl from "../../img/cristian-foto.jpg";
import albantaImageUrl from "../../img/albanta-foto.jpg";
import marcoImageUrl from "../../img/marco-foto.jpg";


const profiles = {
    gabriel: { image: gabrielImageUrl, name: "Mugiwara-Tech", age: "31 años", role: "Full Stack Developer", bio: "I am a complete developer who masters front and back,he's a fighter in life", github: "https://github.com/gabriel-jimenez93", linkedin: "https://www.linkedin.com/in/gabriel-angel-jim%C3%A9nez-montoya-b9b6a1320/" },
    marco: { image: marcoImageUrl, name: "Marco", age: "27 años",role: "Full Stack Developer", bio: "I am in love with the front and with a lot of imagination to fulfill the dreams of my client", github: "https://github.com", linkedin: "https://linkedin.com" },
    cristian: { image: cristianImageUrl, name: "Cristian", age: "29 años", role: "Full Stack Developer", bio: "I am a silent worker who solves all backend problems", github: "https://github.com/Cristian-svg598", linkedin: "https://www.linkedin.com/in/cristian-guirao-espin-5b5a77310/" },
    albanta: { image: albantaImageUrl, name: "Albanta", age: "40 años", role: "Full Stack Developer", bio: "I am a front end creator with a lot of imagination", github: "https://github.com/Albanta22", linkedin: "https://www.linkedin.com/in/albanta-leon-delgado-521407316/" }
};

export const Profile = () => {
    const { member } = useParams();
    const profile = profiles[member];

    if (!profile) {
        return <h1>Perfil no encontrado</h1>;
    }

    return (
        <div className="profile-container">
            <div className="profile-card">
                <h2 className="profile-name">{profile.name}</h2>
                <img src={profile.image} alt={profile.name} className="profile-image" />
                <div className="profile-info">
                    <p><strong>Age:</strong> {profile.age}</p>
                    <p><strong>Rol:</strong> {profile.role}</p>
                    <p><strong>Profile:</strong> {profile.bio}</p>
                </div>
                <div className="profile-links">
                    <a href={profile.github} className="github-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-github"></i>
                    </a>
                    <a href={profile.linkedin} className="linkedin-link" target="_blank" rel="noopener noreferrer">
                        <i className="fab fa-linkedin"></i>
                    </a>
                </div>
                <Link to="/about">
                    <button className="back-button">Back</button>
                </Link>
            </div>
        </div>
    );
};
