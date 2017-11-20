import React from "react";
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';

export const PlayedVideo = (props) => {
    return (
        <div className="col-sm-8">
            <Paper className="paper" zDepth={3}>
                <iframe className="video"
                        src={props.videoLink}
                        frameBorder="0"
                        allowFullScreen>
                </iframe>
            </Paper>
        </div>
    )
};

PlayedVideo.propTypes = {
    PlayedVideo: PropTypes.string,
};