import React from 'react';
import LoginRoomClear from './LoginRoomClear';
import { SEND_LOGINROOM_DATA_AC, checkRoomExistsTC} from '../../redux/reducers/loginroomReducer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from '../../redux/reducers/mainReducer';
import { connect } from 'react-redux';
    

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
        sendDataFields: (usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, validationCheckErrors, setRoomExistsStatus) => {
            dispatch(SEND_LOGINROOM_DATA_AC(usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, validationCheckErrors));
            dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
            dispatch(checkRoomExistsTC(setRoomExistsStatus));
        },
        enterKeyPressed: (e, usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, validationCheckErrors) =>{
            if(e.key === 'Enter'){
              console.log(e)
                dispatch(SEND_LOGINROOM_DATA_AC(usernameFieldValue, usernameSecretKeyFieldValue, roomIDFieldValue, validationCheckErrors));
                dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
                dispatch(checkRoomExistsTC());
            }
        },
    }
}

const LoginRoomContainer = connect(mapStateToProps, mapDispatchTopProps)(LoginRoomClear);
export default LoginRoomContainer;
