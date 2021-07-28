import { messagesAPI } from "../../APIrequests/api"; //Импорт обьекта с асинхронщиной к серверу для страницы сообщений
const actionsNames = {
  //Обьект с константами для вызова Action Creater
  ADD_NEW_MESSAGE_FROM_DATA_BASE: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
  GET_MESSAGES_LIST_FROM_API: "GET_MESSAGES_LIST_FROM_API",
  CHANGE_LOADING_STATUS: "CHANGE_LOADING_STATUS",
  ADD_ERROR_MESSAGE: "ADD_ERROR_MESSAGE",
  SELECT_MESSAGE_FROM_CHAT: "SELECT_MESSAGE_FROM_CHAT",
};

export function ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(
  errors,
  username,
  roomID,
  message,
  messageID
) {
  //AC, возникающий при клике на кнопку "Send message" (или нажатие Enter) на странице чата
  return {
    type: "ADD_NEW_MESSAGE_FROM_DATA_BASE",
    errors,
    username,
    roomID,
    message,
    messageID,
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

export function SELECT_MESSAGE_FROM_CHAT_AC(messageID) {
  return {
    type: "SELECT_MESSAGE_FROM_CHAT",
    messageID,
  };
}

const initialState = {
  messagesList: [], //Массив списка сообщений, полученных с сервера для вывода в UI
  messagesEmptyStatusRoom: false, //Переменная, которая ставится в true, если с сервера пришла пустая комната без сообщений
  errors: "", //Переменная для вывода ошибок ввода на экран (если они возникают)
  isLoading: false, //Флаг показа GIF с Loader, пока выполняется запрос к серверу
  seletctedMessages: [], //Обьект в котором будут храниться ID сообщений для взаимодействия (Например удаление)
};

export const messagesReducer = (state = initialState, action) => {
  let stateCopy = { ...state };
  switch (action.type) {
    case actionsNames.ADD_NEW_MESSAGE_FROM_DATA_BASE: //Если АС = отправка сообщения к БД
      console.log(action);
      stateCopy = { ...state, messagesList: [...state.messagesList] };
      //Если нет ошибок ввода
      if (action.message) {
        //Если поле ввода сообщений не пусто
        const newMessage = {
          //Формирует обьект с новым сообщением и push его в массив сообщений state
          id: action.messageID,
          dateTimeMessage: Date.now(),
          messageSender: action.username,
          message: action.message,
        };
        stateCopy.messagesList.push(newMessage); //push в массив сообщений
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
      stateCopy.messagesList = []; //Очистить список старых сообщений (если они вообще есть)
      stateCopy.errors = ""; //Очистить список ошибок (если они вообще есть)
      stateCopy.messagesEmptyStatusRoom = false;
      if (action.messagesJSON !== null) {
        //Если сообщения с сервера пришли (То есть если они вообще есть на сервере по введённому RoomID)
        if (action.messagesJSON !== "No messages") {
          //Если с сервера пришло "No messages", значит сообщений точно нет
          for (let i = 0; i < Object.keys(action.messagesJSON).length; i++) {
            stateCopy.messagesList.push(action.messagesJSON[i]); //Заполнить массив сообщений в state данными response с сервера
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
      console.log("Loading status changed", stateCopy.isLoading);
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
      console.log(checkExistsMessage);
      if (checkExistsMessage == -1) {
        stateCopy.seletctedMessages.push(action.messageID);
        console.log("message pushed");
      } else {
        stateCopy.seletctedMessages.splice(checkExistsMessage, 1);
        console.log("message deleted");
      }
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
  message
) => {
  return (dispatch) => {
    messagesAPI.addNewMessageFromServer(roomID, myUsername, message).then(
      (response) =>
        dispatch(
          ADD_NEW_MESSAGE_FROM_DATA_BASE_AC(
            errors,
            myUsername,
            roomID,
            message,
            response
          )
        ) //Добавить сообщение в локальный state); //Отправить запрос с данными сообщения на сервер
    );
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
      dispatch(
        ADD_ERROR_MESSAGE_АС("No saved messages from room as room not exist")
      );
    }
  };
};
