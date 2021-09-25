export const CHANGE_SUB_MENU = "CHANGE_SUB_MENU"
export const OPEN_CLOSE_EVENT_MODAL = "OPEN_CLOSE_EVENT_MODAL"

export const openCloseEventModal = (e) => {
    return {
        type: OPEN_CLOSE_EVENT_MODAL,
        payload: e
    }
}

export const changeSubMenu = (submenu = "events") => {
    return {
        type: CHANGE_SUB_MENU,
        payload: submenu
    }
}


