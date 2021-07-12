const initialState = {
        sidebarMenuItems: [
            {
                itemName: "Profile",
                link: "/profile"
            },
            {
                itemName: "Messages",
                link: "/messages"
            },
            {
                itemName: "Updates",
                link: "/updates"
            },
            {
                itemName: "Exit",
                link: "/logout"
            }
        ]
}
export const navbarReducer = (state = initialState, action) => {

    return state;
}
