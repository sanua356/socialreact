import React from 'react';
import LoginRoomStyle from './loginRoom.module.css';
import { LoginRoomForm } from './LoginRoomForm';

function LoginRoomClear(props) {
    return (
        <div className = {LoginRoomStyle.loginScreen}>
            <div  className="workspace" className={LoginRoomStyle.loginroomBlock}>
                <div className = {LoginRoomStyle.positionForm}>
                    <LoginRoomForm  {...props}/>
                </div>
            </div>   
        </div>
            
    );
}

export default LoginRoomClear;
