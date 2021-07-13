import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import HeadStyle from './header.module.css';
import { NavLink } from 'react-router-dom';

function Header(props) {
    return (
        <div className="header-block">
            <header className={HeadStyle.header}>
                <div className={HeadStyle.UserBlock}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Hello, {props.username}!</span>
                    <span>Your room: {props.roomID}</span>
                </div>
                <div className={HeadStyle.LogoBlock}>Anonymous chat</div>
                <div className={HeadStyle.MenuBlock}>
                    <nav>
                        <ul className={HeadStyle.menu}>
                            <NavLink to="/logout">
                                <li className={HeadStyle.menuItem} >Logout Chat</li>
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Header;
