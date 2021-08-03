import React from 'react';
import { connect } from 'react-redux';
import { checkRoomExistsTC } from '../../redux/reducers/loginroomReducer';
import MainComponent from "../CommonComponents/MainComponent";
import LoginRoomContainer from '../LoginRoom/LoginRoomContainer';
import { SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC } from './../../redux/reducers/mainReducer';

function LogginingRouter(props){
    React.useEffect(() => {
        props.attemptToLoginWithOldData();
        props.checkRoomExistsTC();
    }, [])
    return(
        <>
        {props.roomIsExists ? <MainComponent store={props.store} /> : <LoginRoomContainer />}
        </>
    );
}

let mapStateToProps = (state) =>{
    return{
        roomIsExists: state.manyPages.roomIsExists
    }
}

const mapDispatchToProps = (dispatch) =>{
    return{
        attemptToLoginWithOldData: () => {
            dispatch(SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC());
        },
        checkRoomExistsTC: () => {
            dispatch(checkRoomExistsTC());
        }
    }
}

const Loggining = connect(mapStateToProps, mapDispatchToProps)(LogginingRouter);
export default Loggining;