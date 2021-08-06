import React from 'react';
import MainScreenMessagesLogicFunctions from "./MainScreenMessagesLogicFunctions";
import { connect } from 'react-redux';
import { getMessagesFromServerTC } from '../../redux/reducers/messagesChatReducer';

const mapStateToProps = (state) =>{
    return{
        myUsername: state.manyPages.username,
        usernameSecretKey: state.manyPages.usernameSecretKey,
        roomID: state.manyPages.roomID,
        isLoading: state.messagesPage.isLoading,
        roomIsExists: state.manyPages.roomIsExists,
        errors: state.messagesPage.errors,
        messagesList: state.messagesPage.messagesList
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        getMessagesFromServerTC: (roomID, roomIsExists, myUsername, firstMessageID, usernameSecretKey) =>{
            dispatch(getMessagesFromServerTC(roomID, roomIsExists, firstMessageID, myUsername, usernameSecretKey));   
        },
    }
}

const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MainScreenMessagesLogicFunctions);
export default MessagesContainer;
