import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import "../../styles/login.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, } from "@fortawesome/free-solid-svg-icons";

const LogInOverview = () => {

const {store, actions} = useContext(Context);

    return (
        <div className="log-in_container d-flex flex-column align-items-center justify-content-center">
            <h1 className="log-in_title">Log In</h1>
            <form className="log-in_form">
                <div className="log-in_input-group d-flex flex-column">
                    <input input className="log-in_input" type="email" id="email" name="email" required value={store.email} onChange={(e) => actions.setEmail(e.target.value)} />
                    <label className="log-in_label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope} /> Email</label>
                </div>
                <div className="log-in_input-group d-flex flex-column">
                    <input className="log-in_input" type="password" id="password" name="password" required value={store.password} onChange={(e) => actions.setPassword(e.target.value)} />
                    <label className="log-in_label" htmlFor="password"><FontAwesomeIcon icon={faLock}/> Password</label>
                </div>
            </form>
            <button className="log-in_button" onClick={() => actions.sesionInit()}>Log In</button>
            <p className="sign-up_link align-self-start">Don't have an account?
                <Link to="/signup">
                    <span>Sign Up</span>
                </Link>
            </p>
        </div>
    )

}

export default LogInOverview;