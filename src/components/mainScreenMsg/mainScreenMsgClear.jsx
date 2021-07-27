import React, {useEffect} from 'react';
import MainScrMsg from './mainScreenMsg.module.css';
import LoaderGif from '../../assets/Loader/loaderGif.gif';
import MainScreenMsgInputForm from './MainScreenMsgInputForm';

function MessagesClear(props){
    const messages = props.getMessagesUIMap(props.messagesList, props.errors, props.myUsername, props.roomIsExists);
    //const handleKeyPress = (event) =>  event.key === "Enter" ? sendNewMessage() : null;

    const chatScreen = React.createRef();
    useEffect(() => {
        console.log("CHAT RERENDERED");

    }, [props.messagesList])

    return (
        <div className="workspace">
            <img src={LoaderGif} alt="Loader" style={{display: 'none'}} />
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>
                    {props.messagesEmptyStatus 
                    ? <span className = {MainScrMsg.errors}>No saved messages from room.</span> 
                    : <div className={MainScrMsg.messagesList} ref ={chatScreen}>
                        {messages}{/* render all messages from mapped array */}
                    </div>}
                    
                    <hr />
                    <MainScreenMsgInputForm 
                    roomID = {props.roomID}
                    username = {props.myUsername}
                    errors = {props.errors}
                    sendNewMessage = {props.sendNewMessage}
                    //handleKeyPress = {handleKeyPress}
                    />
                </div>
            </main>
        </div>
    );
}

export default MessagesClear;
