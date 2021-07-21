import { messagesAPI } from "../../APIrequests/api"; //Импорт обьекта с асинхронщиной к серверу для страницы сообщений
const actionsNames = {
  //Обьект с константами для вызова Action Creater
  ADD_NEW_MESSAGE_FROM_DATA_BASE: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
  CHANGE_TEXTAREA_MESSAGE: "CHANGE_TEXTAREA_MESSAGE",
  GET_MESSAGES_LIST_FROM_API: "GET_MESSAGES_LIST_FROM_API",
  CHANGE_LOADING_STATUS: "CHANGE_LOADING_STATUS",
  ADD_ERROR_MESSAGE: "ADD_ERROR_MESSAGE",
};

export function ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(errors, username, roomID) {
  //AC, возникающий при клике на кнопку "Send message" (или нажатие Enter) на странице чата
  return {
    type: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
    errors,
    username,
    roomID,
  };
}

export function CHANGE_TEXTAREA_MESSAGE_AC(message) {
  //АС, который вызывается при взаимодействии с textarea ввода сообщения на странице сообщений
  return {
    type: "CHANGE_TEXTAREA_MESSAGE",
    messageData: message,
  };
}
export function GET_MESSAGES_LIST_FROM_API_АС(roomID, messages, errors) {
  //АС, который вызывается при переходе на страницу /messages для получения списка сообщений с сервера
  return {
    type: "GET_MESSAGES_LIST_FROM_API",
    roomID,
    messagesJSON: messages,
    errors,
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
const initialState = {
  messagesList: [], //Массив списка сообщений, полученных с сервера для вывода в UI
  changedTextareaMessage: "", //Временная переменная для хранения значения из textarea ввода сообщения
  errors: "", //Переменная для вывода ошибок ввода на экран (если они возникают)
  isLoading: false, //Флаг показа GIF с Loader, пока выполняется запрос к серверу
};

export const messagesReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionsNames.ADD_NEW_MESSAGE_FROM_DATA_BASE: //Если АС = отправка сообщения к БД
      let stateCopy = { ...state, messagesList: [...state.messagesList] };
      if (!stateCopy.errors) {
        //Если нет ошибок ввода
        if (stateCopy.changedTextareaMessage) {
          //Если поле ввода сообщений не пусто
          const newMessage = {
            //Формирует обьект с новым сообщением и push его в массив сообщений state
            dateTimeMessage: Date.now(),
            messageSender: action.username,
            message: stateCopy.changedTextareaMessage,
          };
          stateCopy.messagesList.push(newMessage); //push в массив сообщений
          stateCopy.changedTextareaMessage = ""; //Очистка textarea с вводом сообщения
          console.log("Message sended");
          return stateCopy;
        } else {
          //Если поле ввода сообщений пусто
          console.log("Message is empty!");
          return state;
        }
      }
      return stateCopy;
    case actionsNames.CHANGE_TEXTAREA_MESSAGE: //Если АС = изменилось поле ввода сообщения (textarea)
      stateCopy = { ...state };
      stateCopy.changedTextareaMessage = action.messageData; //Обновить state новым значением из textarea
      return stateCopy;
    case actionsNames.GET_MESSAGES_LIST_FROM_API: //Если АС = получить список сообщений с сервера по введённой roomID
      stateCopy = { ...state, ...state.messagesList };
      stateCopy.messagesList = []; //Очистить список старых сообщений (если они вообще есть)
      stateCopy.errors = ""; //Очистить список ошибок (если они вообще есть)
      if (action.messagesJSON !== null) {
        //Если сообщения с сервера пришли (То есть если они вообще есть на сервере по введённому RoomID)
        if (action.messagesJSON !== "No messages") {
          //Если с сервера пришло "No messages", значит сообщений точно нет
          for (let i = 0; i < Object.keys(action.messagesJSON).length; i++) {
            stateCopy.messagesList.push(action.messagesJSON[i]); //Заполнить массив сообщений в state данными response с сервера
          }
        } else {
          //Если сообщений не пришло (сервер вернул ответ, что сообщений нет)
          stateCopy.errors = "No saved messages from room.";
        }
      } else {
        //Если сообщений не пришло (косяк в коде)
        stateCopy.errors = "No saved messages from room.";
      }
      return stateCopy;
    case actionsNames.CHANGE_LOADING_STATUS: //Если АС = изменить статус показа Loader на экране
      stateCopy = { ...state };
      stateCopy.isLoading = action.loadingStatus; //Изменить флаг в state, значнием, пришедшим из action
      console.log("Loading status changed", stateCopy.isLoading);
      return stateCopy;
    case actionsNames.ADD_ERROR_MESSAGE: //Если АС = появились ошибки при выполнении логики
      stateCopy = { ...state };
      stateCopy.errors = action.error; //Сохранить в state строку с ошибкой для последующего вывода её на экран
      return stateCopy;
    default:
      return state;
  }
};

export const addNewMessageFromServerTC = (
  //Thunk creator, посылающий запрос к API с отправкой нового сообщения на сервер
  roomID,
  myUsername,
  message,
  errors
) => {
  console.log(roomID, myUsername, message, errors);
  return (dispatch) => {
    messagesAPI.addNewMessageFromServer(roomID, myUsername, message); //Отправить запрос с данными сообщения на сервер
    dispatch(ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(errors, myUsername, roomID)); //Добавить сообщение в локальный state
  };
};

export const getMessagesFromServerTC = (roomID, roomIsExists) => {
  //Thunk creator, посылающий запрос к API и получающий список сообщений по roomID
  return (dispatch) => {
    if (roomIsExists) {
      //Если комната с таким RoomID вообще существует
      dispatch(CHANGE_LOADING_STATUS_AC(true)); //Включить Loader
      return messagesAPI
        .getMessagesFromServer(roomID)
        .then((response) => {
          //Послать запрос к API и когда получили ответ, отключить Loader и загрузить response в локальный state через dispatch
          dispatch(GET_MESSAGES_LIST_FROM_API_АС(roomID, response.data));
          dispatch(CHANGE_LOADING_STATUS_AC(false));
        })
        .catch((error) => {
          //Вывести ошибки при отправке запроса (если они появились)
          console.log(error);
        });
    } else {
      dispatch(ADD_ERROR_MESSAGE_АС("No saved messages from room as room not exist"));
    }
  };
};
