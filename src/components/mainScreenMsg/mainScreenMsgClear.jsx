import React, {useEffect} from 'react';
import MainScrMsg from './mainScreenMsg.module.css';
import LoaderGif from '../../assets/Loader/loaderGif.gif';
import MainScreenMsgInputForm from './MainScreenMsgInputForm';
import MessagesChatPage from './MessagesChatPage';

function MessagesClear(props){

    //const handleKeyPress = (event) =>  event.key === "Enter" ? sendNewMessage() : null;
    return (
        <div className="workspace">
            <img src={LoaderGif} alt="Loader" style={{display: 'none'}} />
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>  
                    <MessagesChatPage {...props}/>
                    <hr />
                    <MainScreenMsgInputForm 
                    roomID = {props.roomID}
                    username = {props.myUsername}
                    errors = {props.errors}
                    sendNewMessage = {props.sendNewMessage}
                    deleteMessages = {props.deleteMessages}
                    //handleKeyPress = {handleKeyPress}
                    />
                </div>
            </main>
        </div>
    );
}

export default MessagesClear;
