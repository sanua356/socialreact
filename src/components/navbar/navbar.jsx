import React from 'react';
import NavbarStyle from './navbar.module.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsernameIcon from "../../assets/Sidebar/username2.png";


function Navbar(props) {
    const mappedMenuArray = props.sidebarMenuItems.map((menuItem) =>
        <NavLink to={menuItem.link} key={props.sidebarMenuItems.indexOf(menuItem)} activeClassName = {NavbarStyle.activeLink}>
            <li className={NavbarStyle.menuItemStyle}>
                <span className ={NavbarStyle.menuItemIcon}>
                    <FontAwesomeIcon icon = {menuItem.icon} />
                </span>
                <span>{menuItem.itemName}</span>
            </li>
        </NavLink>
    );
    return (
        <div className={NavbarStyle.navbar}>
            <div className={NavbarStyle.userBlock}>
                <img src={UsernameIcon} alt="username" />
                <span>Your name: {props.myUsername}</span>
            </div>
            <nav>
                <ul>
                    {mappedMenuArray}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
