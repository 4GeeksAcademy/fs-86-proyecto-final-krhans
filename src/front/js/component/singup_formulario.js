import React, { useContext, useState,useRef,useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css"
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import UserData from "../clases/userdata";
import { Loader } from "./loader";

const SignUpOverview = () => {
    const { actions } = useContext(Context);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    
    const navigate = useNavigate();
    const isMounted = useRef(true);


    const confirmUser = async () => {
        let message = "";
        if (!userName) message = "Please insert username";
        if (!email) message = "Please insert email";
        if (!password) message = "Please insert password";
        if (!confirmPassword) message = "Please insert confirm password";
        if (password !== confirmPassword) message = "Passwords do not match";

        if (message === "") {
            setIsLoading(true);
            try {
                let user = new UserData();
                user.user_name = userName;
                user.email = email;
                user.password = password;

                const newUser = await actions.addNewUser(user.toJSON());
                if (isMounted.current) {
                    if (newUser) {
                        setPopupMessage("✅ Registration successful! Redirecting...");
                        setShowPopup(true);
                        setTimeout(() => {
                            if (isMounted.current) { 
                                setShowPopup(false);
                                navigate("/");
                            }
                        }, 3000);
                    } else {
                        setPopupMessage("❌ Registration failed. Try again.");
                        setShowPopup(true);
                    }
                }
            } catch (error) {
                console.error("Error en el registro:", error);
                if (isMounted.current) {
                    setPopupMessage("❌ An error occurred. Try again.");
                    setShowPopup(true);
                }
            } finally {
                setIsLoading(false);
                setTimeout(() => {
                    if (isMounted.current) { 
                        setShowPopup(false);
                    }
                }, 3000);
            }
        } else {
            setPopupMessage(message);
            setShowPopup(true);
            setTimeout(() => setShowPopup(false), 3000);
        }
    };

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    return (
        <div className="sign-up_container d-flex flex-column align-items-center justify-content-stretch">
            {isLoading && <Loader />}

            {!isLoading && (
                <>
                    <h1 className="sign-up_title text-center">
                        "Create action, motivation and grit. Bringing out the best in everyone"
                    </h1>
                    <form className="sign-up_form">
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="text" id="userName" name="userName" autoComplete="username" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                            <label className="sign-up_label" htmlFor="userName">
                                <FontAwesomeIcon icon={faUser} /> Username
                            </label>
                        </div>
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="email" id="email" name="email" autoComplete="username" required value={email} onChange={(e) => setEmail(e.target.value)} />
                            <label className="sign-up_label" htmlFor="email">
                                <FontAwesomeIcon icon={faEnvelope} /> Email
                            </label>
                        </div>
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="password" id="password" name="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                            <label className="sign-up_label" htmlFor="password">
                                <FontAwesomeIcon icon={faLock} /> Password
                            </label>
                        </div>
                        <div className="sign-up_input-group d-flex flex-column">
                            <input className="sign-up_input" type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                            <label className="sign-up_label" htmlFor="confirmPassword">
                                <FontAwesomeIcon icon={faLock} /> Confirm Password
                            </label>
                        </div>
                    </form>
                    <button className="sign-up_button" onClick={confirmUser}>Sign Up</button>
                    <p className="sign-up_link align-self-start">Have an account?  
                        <Link to="/login">
                            <span> Log In</span>
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

export default SignUpOverview;
