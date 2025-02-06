import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate } from "react-router-dom"; 
import "../../styles/login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { Loader } from "./loader";

const LogInOverview = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { store, actions } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate(); 

    const login = async () => {
        let message = "";
        if (!email) message = "Please insert email";
        if (!password) message = "Please insert password";

        if (message === "") {
            setIsLoading(true); 

            try {
                const success = await actions.login(email, password);
                if (success) {
                    setPopupMessage("✅ Login successful! Redirecting...");
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        navigate("/"); 
                    }, 3000);
                } else {
                    setPopupMessage("❌ Login failed. Please check your credentials.");
                    setShowPopup(true);
                }
            } catch (error) {
                setPopupMessage(`❌ ${error.message || 'Try again.'}`);
                setShowPopup(true);
            } finally {
                setIsLoading(false);
                setTimeout(() => setShowPopup(false), 3000);
            }
        } else {
            setPopupMessage(message);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    return (
        <div className="log-in_container d-flex flex-column align-items-center justify-content-center">
            {isLoading && <Loader />}

            {!isLoading && (
                <>
                    <h1 className="log-in_title text-center">"Fuel your passion, unlock your potential."</h1>
                    <form className="log-in_form">
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="email" id="email" name="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="sign-up_label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                        </div>
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="password" id="password" name="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label className="sign-up_label" htmlFor="password"><FontAwesomeIcon icon={faLock} /> Password</label>
                        </div>
                    </form>
                    <button className="log-in_button" onClick={login}>Log In</button>
                    <p className="sign-up_link align-self-start">Don't have an account? <b/>
                        <Link to="/signup">
                            <span>Sign Up</span>
                        </Link>
                    </p>
                </>
            )}

            {showPopup && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default LogInOverview;
