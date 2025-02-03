import React, { useState } from "react";
import "../../styles/navbar.css";

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="navbar-container">
            <div className="navbar-button" onClick={toggleMenu}>
                {isMenuOpen ? "KHRANS" : "K"}
            </div>

            {isMenuOpen && (
                <div className="navbar-menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about-us">About us</a></li>
                    </ul>
                </div>
            )}
        </nav>
    );
};