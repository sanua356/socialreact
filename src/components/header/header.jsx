import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import HeadStyle from './header.module.css';
import { NavLink } from 'react-router-dom';

const Header = React.memo((props) => {
    return (
        <div className="header-block">
            <header className={HeadStyle.header}>
                <div className={HeadStyle.UserBlock}>
                    <FontAwesomeIcon icon={faUser} />
                    <span>Hello, {props.username}!</span>
                    <span>Your room: {props.roomID}</span>
                </div>
                <div className={HeadStyle.LogoBlock}>
                    <a href = "/messages">
                         Anonymous chat
                    </a>
                </div>
                <div className={HeadStyle.MenuBlock}>
                    <nav>
                        <ul className={HeadStyle.menu}>
                            <NavLink to="/logout">
                                <FontAwesomeIcon icon={faDoorOpen} />
                                <li className={HeadStyle.menuItem} >Logout Chat</li>
                            </NavLink>
                        </ul>
                    </nav>
                </div>
            </header>
        </div>
    );
});

export default Header;
