import * as axios from "axios";

export const messagesAPI = {
  addNewMessageFromServer: async (
    roomID,
    userSenderMessage,
    message,
    usernameSecretKey
  ) => {
    if (roomID && userSenderMessage && message) {
      return await axios
        .post(`http://socialreactapi/addnewmessage.php?roomid=${roomID}`, {
          userSenderMessage: userSenderMessage,
          message: message,
          usernameSecretKey: usernameSecretKey,
        })
        .then(
          (response) => {
            return response.data;
          },
          (error) => {
            console.log(error);
          }
        );
    }
  },
  getMessagesFromServer: async (roomID) => {
    return await axios.get(
      `http://socialreactapi/roomsgetmessages.php?roomid=${roomID}`
    );
  },
  deleteMessages: async (roomID, messagesID) => {
    console.log(roomID, messagesID);
    return await axios.delete(
      `http://socialreactapi/deletemessages.php?roomid=${roomID}`,
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
      `http://socialreactapi/roomsexists.php?roomid=${roomID}`
    );
  },
  createNewRoom: async () => {
    const roomID = localStorage.getItem("roomID");
    return await axios.get(
      `http://socialreactapi/createnewroom.php?roomid=${roomID}`
    );
  },
};
