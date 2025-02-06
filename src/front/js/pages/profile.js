import React from "react";
import "../../styles/profile.css";
import { Link, useParams } from "react-router-dom";
import gabrielImageUrl from "../../img/gabriel-foto.jpg";
import cristianImageUrl from "../../img/cristian-foto.jpg";
import albantaImageUrl from "../../img/albanta-foto.jpg";


const profiles = {
    gabriel: { image: gabrielImageUrl, name: "Gabriel", age: "25 años", role: "Full Stack Developer", bio: "Soy un developer que vengo de Montserrat...", github: "https://github.com/gabriel-jimenez93", linkedin: "https://www.linkedin.com/in/gabriel-angel-jim%C3%A9nez-montoya-b9b6a1320/" },
    marco: { name: "Marco", age: "25 años",role: "Full Stack Developer", bio: "Me encanta diseñar experiencias interactivas...", github: "https://github.com", linkedin: "https://linkedin.com" },
    cristian: { image: cristianImageUrl, name: "Cristian", age: "25 años", role: "Super Back-End Developer", bio: "Apasionado del Backend...", github: "https://github.com/Cristian-svg598", linkedin: "https://www.linkedin.com/in/cristian-guirao-espin-5b5a77310/" },
    albanta: { image: albantaImageUrl, name: "Albanta", age: "40 años", role: "Full Stack Developer", bio: "Deseando cambiar de vida...", github: "https://github.com/Albanta22", linkedin: "https://www.linkedin.com/in/albanta-leon-delgado-521407316/" }
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
                    <p><strong>Edad:</strong> {profile.age}</p>
                    <p><strong>Rol:</strong> {profile.role}</p>
                    <p><strong>Perfil:</strong> {profile.bio}</p>
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
                    <button className="back-button">Volver</button>
                </Link>
            </div>
        </div>
    );
};
