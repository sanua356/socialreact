import {
  faUser,
  faComments,
  faEdit,
  faDoorOpen,
} from "@fortawesome/free-solid-svg-icons";
const initialState = {
  //State с названиями и ссылками для перехода на странице в меню navbar
  sidebarMenuItems: [
    //Массив ссылок (пунктов меню)
    {
      itemName: "Profile",
      link: "/profile",
      icon: faUser,
    },
    {
      itemName: "Messages",
      link: "/messages",
      icon: faComments,
    },
    {
      itemName: "Updates",
      link: "/updates",
      icon: faEdit,
    },
    {
      itemName: "Exit",
      link: "/logout",
      icon: faDoorOpen,
    },
  ],
};
export const navbarReducer = (state = initialState, action) => {
  return state;
};
