import React from "react";
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

export const ListOfVideo = (props) => {
    let videoList = props.videos.map((video) => {
        return (
            <Card className="card" key={video.id.videoId} onClick={() => props.handleChoosedVideo(video.id.videoId)}>
                <CardMedia
                    overlay={<CardTitle title={video.snippet.title}
                                        titleStyle={{fontSize: "12px", lineHeight: "15px"}}/>}
                >
                    <img src={video.snippet.thumbnails.medium.url} alt={video.snippet.title}/>
                </CardMedia>
            </Card>
        )
    });

    return (
        <div className="col-sm-4">
            <Paper className="paper" zDepth={3}>
                {videoList}
            </Paper>
        </div>
    )
};

ListOfVideo.propTypes = {
    handleChoosedVideo: PropTypes.func,
    videos: PropTypes.array
};
