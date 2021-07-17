import React from 'react';
import { ADD_NEW_MESSAGE_FROM_DATA_BASE_AC, CHANGE_TEXTAREA_MESSAGE_AC, GET_MESSAGES_LIST_FROM_API_АС } from '../../redux/reducers/messagesChatReducer';
import MainScrMsg from "./mainScreenMsgClear";
import MainScrMsgStyle from './mainScreenMsg.module.css';
import { connect } from 'react-redux';
import * as axios from "axios";

function messageSenderStyle(usernameSenderMessage, myUsername) {
    if (myUsername == usernameSenderMessage) {
        return MainScrMsgStyle.myMessage;
    } else {
        return MainScrMsgStyle.opponentMessage;
    }
}
const getMessagesFromServer = async (roomID, dispatch) => {
    await axios.get(`http://socialreactapi/roomsgetmessages.php?roomid=${roomID}`)
      .then((response) => {
        dispatch(GET_MESSAGES_LIST_FROM_API_АС(roomID, response.data));
      })
      .catch( (error) =>{
        console.log(error);
    });
}
const getMessagesUIMap = (messagesList, errors, myUsername) =>{
    if (!errors) {
        const mappedMessagesArray = messagesList.map((message) =>
        <p
            key={messagesList.indexOf(message)}
            className={messageSenderStyle(message.messageSender, myUsername)}
        >
            {message.messageSender}: {message.message}
        </p >
        );
        return mappedMessagesArray;
    }else{
        return(
            <p className={MainScrMsgStyle.messagesList}>{errors}</p>
        )
    }
}


const mapStateToProps = (state) =>{
    return{
        myUsername: state.manyPages.username,
        roomID: state.manyPages.roomID,
        messagesList: state.messagesPage.messagesList,
        changedTextareaMessage: state.messagesPage.changedTextareaMessage,
        errors: state.messagesPage.errors
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        sendNewMessage: () => {
            dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE_AC());
        },
        enterKeyPressed: (e) =>{
            if (e.key === 'Enter') {
                dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE_AC());
            }
        },
        roleMessage: (usernameSenderMessage, myUsername) =>{
            return messageSenderStyle(usernameSenderMessage, myUsername);
        },
        messageTextareaChanged: (data) =>{
            dispatch(CHANGE_TEXTAREA_MESSAGE_AC(data.target.value));
        },
        getMessagesFromServer: (roomID) =>{
            getMessagesFromServer(roomID, dispatch);   
        },
        getMessagesUIMap: (messagesList, errors, myUsername) => {
            return getMessagesUIMap(messagesList, errors, myUsername);
        }
    }
}
const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MainScrMsg);
export default MessagesContainer;
