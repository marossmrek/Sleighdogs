export function setSnackBarMsg(msg) {
    return {
        type: "CHANGE_MSG",
        payload: msg
    };
}

export function closeSnackBarMsg() {
    return {
        type: "HIDDEN_BAR"
    };
}

