import * as axios from "axios";

export const messagesAPI = {
  addNewMessageFromServer: async (roomID, userSenderMessage, message) => {
    if (roomID && userSenderMessage && message) {
      return await axios
        .post(`http://socialreactapi/addnewmessage.php?roomid=${roomID}`, {
          userSenderMessage: userSenderMessage,
          message: message,
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
