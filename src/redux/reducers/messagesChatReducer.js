import { messagesAPI } from "../../APIrequests/api"; //Импорт обьекта с асинхронщиной к серверу для страницы сообщений
import socket from "../../webSocket/socketConnect";
const actionsNames = {
  //Обьект с константами для вызова Action Creater
  ADD_NEW_MESSAGE_FROM_DATA_BASE: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
  GET_MESSAGES_LIST_FROM_API: "GET_MESSAGES_LIST_FROM_API",
  CHANGE_LOADING_STATUS: "CHANGE_LOADING_STATUS",
  ADD_ERROR_MESSAGE: "ADD_ERROR_MESSAGE",
  SELECT_MESSAGE_FROM_CHAT: "SELECT_MESSAGE_FROM_CHAT",
  DELETE_MESSAGES_FROM_CHAT: "DELETE_MESSAGES_FROM_CHAT",
  ADD_ERROR_SERVER_MESSAGE_NOTIFICATION:
    "ADD_ERROR_SERVER_MESSAGE_NOTIFICATION",
  SET_USERS_COUNT: "SET_USERS_COUNT",
};

export function ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(
  errors,
  username,
  roomID,
  message,
  messageID,
  messageOwner
) {
  //AC, возникающий при клике на кнопку "Send message" (или нажатие Enter) на странице чата
  return {
    type: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
    errors,
    username,
    roomID,
    message,
    messageID,
    messageOwner,
  };
}

export function GET_MESSAGES_LIST_FROM_API_АС(
  roomID,
  messages,
  errors,
  firstMessageID,
  loadedMessagesArrayLength
) {
  //АС, который вызывается при переходе на страницу /messages для получения списка сообщений с сервера
  return {
    type: "GET_MESSAGES_LIST_FROM_API",
    roomID,
    messagesJSON: messages,
    errors,
    firstMessageID,
    loadedMessagesArrayLength,
  };
}
export function CHANGE_LOADING_STATUS_AC(loadingStatus) {
  //АС, нужный для работы Loader Component на странице сообщений, пока ждём ответ от сервера
  return {
    type: "CHANGE_LOADING_STATUS",
    loadingStatus,
  };
}
export function ADD_ERROR_MESSAGE_АС(error) {
  //АС, выводящий оповещение с ошибками (если они возникают)
  return {
    type: "ADD_ERROR_MESSAGE",
    error,
  };
}

export function SELECT_MESSAGE_FROM_CHAT_AC(messageID) {
  return {
    type: "SELECT_MESSAGE_FROM_CHAT",
    messageID,
  };
}
export function DELETE_MESSAGES_FROM_CHAT_AC() {
  return {
    type: "DELETE_MESSAGES_FROM_CHAT",
  };
}

export function ADD_ERROR_SERVER_MESSAGE_NOTIFICACTION_AC(
  errorServerMessagesNotification
) {
  return {
    type: "ADD_ERROR_SERVER_MESSAGE_NOTIFICATION",
    errorServerMessagesNotification,
  };
}

const initialState = {
  messagesList: [], //Массив списка сообщений, полученных с сервера для вывода в UI
  messagesEmptyStatusRoom: false, //Переменная, которая ставится в true, если с сервера пришла пустая комната без сообщений
  errors: "", //Переменная для вывода ошибок ввода на экран (если они возникают)
  isLoading: false, //Флаг показа GIF с Loader, пока выполняется запрос к серверу
  seletctedMessages: [], //Обьект в котором будут храниться ID сообщений для взаимодействия (Например удаление)
  errorServerMessagesNotification: "",
  firstMessageID: null, //Переменная, в которой хранится ID первого загруженного сообщения (самого старого с сервера). Это нужно для дозагрузки сообщений с сервера относительно старого ID.
  loadedMessagesArrayLength: 0, //Переменная, в которой хранится длина массива дозагруженных сообщений с сервера (нужна для скрытия/отображения кнопкп load more messages)
  lastMessageID: -1, //ID последнего полученного сообщения
};

