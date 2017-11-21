const loaderReducer = (state = {
    isShow: true,
}, action) => {
    switch (action.type) {
        case "SWITCH_DISPLAY":
            state = {
                isShow: action.payload
            };
            break;
    }
    return state;
};

export default loaderReducer;