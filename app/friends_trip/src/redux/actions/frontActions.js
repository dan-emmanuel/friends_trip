export const CHANGE_SUB_MENU = "CHANGE_SUB_MENU"

export const changeSubMenu = (submenu = "events") => {
    return {
        type: CHANGE_SUB_MENU,
        payload: submenu
    }
}


