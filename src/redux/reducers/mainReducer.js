const actionsNames = {
    SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC: "SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC"
}

const initialState = {
    username: 'username',
    roomId: '',
    isLoggined: 'false'
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
            if (localStorage.getItem("username")) {
                stateCopy.username = localStorage.getItem('username');
                stateCopy.roomId = localStorage.getItem('roomID');
                stateCopy.isLoggined = true;
            }else{
                stateCopy.isLoggined = false;
            }
        console.log(stateCopy);
        return {
            ...stateCopy
        }

        default:
            return state;
    }
}
