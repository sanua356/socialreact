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
                        value = {props.username}
                        onKeyPress = {props.enterKeyPressed}
                    />
                    <label htmlFor="roomIdInput" className={LoginRoomStyle.labels}>Enter room id</label>
                    <input
                        placeholder="chat ID"
                        type="text"
                        id="roomIdInput"
                        className={LoginRoomStyle.inputs}
                        onChange = {props.changedLoginRoomIdField}
                        value = {props.roomID}
                        onKeyPress = {props.enterKeyPressed}
                         />
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
