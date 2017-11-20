import React from "react";
import Paper from 'material-ui/Paper';

export const PlayedVideo = (props) => {
    return (
        <div className="col-sm-7">
            <Paper className="paper" zDepth={3}>
                <iframe title={props.videoLink}
                        width="560"
                        height="315"
                        src={props.videoLink}
                        frameBorder="0"
                        allowFullScreen>
                </iframe>
            </Paper>
        </div>
    )
};