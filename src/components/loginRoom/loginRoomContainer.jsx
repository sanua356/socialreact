import React from 'react';
import LoginRoomClear from './loginRoomClear';
import {CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM, 
CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM, SEND_LOGINROOM_DATA } from '../../redux/reducers/loginroomReducer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from '../../redux/reducers/mainReducer';
import { connect } from 'react-redux';

const mapStateToProps = (state) =>{
    return{
        username: state.loginRoomPage.username,
        roomId: state.loginRoomPage.roomId
    }
}
const mapDispatchTopProps = (dispatch) => {
    return{
        changedLoginRoomIdField: (fieldValue) => {
            dispatch(CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM(fieldValue.target.value));
        },
        changedUsernameField: (fieldValue) =>{
            dispatch(CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM(fieldValue.target.value));
        },
        sendDataFields: () => {
            dispatch(SEND_LOGINROOM_DATA());
            dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
        }
    }
}

const LoginRoomContainer = connect(mapStateToProps, mapDispatchTopProps)(LoginRoomClear);
export default LoginRoomContainer;
