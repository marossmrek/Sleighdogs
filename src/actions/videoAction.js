export function setFetchVideos(videos) {
    return {
        type: "FETCH_RESULT",
        payload: videos
    };
}

export function changeChoosedVideo(choosedVideo) {
    return {
        type: "CHOOSED_VIDEO",
        payload: choosedVideo
    };
}


