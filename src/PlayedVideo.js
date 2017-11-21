import React from "react";
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

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
                               titleStyle={{textAlign:"left"}}
                               subtitle={props.choosedVideo.snippet.description}
                               subtitleStyle={{textAlign:"left"}}/>
                </Card>
            </Paper>
        </div>
    )
};

PlayedVideo.propTypes = {
    choosedVideo: PropTypes.object
};