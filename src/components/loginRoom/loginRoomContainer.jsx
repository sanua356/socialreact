import React from 'react';
import LoginRoomClear from './LoginRoomClear';
import {CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM_AC, 
CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM_AC, SEND_LOGINROOM_DATA_AC} from '../../redux/reducers/loginroomReducer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from '../../redux/reducers/mainReducer';
import { connect } from 'react-redux';
import { checkRoomExistsTC } from '../../redux/reducers/loginroomReducer';
    

const mapStateToProps = (state) =>{
    return{
        usernameChanged: state.loginRoomPage.changedUsername,
        roomIDChanged: state.loginRoomPage.changedRoomID,
        roomID: state.manyPages.roomID,
        errorsValidation: state.loginRoomPage.notCorrectValidationData,
        loginBtnName: state.loginRoomPage.loginBtnName,
        logginingBtnClickableStatus: state.loginRoomPage.loginBtnClickableStatus
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
            dispatch(checkRoomExistsTC());
        },
        enterKeyPressed: (e) =>{
            if(e.key === 'Enter'){
              console.log(e)
                dispatch(SEND_LOGINROOM_DATA_AC());
                dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
                dispatch(checkRoomExistsTC());
            }
        },
    }
}

const LoginRoomContainer = connect(mapStateToProps, mapDispatchTopProps)(LoginRoomClear);
export default LoginRoomContainer;