export const messagesReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case actionsNames.ADD_NEW_MESSAGE_FROM_DATA_BASE: //Если АС = отправка сообщения к БД
      stateCopy = { ...state, messagesList: [...state.messagesList] };
      //Если нет ошибок ввода
      if (action.message && stateCopy.lastMessageID != action.messageID) {
        let messageOwnership = "opponent";
        if (action.messageOwner === "me") {
          messageOwnership = "me";
        }
        //Если поле ввода сообщений не пусто
        const newMessage = {
          //Формирует обьект с новым сообщением и push его в массив сообщений state
          id: action.messageID,
          dateTimeMessage: Date.now(),
          messageSender: action.username,
          message: action.message,
          errors: action.errors,
          messageOwnership: messageOwnership,
        };
        stateCopy.messagesList.push(newMessage); //push в массив сообщений
        stateCopy.lastMessageID = action.messageID;
        console.log("Message sended");
        stateCopy.messagesEmptyStatusRoom = false;
        console.log(stateCopy.messagesList);
        return stateCopy;
      } else {
        //Если поле ввода сообщений пусто
        stateCopy.errors = "Message is empty";
        console.log("Message is empty!");
        return stateCopy;
      }
    case actionsNames.GET_MESSAGES_LIST_FROM_API: //Если АС = получить список сообщений с сервера по введённой roomID
      stateCopy = { ...state, ...state.messagesList };
      if (!action.firstMessageID) stateCopy.messagesList = []; //Очистить список старых сообщений (если они вообще есть)
      stateCopy.errors = ""; //Очистить список ошибок (если они вообще есть)
      stateCopy.messagesEmptyStatusRoom = false;
      stateCopy.loadedMessagesArrayLength = action.loadedMessagesArrayLength;
      if (action.messagesJSON !== null) {
        //Если сообщения с сервера пришли (То есть если они вообще есть на сервере по введённому RoomID)
        if (action.messagesJSON !== "No messages") {
          const messagesArray = action.messagesJSON.reverse();
          console.log(messagesArray);
          stateCopy.firstMessageID = messagesArray[0].id;
          //Если с сервера пришло "No messages", значит сообщений точно нет
          if (!action.firstMessageID) {
            for (let i = 0; i < messagesArray.length; i++) {
              stateCopy.messagesList.push(messagesArray[i]); //Заполнить массив сообщений в state данными response с сервера
            }
          } else {
            let loadedMessages = [];
            for (let i = 0; i < messagesArray.length; i++) {
              loadedMessages.push(messagesArray[i]); //Заполнить массив сообщений в state данными response с сервера
            }
            stateCopy.messagesList = [
              ...loadedMessages,
              ...stateCopy.messagesList,
            ];
          }
        } else {
          //Если сообщений не пришло (сервер вернул ответ, что сообщений нет)
          stateCopy.messagesEmptyStatusRoom = true;
        }
      } else {
        //Если сообщений не пришло (косяк в коде)
        stateCopy.errors = true;
      }
      return stateCopy;
    case actionsNames.CHANGE_LOADING_STATUS: //Если АС = изменить статус показа Loader на экране
      stateCopy = { ...state };
      stateCopy.isLoading = action.loadingStatus; //Изменить флаг в state, значнием, пришедшим из action
      return stateCopy;
    case actionsNames.ADD_ERROR_MESSAGE: //Если АС = появились ошибки при выполнении логики
      stateCopy = { ...state };
      stateCopy.errors = action.error; //Сохранить в state строку с ошибкой для последующего вывода её на экран
      return stateCopy;
    case actionsNames.SELECT_MESSAGE_FROM_CHAT: //Если АС = выбрано сообщение в чате (например чтобы удалить). Отправить в state его ID
      stateCopy = { ...state };
      const checkExistsMessage = stateCopy.seletctedMessages.indexOf(
        action.messageID
      );
      if (checkExistsMessage == -1) {
        stateCopy.seletctedMessages.push(action.messageID);
      } else {
        stateCopy.seletctedMessages.splice(checkExistsMessage, 1);
      }
      return stateCopy;
    case actionsNames.DELETE_MESSAGES_FROM_CHAT:
      stateCopy = {
        ...state,
        messagesList: [...state.messagesList],
        seletctedMessages: [...state.seletctedMessages],
      };
      return stateCopy;
    case actionsNames.ADD_ERROR_SERVER_MESSAGE_NOTIFICATION:
      stateCopy = { ...state };
      stateCopy.errorServerMessagesNotification =
        action.errorServerMessagesNotification;
      console.log(stateCopy);
      return stateCopy;
    default:
      return state;
  }
};

