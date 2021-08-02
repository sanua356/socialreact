import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
import HeaderStyle from './header.module.css';

const Header = React.memo((props, loadedFromMessagesPage = false) => {
    return (
        <div className={HeaderStyle.header}>
                        <div className={HeaderStyle.headerRoomInfo}>
                            <h3>{props.headerTitle}</h3>
                            <span>{props.headerDescription}</span>
                        </div>
                         {props.selectedMessagesLength >= 1 && loadedFromMessagesPage && 
                         <span className={HeaderStyle.selectedMessagesCounter}
                         >Messages selected: 
                            <aside>
                                {props.selectedMessagesLength}
                            </aside>
                        </span>}

                        <div className={HeaderStyle.headerControlsBtns}>
                            <a href="#">
                                <FontAwesomeIcon icon={faEllipsisH} className={"fas fa-lg"}/>
                            </a>
                            <a href="#"><FontAwesomeIcon icon={faBell} className={`"fas fa-lg" ${HeaderStyle.bellAnimation}`}/></a>
                        </div>
                    </div>
    );
});

export default Header;
