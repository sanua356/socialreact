import { loginAPI } from "../../APIrequests/api";
import socket from "../../webSocket/socketConnect";
const axios = require("axios");

const actionsNames = {
  CHANGE_CONNECTING_STATUS: "CHANGE_CONNECTING_STATUS",
  CHANGE_USERS_LIST: "CHANGE_USERS_LIST",
};

export const CHANGE_CONNECTING_STATUS_AC = (status) => {
  return {
    type: "CHANGE_CONNECTING_STATUS",
    status,
  };
};

export const CHANGE_USERS_LIST_AC = (users) => {
  return {
    type: "CHANGE_USERS_LIST",
    users,
  };
};

const initialState = {
  connectingStatus: false,
  users: [],
};

export const webSocketConnectTC = (roomID, username, usernameSecretKey) => {
  return (dispatch) => {
    loginAPI
      .webSocketConnect(roomID, username, usernameSecretKey)
      .then((response) => {
        if (response.data === "ok") {
          console.log("WS Connected :)");
          dispatch(CHANGE_CONNECTING_STATUS_AC(true));
          const data = {
            roomID,
            username,
            usernameSecretKey,
          };
          socket.emit("ROOM:JOIN", data);
          axios
            .get(`rooms/${roomID}`)
            .then((response) => {
              dispatch(CHANGE_USERS_LIST_AC(response.data.users));
            })
            .catch((error) => {
              console.log("Не удалось получить список пользователей");
            });
        }
      })
      .catch((error) => {
        console.log("Error WS connecting :(");
        dispatch(CHANGE_CONNECTING_STATUS_AC(false));
        throw error;
      });
  };
};

export const webSocketReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsNames.CHANGE_CONNECTING_STATUS:
      return {
        ...state,
        connectingStatus: action.status,
      };
    case actionsNames.CHANGE_USERS_LIST:
      return {
        ...state,
        users: action.users,
      };
    default:
      return state;
  }
};
