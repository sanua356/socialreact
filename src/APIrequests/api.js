import * as axios from "axios";
const hash = require("object-hash");

export const messagesAPI = {
  addNewMessageFromServer: (
    roomID,
    userSenderMessage,
    message,
    usernameSecretKey
  ) => {
    if (roomID && userSenderMessage && message) {
      return axios.post(
        `http://alp-srv.ru/addnewmessage.php?roomid=${roomID}`,
        {
          userSenderMessage: userSenderMessage,
          message: message,
          usernameSecretKey: usernameSecretKey,
        }
      );
    }
  },
  getMessagesFromServer: async (
    roomID,
    firstMessageID,
    myUsername,
    usernameSecretKey
  ) => {
    if (firstMessageID === null) {
      return await axios.get(
        `http://alp-srv.ru/roomsgetmessages.php?roomid=${roomID}&username=${myUsername}&usernamesecretkey=${usernameSecretKey}`
      );
    } else {
      return await axios.get(
        `http://alp-srv.ru/roomsgetmessages.php?roomid=${roomID}&firstmessageid=${firstMessageID}&username=${myUsername}&usernamesecretkey=${usernameSecretKey}`
      );
    }
  },
  deleteMessages: async (roomID, messagesID) => {
    console.log(roomID, messagesID);
    return await axios.delete(
      `http://alp-srv.ru/deletemessages.php?roomid=${roomID}`,
      {
        data: {
          messagesID,
        },
      }
    );
  },
};

export const loginAPI = {
  checkRoomExists: async () => {
    const roomID = localStorage.getItem("roomID");
    return await axios.get(
      `http://alp-srv.ru/roomsexists.php?roomid=${roomID}`
    );
  },
  createNewRoom: async () => {
    const roomID = localStorage.getItem("roomID");
    return await axios.get(
      `http://alp-srv.ru/createnewroom.php?roomid=${roomID}`
    );
  },
  webSocketConnect: (roomID, username, usernameSecretKey) => {
    const payload = {
      roomID: roomID,
      username: username,
      usernameSecretKey: hash.MD5(usernameSecretKey),
    };
    return axios.post("/rooms", payload);
  },
};
