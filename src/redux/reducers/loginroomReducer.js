import { loginAPI } from "../../APIrequests/api"; //Импорт обьекта с асинхронщиной к серверу для страницы логина
import { CHANGE_ROOM_EXISTS_STATUS_AC } from "../reducers/mainReducer"; //Импорт Action Creater для проверки существования комнаты при логине
const actionsNames = {
  //Обьект с константами для вызова Action Creater
  CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM: "CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM",
  CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: "CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM",
  SEND_LOGINROOM_DATA: "SEND_LOGINROOM_DATA",
  CHANGE_NAME_STATUS_LOGGINING_BTN: "CHANGE_NAME_STATUS_LOGGINING_BTN",
  CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE:
    "CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE",
  CHANGE_CREATE_OR_LOGIN_STATUS: "CHANGE_CREATE_OR_LOGIN_STATUS",
};

export function SEND_LOGINROOM_DATA_AC(
  usernameFieldValue,
  usernameSecretKeyFieldValue,
  roomIDFieldValue
) {
  //АС, который вызывается при клике на кнопку "Login" на странице логина
  return {
    type: "SEND_LOGINROOM_DATA",
    usernameFieldValue,
    usernameSecretKeyFieldValue,
    roomIDFieldValue,
  };
}

export function CHANGE_NAME_STATUS_LOGGINING_BTN_AC(changedName, enableStatus) {
  //АС, который вызывается во время отправки запроса к БД для проверки существования комнаты
  return {
    type: "CHANGE_NAME_STATUS_LOGGINING_BTN",
    changedName,
    enableStatus,
  };
}

export function CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE_AC(messageServerData) {
  return {
    type: "CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE",
    messageServerData,
  };
}
export function CHANGE_CREATE_OR_LOGIN_STATUS_AC(status) {
  return {
    type: "CHANGE_CREATE_OR_LOGIN_STATUS",
    status,
  };
}

const initialState = {
  changedUsername: "", //Временная переменная, хранящая строку из input ввода ника
  changedRoomID: "", //Временная переменная, хранящая строку из input ввода RoomID
  changedSecretKeyUsername: "", //Временная переменная, хранящая секретный ключ ника пользователя
  notCorrectValidationData: "", //Временная переменная, хранящая строку при возникновении ошибок ввода (валидации) введённых данных в inputs
  loginBtnName: "Login", //Переменная, хранящая текст внутри кнопки логина (нужна для вывода сообщения "Loggining...") во время ожидания ответа запроса к БД
  loginBtnClickableStatus: true, //Переменная для отключения кнопки, во время ожиданеия ответа от сервера к БД
  roomIsExistsServerResponse: "", //Переменная нужна для корректной работы вывода на экран ошибки, если комнаты нет
};

export const loginroomReducer = (state = initialState, action) => {
  //Reducer со всеми экшенами взаимодействия страницы логина
  let stateCopy = { ...state };
  switch (action.type) {
    case actionsNames.SEND_LOGINROOM_DATA: //Экшн, отвечающий за сохранение данных ника и RoomID в LocalStorage
    localStorage.clear(); //Почистить хранилище от старых значений (если они есть) ника и RoomID
    localStorage.setItem("username", action.usernameFieldValue); //Сохранить в хранилище ник
    localStorage.setItem("roomID", action.roomIDFieldValue); //Сохранить в хранилище RoomID
    localStorage.setItem(
        "usernameSecretKey",
        action.usernameSecretKeyFieldValue
      ); //Сохранить секретный ключ ника в хранлище
      stateCopy.notCorrectValidationData = ""; //Очистить поле ошибок валидации
      stateCopy.usernameFieldValue = ""; //Очистить input ника на странице валидации
      stateCopy.roomIDFieldValue = ""; //Очистить input RoomID на странице валидации
      return stateCopy;
    case actionsNames.CHANGE_NAME_STATUS_LOGGINING_BTN: //Экшн, меняющий статус кнопки (отключение/включение), пока нет ответа на запрос от сервера
      stateCopy = { ...state };
      stateCopy.loginBtnClickableStatus = action.enableStatus;
      stateCopy.loginBtnName = action.changedName; //Изменить название внутри кнопки логин на то, которое пришло от action параметра
      return stateCopy;
    case actionsNames.CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE:
      stateCopy = { ...state };
      if (action.messageServerData == null) {
        stateCopy.roomIsExistsServerResponse = null;
      } else {
        stateCopy.roomIsExistsServerResponse = action.messageServerData;
      }
      return stateCopy;
    case actionsNames.CHANGE_CREATE_OR_LOGIN_STATUS:
      stateCopy = { ...state };
      stateCopy.createOrLoginStatus = action.status;
      return stateCopy;
    default:
      return state;
  }
};

export const checkRoomExistsTC = () => {
  //Thunk creator, посылающий запрос к API с проверкой существования комнаты
  return (dispatch) => {
    dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Loggining..."), false); //Отключить кнопку логина на время ожидания запроса
    loginAPI
      .checkRoomExists()
      .then((response) => {
        //Как получен ответ выполнить логику ниже
        console.log(response.data);
        if (response.data != null) {
          //Если комната есть, включить кнопку логина и в dispatch отправить статус существования комнаты с флагом true
          console.log("Room yes");
          dispatch(CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE_AC(response.data));
          dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(true));
          dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Login", true));
        } else {
          //Если же комнаты нет, включить кнопку логина  и в dispatch отправить статус существования комнаты с флагом false
          console.log("Room does not exists.");
          dispatch(CHANGE_ROOM_IS_EXISIS_SERVER_RESPONSE_AC(response.data));
          dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(false));
          dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Login"), true);
        }
      })
      .catch((error) => {
        //Если есть косяки при отправке запроса, вывести их на экран
        console.log(error);
      });
  };
};

export const createNewRoomTC = (status) => {
  return (dispatch) => {
    if (status) {
      dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Creating..."), false); //Отключить кнопку логина на время ожидания запроса
      loginAPI
        .createNewRoom()
        .then((response) => {
          //Как получен ответ выполнить логику ниже
          console.log(response.data);
          if (response.data == true) {
            //Если комната есть, включить кнопку логина и в dispatch отправить статус существования комнаты с флагом true
            console.log("Room created");
            dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(true));
            dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Create", true));
          } else {
            //Если же комнаты нет, включить кнопку логина  и в dispatch отправить статус существования комнаты с флагом false
            console.log("Room not created.", response.data);
            dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(false));
            dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Create"), true);
          }
        })
        .catch((error) => {
          //Если есть косяки при отправке запроса, вывести их на экран
          console.log(error);
        });
    }
  };
};
