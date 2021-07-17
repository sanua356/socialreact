const actionsNames = {
    ADD_NEW_MESSAGE_FROM_DATA_BASE: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
    CHANGE_TEXTAREA_MESSAGE: "CHANGE_TEXTAREA_MESSAGE",
    GET_MESSAGES_LIST_FROM_API: "GET_MESSAGES_LIST_FROM_API"
}

export function ADD_NEW_MESSAGE_FROM_DATA_BASE_AC() {
    return {
        type: "ADD_NEW_MESSAGE_FROM_DATA_BASE"
    }
}

export function CHANGE_TEXTAREA_MESSAGE_AC(message) {
    return {
        type: "CHANGE_TEXTAREA_MESSAGE",
        messageData: message
    }
}
export function GET_MESSAGES_LIST_FROM_API_АС(roomID, messages, errors) {
    return{
        type: "GET_MESSAGES_LIST_FROM_API",
        roomID,
        messagesJSON: messages,
        errors
    }
}

const initialState = {
        messagesList: [
            {
                id: 1,
                dateTimeMessage: "2021-07-15 13:24:5",
                messageSender: "username",
                message: "Hello",
            },
            {
                id: 2,
                dateTimeMessage: "2021-07-15 13:24:5",
                messageSender: "opponent",
                message: "Aufwiederzehen",
            }
        ],
        changedTextareaMessage: '',
        errors: ''
}

export const messagesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsNames.ADD_NEW_MESSAGE_FROM_DATA_BASE:
            let stateCopy = {...state, messagesList: [...state.messagesList]};
            if (stateCopy.changedTextareaMessage) {
                const newMessage = {
                    chatToken: 'rndToken',
                    id: '1',
                    messageText: stateCopy.changedTextareaMessage,
                    sender: 'you',
                    classRendering: 'myMessage',
                }
                stateCopy.messagesList.push(newMessage);
                stateCopy.changedTextareaMessage = '';
                console.log("Message sended");
                return stateCopy;
            } else {
                console.log('Message is empty!');
                return state;
            }
        case actionsNames.CHANGE_TEXTAREA_MESSAGE:
            stateCopy = {...state};
            stateCopy.changedTextareaMessage = action.messageData;
            return stateCopy;
        case actionsNames.GET_MESSAGES_LIST_FROM_API:
            stateCopy = {...state, ...state.messagesList};
            stateCopy.messagesList = [];
            stateCopy.errors = '';
            if (action.messagesJSON != null) {
                for (let i = 1; i <= Object.keys(action.messagesJSON).length; i++) {
                    stateCopy.messagesList.push(action.messagesJSON["message" + i]);
                }
            }
            else{
                stateCopy.errors = "No saved messages from room.";
            }
            return stateCopy;
        default:
            return state;
    }
}