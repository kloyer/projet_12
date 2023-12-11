import React from 'react';
import './Sidebar.scss';
import iconMeditation from '../../assets/icon1.png';
import iconSwiming from '../../assets/icon2.png';
import iconBike from '../../assets/icon3.png';
import iconDumbBell from '../../assets/icon4.png';

export function Sidebar({ chartActivity }) {
  
    return (
        <div className="sidebar__container">
            <nav className="sidebar__nav">
                <img src={iconMeditation} alt="Meditation" />
                <img src={iconSwiming} alt="Swiming" />
                <img src={iconBike} alt="Bike" />
                <img src={iconDumbBell} alt="Dumb-Bell" />
                <div className="sidebar__copyright">
                    <p>Copyright, SportSee 2020</p>
                </div>
            </nav>
        </div>
    );
  }
  
  
  export default Sidebar;