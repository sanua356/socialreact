import React from 'react';
import CreateNewRoomStyles from './createNewRoom.module.css';

const CreateNewRoom = (props) =>{
    return(
        <>
            <div className = {CreateNewRoomStyles.popup}>
                <h4>Вы хотите создать новую комнату?</h4>
                <div className = {CreateNewRoomStyles.buttons}>
                    <button type="button">Создать</button>
                    <button type="button">Отмена</button>
                </div>
            </div>
        </>
    );
}

export default CreateNewRoom;