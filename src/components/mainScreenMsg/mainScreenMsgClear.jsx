import React from 'react';
import MainScrMsg from './styles/messagesChatArea.module.css';
import MainScreenMsgInputForm from './MainScreenMsgInputForm';
import MessagesChatPage from './MessagesChatPage';
import Header from './../Header/Header';

function MessagesClear(props){
    return (
        <div className="workspace">
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>  
                    <Header 
                    {...props} 
                    loadedFromMessagesPage = {true}
                    headerTitle = {`Room: ${props.roomID}`}
                    headerDescription = "Users: 3"
                    />
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
