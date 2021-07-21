const initialState = { //State с названиями и ссылками для перехода на странице в меню navbar
  sidebarMenuItems: [ //Массив ссылок (пунктов меню)
    {
      itemName: "Profile",
      link: "/profile",
    },
    {
      itemName: "Messages",
      link: "/messages",
    },
    {
      itemName: "Updates",
      link: "/updates",
    },
    {
      itemName: "Exit",
      link: "/logout",
    },
  ],
};
export const navbarReducer = (state = initialState, action) => {
  return state;
};