export const addNewMessageFromServerTC = (
  //Thunk creator, посылающий запрос к API с отправкой нового сообщения на сервер
  errors,
  myUsername,
  roomID,
  message,
  usernameSecretKey,
  messagesListLength
) => {
  return (dispatch) => {
    let serverResponse;
    messagesAPI
      .addNewMessageFromServer(
        roomID,
        myUsername,
        message,
        usernameSecretKey,
        messagesListLength
      )
      .then((response) => {
        if (response.data !== "null") {
          serverResponse = response.data;
          socket.emit("ROOM:NEW_MESSAGE", {
            roomID,
            username: myUsername,
            usernameSecretKey,
            text: message,
            messageID: serverResponse,
          });
        } else {
          serverResponse = messagesListLength + 1;
        }
        dispatch(
          ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(
            errors,
            myUsername,
            roomID,
            message,
            serverResponse,
            "me"
          )
        ); //Добавить сообщение в локальный state); //Отправить запрос с данными сообщения на сервер
      })
      .catch(() => {
        dispatch(
          ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(
            "Oopps. Message not sended. Try again later.",
            myUsername,
            roomID,
            message,
            messagesListLength + 1,
            "me"
          )
        );
        dispatch(
          ADD_ERROR_SERVER_MESSAGE_NOTIFICACTION_AC(
            "Oopps. Message not sended. Try again later."
          )
        );
      });
  };
};

export const getMessagesFromServerTC = (
  roomID,
  roomIsExists,
  myUsername,
  firstMessageID = null,
  usernameSecretKey
) => {
  //Thunk creator, посылающий запрос к API и получающий список сообщений по roomID
  return (dispatch) => {
    try {
      if (roomIsExists) {
        //Если комната с таким RoomID вообще существует
        dispatch(CHANGE_LOADING_STATUS_AC(true)); //Включить Loader
        return messagesAPI
          .getMessagesFromServer(
            roomID,
            firstMessageID,
            myUsername,
            usernameSecretKey
          )
          .then((response) => {
            //Послать запрос к API и когда получили ответ, отключить Loader и загрузить response в локальный state через dispatch
            dispatch(
              GET_MESSAGES_LIST_FROM_API_АС(
                roomID,
                response.data,
                "",
                firstMessageID,
                response.data.length
              )
            );
            dispatch(CHANGE_LOADING_STATUS_AC(false));
          })
          .catch((error) => {
            //Вывести ошибки при отправке запроса (если они появились)
            dispatch(
              ADD_ERROR_MESSAGE_АС(
                "Sorry. We have not received any data from the server. Please try again later."
              )
            );
          });
      } else {
        dispatch(
          ADD_ERROR_MESSAGE_АС("No saved messages from room as room not exist")
        );
      }
    } catch (error) {
      console.log("Опаааа... Пиздец.");
    }
  };
};

export const deleteMessagesFromServerTC = (roomID, messagesID) => {
  return async (dispatch) => {
    if (messagesID.length >= 1) {
      const response = await messagesAPI.deleteMessages(roomID, messagesID);
      console.log(response);
      return response;
    } else {
      console.log("Messages list is empty!");
    }
  };
};
