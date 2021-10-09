import React from 'react';
import NavbarStyle from './navbar.module.css'
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UsernameIcon from "../../assets/Sidebar/username2.png";
import { connect } from 'react-redux';


function Navbar(props) {
    const mappedMenuArray = props.sidebarMenuItems.map((menuItem) =>
        <NavLink to={menuItem.link} key={props.sidebarMenuItems.indexOf(menuItem)} activeClassName = {NavbarStyle.activeLink}>
            <li className={NavbarStyle.menuItemStyle}>
                <span className={NavbarStyle.menuItemIcon}>
                    <FontAwesomeIcon icon = {menuItem.icon} />
                </span>
                <span className={NavbarStyle.menuItemName}>{menuItem.itemName}</span>
            </li>
        </NavLink>
    );
    return (
        <div className={NavbarStyle.navbar}>
            <h2 className={NavbarStyle.navbarSiteTitle}>ANONUMOUS CHAT</h2>
            <div className={NavbarStyle.userBlock}>
                <img src={UsernameIcon} alt="username" />
                <span>Your name: {props.username}</span>
            </div>
            <nav>
                <ul>
                    {mappedMenuArray}
                </ul>
            </nav>
        </div>
    );
}

const mapStateToProps = (state) =>{
    return {
        username: state.manyPages.username,
        sidebarMenuItems: state.sidebarPage.sidebarMenuItems
    }
}

const NavbarContainer = connect(mapStateToProps, null)(Navbar);
export default NavbarContainer;
