export function setUserGoogleLoggin(isLoggin) {
    return {
        type: "SWITCH_LOGIN",
        payload: isLoggin
    };
}