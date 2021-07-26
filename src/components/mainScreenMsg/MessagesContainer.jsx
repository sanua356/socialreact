import React from 'react';
import MainScreenMessagesLogicFunctions from "./MainScreenMessagesLogicFunctions";
import { connect } from 'react-redux';
import { getMessagesFromServerTC } from '../../redux/reducers/messagesChatReducer';

const mapStateToProps = (state) =>{
    return{
        myUsername: state.manyPages.username,
        roomID: state.manyPages.roomID,
        isLoading: state.messagesPage.isLoading,
        roomIsExists: state.manyPages.roomIsExists,
    }
}
const mapDispatchToProps = (dispatch) =>{
    return{
        getMessagesFromServerTC: (roomID, roomIsExists) =>{
            dispatch(getMessagesFromServerTC(roomID, roomIsExists));   
        },
    }
}


const MessagesContainer = connect(mapStateToProps, mapDispatchToProps)(MainScreenMessagesLogicFunctions);
export default MessagesContainer;
