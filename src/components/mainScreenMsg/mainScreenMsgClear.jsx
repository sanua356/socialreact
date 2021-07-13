import React from 'react';
import MainScrMsg from './mainScreenMsg.module.css';

function MainScreenMessages(props) {
    console.log(props);
    //get array messages from file with map
    const mappedMessagesArray = props.messagesList.map((message) =>
        <p
            key={props.messagesList.indexOf(message)}
            className={props.roleMessage(message.classRendering)}
        >
            {message.sender}: {message.messageText}
        </p >
    );
    //send new message from database
    //render component
    return (
        <div className="workspace">
            <main className={MainScrMsg.Main}>
                <div className={MainScrMsg.chatBlock}>
                    <div className={MainScrMsg.messagesList}>
                        {mappedMessagesArray}{/* render all messages from mapped array */}
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
