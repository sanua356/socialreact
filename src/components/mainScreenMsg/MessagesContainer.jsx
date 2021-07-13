import React from 'react';
import { ADD_NEW_MESSAGE_FROM_DATA_BASE, CHANGE_TEXTAREA_MESSAGE } from '../../redux/reducers/messagesChatReducer';
import MainScrMsg from "./mainScreenMsgClear";
import MainScrMsgStyle from './mainScreenMsg.module.css';
import { connect } from 'react-redux';

function messageSenderStyle(serverDataStyleMessage) {
    if (serverDataStyleMessage === 'myMessage') {
        return MainScrMsgStyle.myMessage;
    } else {
        return MainScrMsgStyle.opponentMessage;
    }
}

const mapStateToProps = (state) =>{
    return{
        messagesList: state.messagesPage.messagesList,
        changedTextareaMessage: state.messagesPage.changedTextareaMessage
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        sendNewMessage: () => {
            dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE());
        },
        enterKeyPressed: (e) =>{
            if (e.key === 'Enter') {
                dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE());
            }
        },
        roleMessage: (serverDataStyleMessage) =>{
            return messageSenderStyle(serverDataStyleMessage);
        },
        messageTextareaChanged: (data) =>{
            dispatch(CHANGE_TEXTAREA_MESSAGE(data.target.value));
        } 
    }
}
const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MainScrMsg);
export default MessagesContainer;
