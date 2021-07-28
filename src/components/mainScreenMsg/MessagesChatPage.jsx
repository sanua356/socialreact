import React from 'react';
import MainScrMsgStyle from './mainScreenMsg.module.css';
import { useEffect, useState } from 'react';



function messageSenderStyle(usernameSenderMessage, myUsername) {
    if (myUsername === usernameSenderMessage) {
        return MainScrMsgStyle.myMessage;
    } else {
        return MainScrMsgStyle.opponentMessage;
    }
}
const getMessagesUIMap = (
    messagesList, 
    errors, 
    myUsername, 
    selectMessageFromChat, 
    selectedMessagesArray, 
    setMessageSelected, 
    messageSelected = false) =>{
    if (Object.keys(messagesList).length > 0) {
        const mappedMessagesArray = messagesList.map((message) =>
        <p
            key={messagesList.indexOf(message)}
            className = 
            {`
            ${messageSenderStyle(message.messageSender, myUsername)}
            ${selectedMessagesArray.indexOf(message.id) !== -1 ? MainScrMsgStyle.selectedMessage: null}`
            }
            onClick = {() => {
                selectMessageFromChat(message.id);
                setMessageSelected(!messageSelected);
            }}
        >
            <span>{message.messageSender}</span>: {message.message}
        </p >
        );
        return mappedMessagesArray;
    }else{
        return(
            <p className={MainScrMsgStyle.messagesList}>{errors}</p>
        )
    }
}

const MessagesChatPage = (props) => {
    const chatScreen = React.createRef(); //Реф на блок с сообщениями для скролла
    const [messageSelected, setMessageSelected] = useState(false); //Хук, срабатывающий, когда кликнули на сообщение

    const messages = getMessagesUIMap(
        props.messagesList,
        props.errors,
        props.myUsername,
        props.selectMessageFromChat,
        props.selectedMessages,
        setMessageSelected,
        messageSelected
);//Получить список всех сообщений с BLL
        useEffect(() => {
            chatScreen.current.scrollTop = chatScreen.current.scrollHeight;
        }, [props.messagesList]); //Скролл чата вниз, когда отправилось или удалилось сообщение

    return (
        <>
        {props.messagesEmptyStatus 
        ? <span className = {MainScrMsgStyle.errors}>No saved messages from room.</span> 
        : <div className={MainScrMsgStyle.messagesList} ref ={chatScreen}> 
            {messages}{/* render all messages from mapped array */}
        </div>}
        </>
    )
}

export default MessagesChatPage;
