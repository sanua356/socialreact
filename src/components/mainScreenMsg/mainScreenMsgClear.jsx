import React from 'react';
import MainScrMsg from './styles/messagesChatArea.module.css';
import MainScreenMsgInputForm from './MainScreenMsgInputForm';
import MessagesChatPage from './MessagesChatPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import {faBell} from '@fortawesome/free-regular-svg-icons';
function MessagesClear(props){

    return (
        <div className="workspace">
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>  
                    <div className={MainScrMsg.chatBlockHeader}>
                        <div className={MainScrMsg.chatBlockHeaderRoomInfo}>
                            <h3>Room: {props.roomID}</h3>
                            <span>Users: 3</span>
                        </div>

                         {props.selectedMessagesLength >= 1 && 
                         <span className={MainScrMsg.selectedMessagesCounter}
                         >Messages selected: 
                            <aside>
                                {props.selectedMessagesLength}
                            </aside>
                        </span>}

                        <div className={MainScrMsg.chatBlockHeaderControlsBtns}>
                            <a href="#">
                                <FontAwesomeIcon icon={faEllipsisH} className={"fas fa-lg"}/>
                            </a>
                            <a href="#"><FontAwesomeIcon icon={faBell} className={`"fas fa-lg" ${MainScrMsg.bellAnimation}`}/></a>
                        </div>
                    </div>
                    <MessagesChatPage {...props}/>
                    <MainScreenMsgInputForm 
                    roomID = {props.roomID}
                    username = {props.myUsername}
                    errors = {props.errors}
                    sendNewMessage = {props.sendNewMessage}
                    deleteMessages = {props.deleteMessages}
                    selectedMessages = {props.selectedMessages}
                    selectedMessagesLength = {props.selectedMessagesLength}
                    deleteMessages = {props.deleteMessages}
                    usernameSecretKey = {props.usernameSecretKey}
                    />
                </div>
            </main>
        </div>
    );
}

export default MessagesClear;
