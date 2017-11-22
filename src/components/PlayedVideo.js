import React from "react";
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import {Card, CardMedia, CardTitle, CardActions} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import ThumbUp from 'material-ui/svg-icons/action/thumb-up';
import ThumbDown from 'material-ui/svg-icons/action/thumb-down';


export const PlayedVideo = (props) => {
    return (
        props.choosedVideo &&
        <div className="col-sm-8">
            <Paper className="paper" zDepth={3}>
                <Card>
                    <CardMedia>
                        <iframe title={props.choosedVideo.snippet.title}
                                className="video"
                                src={`https://www.youtube.com/embed/${props.choosedVideo.id.videoId}`}
                                frameBorder="0"
                                allowFullScreen>
                        </iframe>
                    </CardMedia>
                    <CardTitle title={props.choosedVideo.snippet.title}
                               subtitle={props.choosedVideo.snippet.description}/>
                    <CardActions>
                        <IconButton tooltip="Send Like"
                                    onClick={() => props.handleClickRate(props.choosedVideo.id.videoId, "like")}>
                            <ThumbUp/>
                        </IconButton>
                        <IconButton tooltip="Send Dislike"
                                    onClick={() => props.handleClickRate(props.choosedVideo.id.videoId, "dislike")}>
                            <ThumbDown/>
                        </IconButton>
                    </CardActions>
                </Card>
            </Paper>
        </div>
    )
};

PlayedVideo.propTypes = {
    choosedVideo: PropTypes.object,
    handleClickRate: PropTypes.func
};
