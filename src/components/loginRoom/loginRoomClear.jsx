import React from 'react';
import LoginRoomStyle from './loginRoom.module.css';

function LoginRoomClear(props) {
    return (
            <div  className="workspace" className={LoginRoomStyle.loginroomBlock}>
                <form action="" className={LoginRoomStyle.form}>
                    <h2>Login room</h2>
                    <label htmlFor="usernameInput" className={LoginRoomStyle.labels} >Enter your name</label>
                    <input
                        placeholder="username"
                        type="text"
                        id="usernameInput"
                        className={LoginRoomStyle.inputs}
                        onChange= {props.changedUsernameField}
                        value = {props.usernameChanged}
                        onKeyPress = {props.enterKeyPressed}
                    />
                    <label htmlFor="roomIdInput" className={LoginRoomStyle.labels}>Enter room id</label>
                    <input
                        placeholder="chat ID"
                        type="text"
                        id="roomIdInput"
                        className={LoginRoomStyle.inputs}
                        onChange = {props.changedLoginRoomIdField}
                        value = {props.roomIDChanged}
                        onKeyPress = {props.enterKeyPressed}
                         />
                         <span className={LoginRoomStyle.error}>{props.errorsValidation}</span>
                    <button
                        disabled = {!props.logginingBtnClickableStatus}
                        type="button"
                        className={LoginRoomStyle.loginBtn}
                        onClick = {props.sendDataFields}
                    >{props.loginBtnName}</button>
                </form>
            </div>   
    );
}

export default LoginRoomClear;
