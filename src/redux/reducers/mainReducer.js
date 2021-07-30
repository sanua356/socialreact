const actionsNames = {
  //Обьект с константами для вызова Action Creater
  SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE:
    "SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE",
  CHANGE_ROOM_EXISTS_STATUS: "CHANGE_ROOM_EXISTS_STATUS",
};

const initialState = {
  username: "",
  roomID: "",
  isLoggined: false,
  roomIsExists: false,
};

export function SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE_AC() {
  //АС, который вызывается для сохранения в state данных username и roomID из Localstorage
  return {
    type: "SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE",
  };
}
export function CHANGE_ROOM_EXISTS_STATUS_AC(status) {
  //АС, который вызывается для проверки существования комнаты, и последующей отправки флага существования в state
  return {
    type: "CHANGE_ROOM_EXISTS_STATUS",
    existsStatus: status,
  };
}
export const mainReducer = (state = initialState, action) => {
  //Reducer со всеми экшенами взаимодействия страниц, которым нужны глобальные данные по типу RoomID и username
  let stateCopy = { ...state };
  switch (action.type) {
    case actionsNames.SAVE_ROOMID_AND_USERNAME_LOCALSTORAGE: //Вызов при клике на кнопку логина на странице /login
      stateCopy = { ...state };
      if (
        //Если в localstorage попали данные со странице логина, значит валидация успешна и комната существует
        localStorage.getItem("username") !== null &&
        localStorage.getItem("roomID") !== null
      ) {
        stateCopy.username = localStorage.getItem("username"); //Сохранить в state данные ника из localstorage
        stateCopy.roomID = localStorage.getItem("roomID"); //Сохранить в state данные RoomID из localstorage
        stateCopy.isLoggined = true; //Поставить флаг залогинености на true
      } else {
        //Если нет данных из localstorage
        stateCopy.isLoggined = false; //Поставить флаг залогинености на false
      }
      return stateCopy;
    case actionsNames.CHANGE_ROOM_EXISTS_STATUS: //Вызов при смене статуса существования комнаты
      stateCopy = { ...state };
      stateCopy.roomIsExists = action.existsStatus; //Отправить значения флага существования комнаты из action в state
      return stateCopy;
    default:
      return state;
  }
};
