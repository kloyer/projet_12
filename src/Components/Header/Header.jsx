// src/components/Header.jsx
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import './Header.scss'
import logo from "../../assets/logo.png";

// Defining the Header functional component
export function Header() {
    return (
        <header className="header">
            {/* Displaying the logo */}
            <img src={logo} alt="SportSee" className="header__logo" />
            {/* Navigation menu */}
            <nav className="header__nav">
                {/* List of placeholder navigation links */}
                <ul className="header__nav-list">
                    <li className="header__nav-item"><a href="#" className="header__nav-link">Accueil</a></li>
                    <li className="header__nav-item"><a href="#" className="header__nav-link">Profil</a></li>
                    <li className="header__nav-item"><a href="#" className="header__nav-link">Réglage</a></li>
                    <li className="header__nav-item"><a href="#" className="header__nav-link">Communauté</a></li>
                </ul>
            </nav>
        </header>
    );
}
  
export default Header;
