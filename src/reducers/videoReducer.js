const videoReducer = (state = {
    resultOfSearch: [],
    choosedVideo: null
}, action) => {
    switch (action.type) {
        case "FETCH_RESULT":
            state = {
                ...state,
                choosedVideo: null,
                resultOfSearch: action.payload
            };
            break;
        case "CHOOSED_VIDEO" :
            state = {
                ...state,
                choosedVideo: action.payload
            };
            break;
    }
    return state;
};

export default videoReducer;