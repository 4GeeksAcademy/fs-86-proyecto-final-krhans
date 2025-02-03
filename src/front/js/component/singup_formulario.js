import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css"
import {  useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import UserData from "../clases/userdata";
const SignUpOverview = () => {

    const { actions, store } = useContext(Context);
    const [userName, setUserName ]= useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    

    const navigate = useNavigate;
    
    const confirmUser = () => {
        let message = "";
        let user = new UserData();
        if(!userName || userName === "") message = "Please insert username";
        if(!email || email === "")message = "Please insert email";
        if(!password || password === "")message = "Please insert password";
        if(!confirmPassword || confirmPassword === "")message = "Please insert confirm password";
        if(password != confirmPassword) message = "Passwords do not match";
        if(message == ""){
            user.userName = userName;
            user.email = email;
            user.password = password
            actions.addNewUser(user)
        }else{
            alert(message);
        };
    };

    
    

    return (
        <div className="sign-up_container d-flex flex-column align-items-center justify-content-stretch">
            <h1 className="sign-up_title text-center">"Create action, motivation and grit.
            Bringing out the best in everyone"</h1>
            <form className="sign-up_form">
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="text" id="userName" name="userName" autoComplete="userName" required value={userName} onChange={(e) => setUserName(e.target.value)} />
                    <label className="sign-up_label" htmlFor="userName"> <FontAwesomeIcon icon={faUser}/> Username</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input"  type="email" id="email" name="email" autoComplete="userName" required value={email} onChange={(e) => setEmail(e.target.value)} />
                    <label className="sign-up_label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/> Email</label>
                </div>               
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="password" id="password" name="password" autoComplete="new-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label className="sign-up_label" htmlFor="password"><FontAwesomeIcon icon={faLock}/> Password</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="password" id="confirmPassword" name="confirmPassword" autoComplete="new-password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                    <label className="sign-up_label" htmlFor="confirmPassword"><FontAwesomeIcon icon={faLock}/> Confirm Password</label>
                </div>

            </form>
            <button className="sign-up_button" onClick={confirmUser}>Sign Up</button>
            <p className="sign-up_link align-self-start">Have an account <b/>
                <Link to="/login">
                    <span>Log In</span>
                </Link>
            </p>

        </div>
    )
}

export default SignUpOverview;