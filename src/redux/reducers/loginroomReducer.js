
const actionsNames = {
    CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM: "CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM",
    CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: "CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM",
    SEND_LOGINROOM_DATA: "SEND_LOGINROOM_DATA"
}

export function CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM(textdata){
    return{
        type: 'CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM',
        newUsernameValue: textdata
    }
}

export function CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM(textdata){
    return{
        type: 'CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM',
        newRoomIdValue: textdata
    }
}

export function SEND_LOGINROOM_DATA () {
    return{
        type: 'SEND_LOGINROOM_DATA'
    }
}

const initialState = {
    changedUsername: '',
    changedRoomId: ''
}

export const loginroomReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case actionsNames.CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM:
            stateCopy.changedUsername = action.newUsernameValue;
            console.log("USERNAME CHANGED", stateCopy);
            return stateCopy;

        case actionsNames.CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: 
        stateCopy.changedRoomId = action.newRoomIdValue;
        console.log("ROOMID CHANGED", stateCopy);
        return stateCopy;

        case actionsNames.SEND_LOGINROOM_DATA:
            if(stateCopy.changedUsername && stateCopy.changedRoomId){
                localStorage.setItem("username", stateCopy.changedUsername);
                localStorage.setItem("roomID", stateCopy.changedRoomId);
                stateCopy.changedRoomId = '';
                stateCopy.changedUsername = '';
            }else{
                console.log("Uncorrect data");
            }
            return stateCopy;
        default:
            return state;
    }
}