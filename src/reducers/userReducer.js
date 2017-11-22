const userReducer = (state = {
    isLoggin: false,
}, action) => {
    switch (action.type) {
        case "SWITCH_LOGIN":
            state = {
                isLoggin: action.payload
            };
            break;
    }
    return state;
};

export default userReducer;