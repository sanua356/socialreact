
const actionsNames = {
    CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM: "CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM",
    CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: "CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM",
    SEND_LOGINROOM_DATA: "SEND_LOGINROOM_DATA"
}

export function CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM_AC(textdata){
    return{
        type: 'CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM',
        newUsernameValue: textdata
    }
}

export function CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM_AC(textdata){
    return{
        type: 'CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM',
        newRoomIDValue: textdata
    }
}

export function SEND_LOGINROOM_DATA_AC () {
    return{
        type: 'SEND_LOGINROOM_DATA'
    }
}

const initialState = {
    changedUsername: '',
    changedRoomID: ''
}

export const loginroomReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case actionsNames.CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM:
            stateCopy.changedUsername = action.newUsernameValue;
            return stateCopy;

        case actionsNames.CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: 
            stateCopy.changedRoomID = action.newRoomIDValue;
            return stateCopy;

        case actionsNames.SEND_LOGINROOM_DATA:
            localStorage.clear();
            if(stateCopy.changedUsername && stateCopy.changedRoomID){
                localStorage.setItem("username", stateCopy.changedUsername);
                localStorage.setItem("roomID", stateCopy.changedRoomID);
                stateCopy.changedRoomID = '';
                stateCopy.changedUsername = '';
            }else{
                console.log("Uncorrect data");
            }
            console.log("correct action", stateCopy);
            return stateCopy;
        default:
            return state;
    }
}