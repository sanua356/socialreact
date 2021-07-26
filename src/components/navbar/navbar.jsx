import React from 'react';
import NavbarStyle from './navbar.module.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Navbar(props) {
    const mappedMenuArray = props.sidebarMenuItems.map((menuItem) =>
        <NavLink to={menuItem.link} key={props.sidebarMenuItems.indexOf(menuItem)}>
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
            <nav>
                <ul>
                    {mappedMenuArray}
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;
