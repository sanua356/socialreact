import React from 'react';
import { connect } from 'react-redux';
import MainComponent from "../CommonComponents/MainComponent";
import LoginRoomContainer from '../LoginRoom/LoginRoomContainer';

function LogginingRouter(props){
    console.log(props);
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

const Loggining = connect(mapStateToProps, null)(LogginingRouter);
export default Loggining;