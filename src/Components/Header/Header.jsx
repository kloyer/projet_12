import React from 'react';
import './Header.scss'
import logo from "../../assets/logo.png";

export function Header() {
    return (
        <header className="header">
            <img src={logo} alt="SportSee" className="header__logo" />
            <nav className="header__nav">
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