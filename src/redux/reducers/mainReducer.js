const actionsNames = {
    SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC: "SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC"
}

const initialState = {
    username: 'username',
    roomID: 'corolina',
    isLoggined: 'true'
}

export function SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC () {
   return{
    type: "SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC"
   }
}

export const mainReducer = (state = initialState, action) => {
    let stateCopy = {...state};
    switch (action.type) {
        case actionsNames.SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC:
            if (localStorage.getItem("username") !== null && localStorage.getItem("roomID") !== null) {
                stateCopy.username = localStorage.getItem('username');
                stateCopy.roomID = localStorage.getItem('roomID');
                stateCopy.isLoggined = true;
            }else{
                stateCopy.isLoggined = false;
            }
        return { 
            ...stateCopy
        }
        default:
            return state;
    }
}
