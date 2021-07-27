import React from 'react';
import LoginRoomClear from './LoginRoomClear';
import { SEND_LOGINROOM_DATA_AC, checkRoomExistsTC, CHANGE_CREATE_OR_LOGIN_STATUS_AC} from '../../redux/reducers/loginroomReducer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from '../../redux/reducers/mainReducer';
import { connect } from 'react-redux';
import { createNewRoomTC } from './../../redux/reducers/loginroomReducer';
    

const mapStateToProps = (state) =>{
    return{
        usernameFieldValue: state.loginRoomPage.usernameFieldValue,
        roomIDFieldValue: state.loginRoomPage.roomIDFieldValue,
        roomID: state.manyPages.roomID,
        errorsValidation: state.loginRoomPage.notCorrectValidationData,
        loginBtnName: state.loginRoomPage.loginBtnName,
        loginBtnClickableStatus: state.loginRoomPage.loginBtnClickableStatus,
        roomIsExists: state.manyPages.roomIsExists,
        roomExistsServerResponse: state.loginRoomPage.roomIsExistsServerResponse
    }
}
const mapDispatchTopProps = (dispatch) => {
    return{
        sendDataFields: (usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, createOrLoginStatus) => {
            dispatch(SEND_LOGINROOM_DATA_AC(usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue));
            dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
            if(createOrLoginStatus){
                dispatch(createNewRoomTC(createOrLoginStatus));
            }else{
                dispatch(checkRoomExistsTC());
            }
        },
        enterKeyPressed: (e, usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, createOrLoginStatus) =>{
            if(e.key === 'Enter'){
              console.log(e)
                dispatch(SEND_LOGINROOM_DATA_AC(usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue));
                dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
                dispatch(checkRoomExistsTC(createOrLoginStatus));
            }
        },
        changeCreateOrLoginStatus: (status) => {
            dispatch(CHANGE_CREATE_OR_LOGIN_STATUS_AC(status));
        }
    }
}

const LoginRoomContainer = connect(mapStateToProps, mapDispatchTopProps)(LoginRoomClear);
export default LoginRoomContainer;
