const actionsNames = {
    ADD_NEW_MESSAGE_FROM_DATA_BASE: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
    CHANGE_TEXTAREA_MESSAGE: "CHANGE_TEXTAREA_MESSAGE"
}

export function ADD_NEW_MESSAGE_FROM_DATA_BASE() {
    return {
        type: "ADD_NEW_MESSAGE_FROM_DATA_BASE"
    }
}

export function CHANGE_TEXTAREA_MESSAGE(message) {
    return {
        type: "CHANGE_TEXTAREA_MESSAGE",
        messageData: message
    }
}

const initialState = {
        messagesList: [
            {
                chatToken: 'stopgame',
                id: 1,
                messageText: "hey",
                sender: "you",
                classRendering: "myMessage",

            },
            {
                id: 2,
                messageText: "Hello!",
                sender: "opponent",
                classRendering: "opponentMessage"
            },
            {
                chatToken: 'stopgame',
                id: 1,
                messageText: "Bye!",
                sender: "you",
                classRendering: "myMessage"
            },
            {
                chatToken: 'stopgame',
                id: 2,
                messageText: "Ok. Bye!",
                sender: "opponent",
                classRendering: "opponentMessage"
            }
        ],
        changedTextareaMessage: ''
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
            }
        case actionsNames.CHANGE_TEXTAREA_MESSAGE:
            stateCopy = {...state};
            stateCopy.changedTextareaMessage = action.messageData;
            return stateCopy;
        default:
            return state;
    }
}