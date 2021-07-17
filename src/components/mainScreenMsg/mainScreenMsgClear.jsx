import React from 'react';
import MainScrMsg from './mainScreenMsg.module.css';
import { useEffect } from "react";

function MainScreenMessages(props) {
    //get array messages from file with map

    useEffect(() => {
        props.getMessagesFromServer(props.roomID);
    }, []) //get messages from server API 
    const messages = props.getMessagesUIMap(props.messagesList, props.errors, props.myUsername);
    //render component
    return (
        <div className="workspace">
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>
                    <div className={MainScrMsg.messagesList}>
                        {messages}{/* render all messages from mapped array */}
                    </div>
                    <div className={MainScrMsg.controlElementsChat}>
                        <textarea name="newMessage"
                            cols="50"
                            rows="2"
                            placeholder="Enter new message"
                            style={{ resize: 'none' }}
                            onKeyPress={props.enterKeyPressed}
                            onChange={props.messageTextareaChanged}
                            value={props.changedTextareaMessage} />
                        <button
                            type="button"
                            id={MainScrMsg.sendMessageBtn}
                            onClick={props.sendNewMessage}>Send Message</button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default MainScreenMessages;
