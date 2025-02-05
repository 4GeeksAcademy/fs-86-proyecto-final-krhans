import React, { useState } from "react";
import { useNavigate,Link } from "react-router-dom";
import "../../styles/navbar.css";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleLogin = () => {
        navigate("/login");
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-button" onClick={toggleMenu}>
                {isMenuOpen ? "KHRANS" : "K"}
            </div>

            {isMenuOpen && (
                <div className="navbar-menu">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About us</Link></li>
                    </ul>
                </div>
            )}
            <div className="navbar-button">
                <button className="login-button" onClick={handleLogin}>Log In</button>
            </div>
        </nav>
    );
};
