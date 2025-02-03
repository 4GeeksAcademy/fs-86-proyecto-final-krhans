import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/signup.css"
import {  useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCity, faEnvelope, faLock, faPerson, faPhone, faUser } from "@fortawesome/free-solid-svg-icons";

const SignUpOverview = () => {

    const { actions, store } = useContext(Context);

    const navigate = useNavigate


    return (
        <div className="sign-up_container d-flex flex-column align-items-center justify-content-stretch">
            <h2 className="sign-up_title">sign Up</h2>
            <form className="sign-up_form">
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="text" id="userName" name="userName" required value={store.userName} onChange={(e) => actions.setUserName(e.target.value)} />
                    <label className="sign-up_label" htmlFor="userName"> <FontAwesomeIcon icon={faUser}/> Username</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input input className="sign-up_input"  type="email" id="email" name="email" required value={store.email} onChange={(e) => actions.setEmail(e.target.value)} />
                    <label className="sign-up_label" htmlFor="email"><FontAwesomeIcon icon={faEnvelope}/> Email</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="tel" id="phone" name="phone" required value={store.phone} onChange={(e) => actions.setPhone(e.target.value)} />
                    <label className="sign-up_label" htmlFor="phone"><FontAwesomeIcon icon={faPhone}/> Phone</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="text" id="city" name="city" required value={store.city} onChange={(e) => actions.setCity(e.target.value)} />
                    <label className="sign-up_label" htmlFor="city"><FontAwesomeIcon icon={faCity}/> City</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column ">
                    <select className="sign-up_input" id="gender" name="gender" required value={store.gender} onChange={(e) => actions.setGender(e.target.value)}>
                        <option value=""></option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                    <label className="sign-up_label" htmlFor="gender"><FontAwesomeIcon icon={faPerson}/> Gender</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <label className="sign-up_label-birthDate" htmlFor="birthDate">Birth Date</label>
                    <input className="sign-up_input" type="date" id="birthDate" name="birthDate" required value={store.birthDate} onChange={(e) => actions.setBirthDate(e.target.value)} />        
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="password" id="password" name="password" required value={store.password} onChange={(e) => actions.setPassword(e.target.value)} />
                    <label className="sign-up_label" htmlFor="password"><FontAwesomeIcon icon={faLock}/> Password</label>
                </div>
                <div className="sign-up_input-group d-flex flex-column">
                    <input className="sign-up_input" type="password" id="confirmPassword" name="confirmPassword" required value={store.confirmPassword} onChange={(e) => actions.setConfirmPassword(e.target.value)} />
                    <label className="sign-up_label" htmlFor="confirmPassword"><FontAwesomeIcon icon={faLock}/> Confirm Password</label>
                </div>

            </form>
            <button className="sign-up_button" onClick={() => actions.addNewUser(navigate)}>Sign Up</button>
            <p className="sign-up_link align-self-start">Have an account
                <Link to="/login">
                    <span>Log In</span>
                </Link>
            </p>

        </div>
    )
}

export default SignUpOverview;