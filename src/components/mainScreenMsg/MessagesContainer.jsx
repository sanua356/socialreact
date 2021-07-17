import React from 'react';
import { ADD_NEW_MESSAGE_FROM_DATA_BASE_AC, CHANGE_LOADING_STATUS_AC, CHANGE_TEXTAREA_MESSAGE_AC, GET_MESSAGES_LIST_FROM_API_АС } from '../../redux/reducers/messagesChatReducer';
import MainScrMsg from "./mainScreenMsgClear";
import MainScrMsgStyle from './mainScreenMsg.module.css';
import { connect } from 'react-redux';
import * as axios from "axios";

function messageSenderStyle(usernameSenderMessage, myUsername) {
    if (myUsername === usernameSenderMessage) {
        return MainScrMsgStyle.myMessage;
    } else {
        return MainScrMsgStyle.opponentMessage;
    }
}
const getMessagesFromServer = async (roomID, dispatch, isLoading) => {
    dispatch(CHANGE_LOADING_STATUS_AC(true));
    await axios.get(`http://socialreactapi/roomsgetmessages.php?roomid=${roomID}`)
      .then((response) => {
        dispatch(GET_MESSAGES_LIST_FROM_API_АС(roomID, response.data));
        dispatch(CHANGE_LOADING_STATUS_AC(false));
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
const sendNewMessage = async (errors, myUsername, roomID, dispatch) =>{
    
    let payload = { username: myUsername, message: '123' };
    let res = await axios.post(`http://socialreactapi/addnewmessage.php?roomid=${roomID}`, payload);
    let data = res.data;
    console.log(data);
}

const mapStateToProps = (state) =>{
    return{
        myUsername: state.manyPages.username,
        roomID: state.manyPages.roomID,
        messagesList: state.messagesPage.messagesList,
        changedTextareaMessage: state.messagesPage.changedTextareaMessage,
        errors: state.messagesPage.errors,
        isLoading: state.messagesPage.isLoading
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        sendNewMessage: (errors, myUsername, roomID) => {
            dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(errors, myUsername, roomID));
        },
        enterKeyPressed: (e, errors, myUsername) =>{
            if (e.key === 'Enter') {
                dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(errors, myUsername));
            }
        },
        roleMessage: (usernameSenderMessage, myUsername) =>{
            return messageSenderStyle(usernameSenderMessage, myUsername);
        },
        messageTextareaChanged: (data) =>{
            dispatch(CHANGE_TEXTAREA_MESSAGE_AC(data.target.value));
        },
        getMessagesFromServer: (roomID, loadingStatus) =>{
            getMessagesFromServer(roomID, dispatch, loadingStatus);   
        },
        getMessagesUIMap: (messagesList, errors, myUsername) => {
            return getMessagesUIMap(messagesList, errors, myUsername);
        },
        changeLoadingStatus: (loadingStatus) =>{
            dispatch(CHANGE_LOADING_STATUS_AC(loadingStatus));
        }
    }
}
const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MainScrMsg);
export default MessagesContainer;
