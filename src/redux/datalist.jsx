
import { navbarReducer } from './reducers/navbarReducer';
import { messagesReducer } from './reducers/messagesChatReducer';
import { profileReducer } from './reducers/profileReducer';
import { headerReducer } from './reducers/headerReducer';

let store = {
    _state: {
        messagesPage: {
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
        },
        sidebarPage: {
            sidebarMenuItems: [
                {
                    itemName: "Profile",
                    link: "/profile"
                },
                {
                    itemName: "Messages",
                    link: "/messages"
                },
                {
                    itemName: "Updates",
                    link: "/updates"
                },
                {
                    itemName: "Exit",
                    link: "/loginroom"
                }
            ]
        },
        userSettings: {
            username: 'username'
        }

    },
    dispatch(action) {
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
    },
}

export default store;