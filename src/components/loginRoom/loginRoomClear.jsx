import React, { createRef } from 'react';
import LoginRoomStyle from './loginRoom.module.css';
import { CHANGE_USER_NAME } from '../actions/actions.types'

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
                        value = {props.username}
                    />
                    <label htmlFor="roomIdInput" className={LoginRoomStyle.labels}>Enter room id</label>
                    <input
                        placeholder="chat ID"
                        type="text"
                        id="roomIdInput"
                        className={LoginRoomStyle.inputs}
                        onChange = {props.changedLoginRoomIdField}
                        value = {props.RoomId} />
                    <button
                        type="button"
                        className={LoginRoomStyle.loginBtn}
                        onClick = {props.sendDataFields}
                    >Login</button>
                </form>
            </div>   
    );
}

export default LoginRoomClear;
