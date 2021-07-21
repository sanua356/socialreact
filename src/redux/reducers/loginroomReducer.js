import { loginAPI } from "../../APIrequests/api"; //Импорт обьекта с асинхронщиной к серверу для страницы логина
import { CHANGE_ROOM_EXISTS_STATUS_AC } from "../reducers/mainReducer"; //Импорт Action Creater для проверки существования комнаты при логине
const actionsNames = {
  //Обьект с константами для вызова Action Creater
  CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM: "CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM",
  CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: "CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM",
  SEND_LOGINROOM_DATA: "SEND_LOGINROOM_DATA",
  CHANGE_NAME_STATUS_LOGGINING_BTN: "CHANGE_NAME_STATUS_LOGGINING_BTN",
};

export function CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM_AC(textdata) {
  //АС, который вызывается при взаимодействии с input ввода ника на странице логина
  return {
    type: "CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM",
    newUsernameValue: textdata,
  };
}

export function CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM_AC(textdata) {
  //АС, который вызывается при взаимодействии с input ввода RoomID на странице логина
  return {
    type: "CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM",
    newRoomIDValue: textdata,
  };
}

export function SEND_LOGINROOM_DATA_AC() {
  //АС, который вызывается при клике на кнопку "Login" на странице логина
  return {
    type: "SEND_LOGINROOM_DATA",
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

const initialState = {
  changedUsername: "", //Временная переменная, хранящая строку из input ввода ника
  changedRoomID: "", //Временная переменная, хранящая строку из input ввода RoomID
  notCorrectValidationData: "", //Временная переменная, хранящая строку при возникновении ошибок ввода (валидации) введённых данных в inputs
  loginBtnName: "Login", //Переменная, хранящая текст внутри кнопки логина (нужна для вывода сообщения "Loggining...") во время ожидания ответа запроса к БД
  loginBtnClickableStatus: true, //Переменная для отключения кнопки, во время ожиданеия ответа от сервера к БД
};

const validation = (valuesFields, fieldsNames) => {
  //Функция валидации полей логина
  for (let i = 0; i < valuesFields.length; i++) {
    if (valuesFields[i]) {
      //Если поле не пусто
      if (valuesFields[i].length >= 3) {
        //Если длина строки не меньше 3 символов
      } else {
        return "minimum field length - 3 characters";
      }
    } else {
      return "not correct " + fieldsNames[i];
    }
  }
};

export const loginroomReducer = (state = initialState, action) => {
  //Reducer со всеми экшенами взаимодействия страницы логина
  let stateCopy = { ...state };
  switch (action.type) {
    case actionsNames.CHANGED_USERNAME_FIELD_IN_LOGIN_ROOM: //Вызов экшена во время изменений в поле ввода ника
      stateCopy.changedUsername = action.newUsernameValue;
      return stateCopy;
    case actionsNames.CHANGED_ROOMID_FIELD_IN_LOGIN_ROOM: //Вызов экшена во время изменений в поле ввода RoomID
      stateCopy.changedRoomID = action.newRoomIDValue;
      return stateCopy;
    case actionsNames.SEND_LOGINROOM_DATA: //Экшн, отвечающий за сохранение данных ника и RoomID в LocalStorage
      localStorage.clear(); //Почистить хранилище от старых значений (если они есть) ника и RoomID
      const validationCheckErrors = validation(
        //Проверка на корректность данных (валидацию) полей страницы логина
        [stateCopy.changedUsername, stateCopy.changedRoomID], //Поля, которые нужно проверить
        ["username", "roomID"] //Названия этих полей для вывода ошибок валидации на экран (если они возникли)
      );
      if (!validationCheckErrors) {
        //Если нет ошибок валидации
        localStorage.setItem("username", stateCopy.changedUsername); //Сохранить в хранилище ник
        localStorage.setItem("roomID", stateCopy.changedRoomID); //Сохранить в хранилище RoomID
        stateCopy.notCorrectValidationData = ""; //Очистить поле ошибок валидации
        stateCopy.changedUsername = ""; //Очистить input ника на странице валидации
        stateCopy.changedRoomID = ""; //Очистить input RoomID на странице валидации
      } else {
        stateCopy.notCorrectValidationData = validationCheckErrors; //Если же ошибки есть, отправить из в переменную вывода ошибок
      } //При возникновении ошибок, они выведутся из переменной выше на экран путём connect()
      return stateCopy;
    case actionsNames.CHANGE_NAME_STATUS_LOGGINING_BTN: //Экшн, меняющий статус кнопки (отключение/включение), пока нет ответа на запрос от сервера
      stateCopy = { ...state };
      stateCopy.loginBtnClickableStatus = action.enableStatus; //Включить или отключить кнопку в зависимости от пришедшего action параметра
      stateCopy.loginBtnName = action.changedName; //Изменить название внутри кнопки логин на то, которое пришло от action параметра
      return stateCopy;
    default:
      return state;
  }
};

export const checkRoomExistsTC = () => {
  //Thunk creator, посылающий запрос к API с проверкой существования комнаты
  return (dispatch) => {
    dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Loggining...", false)); //Отключить кнопку логина на время ожидания запроса
    loginAPI
      .checkRoomExists()
      .then((response) => {
        //Как получен ответ выполнить логику ниже
        console.log(response.data);
        if (response.data != null) {
          //Если комната есть, включить кнопку логина и в dispatch отправить статус существования комнаты с флагом true
          console.log("Room yes");
          dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(true));
          dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Login", true));
        } else {
          //Если же комнаты нет, включить кнопку логина  и в dispatch отправить статус существования комнаты с флагом false
          console.log("Room does not exists.");
          dispatch(CHANGE_ROOM_EXISTS_STATUS_AC(false));
          dispatch(CHANGE_NAME_STATUS_LOGGINING_BTN_AC("Login", true));
        }
      })
      .catch((error) => {
        //Если есть косяки при отправке запроса, вывести их на экран
        console.log(error);
      });
  };
};
