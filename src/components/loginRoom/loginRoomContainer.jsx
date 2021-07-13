import React from 'react';
import LoginRoomClear from './loginRoomClear';
import {CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM_AC, 
CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM_AC, SEND_LOGINROOM_DATA_AC } from '../../redux/reducers/loginroomReducer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from '../../redux/reducers/mainReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>{
    return{
        username: state.loginRoomPage.changedUsername,
        roomID: state.loginRoomPage.changedRoomID
    }
}
const mapDispatchTopProps = (dispatch) => {
    return{
        changedLoginRoomIdField: (fieldValue) => {
            dispatch(CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM_AC(fieldValue.target.value));
        },
        changedUsernameField: (fieldValue) =>{
            dispatch(CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM_AC(fieldValue.target.value));
        },
        sendDataFields: () => {
            dispatch(SEND_LOGINROOM_DATA_AC());
            dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
        },
        enterKeyPressed: (e) =>{
            if(e.key === 'Enter'){
                dispatch(SEND_LOGINROOM_DATA_AC());
                dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
            }
        }
    }
}

const LoginRoomContainer = connect(mapStateToProps, mapDispatchTopProps)(LoginRoomClear);
export default LoginRoomContainer;
