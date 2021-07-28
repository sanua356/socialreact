import React from 'react';
import { useEffect } from "react";
import Loader from '../CommonComponents/Loader/Loader';
import MainScreenMsgClear from "./MainScreenMsgClear";
import { connect } from 'react-redux';
import { CHANGE_LOADING_STATUS_AC, addNewMessageFromServerTC} from '../../redux/reducers/messagesChatReducer';
import { SELECT_MESSAGE_FROM_CHAT_AC } from './../../redux/reducers/messagesChatReducer';

function MainScreenMessagesLogicComponent(props) {
    //get array messages from file with map
    useEffect(() => {
        props.getMessagesFromServerTC(props.roomID, props.roomIsExists);
    }, []) //get messages from server API 
    return(
        <>
        {props.isLoading ? <Loader/> : <MainScreenMsgClearComponent />}
        </>
    )
}


const mapStateToProps = (state) =>{
    return{
        myUsername: state.manyPages.username,
        roomID: state.manyPages.roomID,
        messagesList: state.messagesPage.messagesList,
        changedTextareaMessage: state.messagesPage.changedTextareaMessage,
        errors: state.messagesPage.errors,
        isLoading: state.messagesPage.isLoading,
        roomIsExists: state.manyPages.roomIsExists,
        messagesEmptyStatus: state.messagesPage.messagesEmptyStatusRoom,
        selectedMessages: state.messagesPage.seletctedMessages
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        sendNewMessage: (errors, myUsername, roomID, message) => {
            dispatch(addNewMessageFromServerTC(errors, myUsername, roomID, message));
        },
        changeLoadingStatus: (loadingStatus) =>{
            dispatch(CHANGE_LOADING_STATUS_AC(loadingStatus));
        },
        selectMessageFromChat: (messageID) => {
            dispatch(SELECT_MESSAGE_FROM_CHAT_AC(messageID));
        }
    }
}
const MainScreenMsgClearComponent = connect(mapStateToProps, mapDispatchToProps)(MainScreenMsgClear);
export default MainScreenMessagesLogicComponent;
