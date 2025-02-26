import React, {useState, useEffect} from "react";
import "../../styles/profile.css";
import { Link, useParams } from "react-router-dom";
import { dispatcherUser } from "../store/dispatcher.js";

const profiles = {
    gabriel: { name: "Gabriel", age: "31 años", role: "Full Stack Developer", bio: "I am a complete developer who masters front and back,he's a fighter in life", github: "https://github.com/gabriel-jimenez93", linkedin: "https://www.linkedin.com/in/gabriel-angel-jim%C3%A9nez-montoya-b9b6a1320/", videoId: "323662863497984",  phrase: "Soy un PUTO y he dejado que mi maestro me llene este mensaje por que no le he contestado a tiempo"  },
    marco: {name: "Marco", age: "27 años",role: "Full Stack Developer", bio: "I am in love with the front and with a lot of imagination to fulfill the dreams of my client", github: "https://github.com", linkedin: "https://linkedin.com", videoId: "323663645996416", phrase:"Starting the journey... seeking self-improvement, chasing success."},
    cristian: {name: "Cristian", age: "29 años", role: "Full Stack Developer", bio: "I am a silent worker who solves all backend problems", github: "https://github.com/Cristian-svg598", linkedin: "https://www.linkedin.com/in/cristian-guirao-espin-5b5a77310/", videoId: "323664833803904", phrase:"Programming is like writing a book... except that if you forget a comma on one page, the dragon explodes. 🐉💥" },
    albanta: {name: "Albanta", age: "40 años", role: "Full Stack Developer", bio: "I am a front end creator with a lot of imagination", github: "https://github.com/Albanta22", linkedin: "https://www.linkedin.com/in/albanta-leon-delgado-521407316/", videoId: "323664567879552", phrase:"A journey of discipline and effort, from police officer to programmer; let's begin the adventure of our app, motivation, and sports."}
};

export const Profile = () => {
    const { member } = useParams();
    const profile = profiles[member] || null;
    const [videoUrls, setVideoUrls] = useState({});

    useEffect(() => {
        const fetchVideos = async () => {
            const videoRequests = Object.entries(profiles).map(async ([key, { videoId }]) => {
                const result = await dispatcherUser.fetchVideoUrl(videoId);
                return { key, url: result.url || null };
            });
            const videos = await Promise.all(videoRequests);
            const videoMap = videos.reduce((acc, { key, url }) => {
                acc[key] = url;
                return acc;
            }, {});

            setVideoUrls(videoMap);
        };

        fetchVideos();
    }, []);

    if (!profile) {
        return <h1>Perfil no encontrado</h1>;
    }

    return (
        <div className="profile-container">
             <div className="profile-phrase">
                <p>{profile.phrase}</p>
            </div>
            <div className="profile-card">
                <video src={videoUrls[member]} className="profile-image" autoPlay loop muted />
                <h2 className="profile-name">{profile.name}</h2>
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
