import React from 'react';
import { useEffect } from "react";
import Loader from '../CommonComponents/Loader/Loader';
import MainScreenMsgClear from "./MainScreenMsgClear";
import { connect } from 'react-redux';
import MainScrMsgStyle from './mainScreenMsg.module.css';
import { CHANGE_LOADING_STATUS_AC, addNewMessageFromServerTC} from '../../redux/reducers/messagesChatReducer';
import { withRouter } from 'react-router-dom';

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

function messageSenderStyle(usernameSenderMessage, myUsername) {
    if (myUsername === usernameSenderMessage) {
        return MainScrMsgStyle.myMessage;
    } else {
        return MainScrMsgStyle.opponentMessage;
    }
}
const getMessagesUIMap = (messagesList, errors, myUsername) =>{
    if (Object.keys(messagesList).length > 0) {
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
        errors: state.messagesPage.errors,
        isLoading: state.messagesPage.isLoading,
        roomIsExists: state.manyPages.roomIsExists,
        messagesEmptyStatus: state.messagesPage.messagesEmptyStatusRoom
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        sendNewMessage: (errors, myUsername, roomID, message) => {
            dispatch(addNewMessageFromServerTC(errors, myUsername, roomID, message));
        },
        roleMessage: (usernameSenderMessage, myUsername) =>{
            return messageSenderStyle(usernameSenderMessage, myUsername);
        },
        getMessagesUIMap: (messagesList, errors, myUsername) => {
            return getMessagesUIMap(messagesList, errors, myUsername);
        },
        changeLoadingStatus: (loadingStatus) =>{
            dispatch(CHANGE_LOADING_STATUS_AC(loadingStatus));
        }
    }
}
let MainScreenMessagesLogicFunctions = withRouter(MainScreenMsgClear);
const MainScreenMsgClearComponent = connect(mapStateToProps, mapDispatchToProps)(MainScreenMessagesLogicFunctions);
export default MainScreenMessagesLogicComponent;
