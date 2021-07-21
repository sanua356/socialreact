 
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { profileReducer } from './reducers/profileReducer';
import { headerReducer } from './reducers/headerReducer';
import { loginroomReducer } from './reducers/loginroomReducer';
import { messagesReducer } from './reducers/messagesChatReducer';
import { navbarReducer } from './reducers/navbarReducer';
import { updatesReducer } from './reducers/updatesReducer';
import { mainReducer } from './reducers/mainReducer';
import thunk from "redux-thunk";

let reducers = combineReducers({
    manyPages: mainReducer,
    messagesPage: messagesReducer,
    sidebarPage: navbarReducer,
    loginRoomPage :loginroomReducer,
});

let store = createStore(reducers, applyMiddleware(thunk));
export default store;
