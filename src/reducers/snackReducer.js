const snackReducer = (state = {
    isOpen: false,
    msg: ""
}, action) => {
    switch (action.type) {
        case "CHANGE_MSG":
            state = {
                ...state,
                isOpen: true,
                msg: action.payload
            };
            break;
        case "HIDDEN_BAR":
            state = {
                ...state,
                isOpen:false
            };
            break;
    }
    return state;
};

export default snackReducer;