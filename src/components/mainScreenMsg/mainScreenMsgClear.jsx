import React from 'react';
import MainScrMsg from './mainScreenMsg.module.css';
import LoaderGif from '../../assets/Loader/loaderGif.gif';

function MessagesClear(props){
    const messages = props.getMessagesUIMap(props.messagesList, props.errors, props.myUsername, props.roomIsExists);
    const sendNewMessage = () => props.sendNewMessage(props.errors, props.myUsername, props.roomID, props.changedTextareaMessage);
    const handleKeyPress = (event) =>  event.key === "Enter" ? sendNewMessage() : null;

    return (
        <div className="workspace">
            <img src={LoaderGif} alt="Loader" style={{display: 'none'}} />
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>
                    {props.messagesEmptyStatus ? <span className = {MainScrMsg.errors}>No saved messages from room.</span> : null}
                    <div className={MainScrMsg.messagesList}>
                        {messages}{/* render all messages from mapped array */}
                    </div>
                    <div className={MainScrMsg.controlElementsChat}>
                        <textarea name="newMessage"
                            cols="50"
                            rows="2"
                            placeholder="Enter new message"
                            style={{ resize: 'none' }}
                            onKeyPress={handleKeyPress}
                            onChange={props.messageTextareaChanged}
                            value={props.changedTextareaMessage} />
                        <button
                            type="button"
                            id={MainScrMsg.sendMessageBtn}
                            onClick={sendNewMessage}>Send Message</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MessagesClear;
