import React from "react";
import PropTypes from 'prop-types';

import Paper from 'material-ui/Paper';
import {Card, CardMedia, CardTitle} from 'material-ui/Card';

export class ListOfVideo extends React.Component {

    renderCard(video) {
        return (
            <Card key={video.id.videoId}
                  className="card"
                  onClick={() => this.props.handleChoosedVideo(video)}>
                <CardMedia
                    overlay={<CardTitle title={video.snippet.title}
                                        titleStyle={{fontSize: "12px", lineHeight: "15px"}}/>}
                >
                    <img className="video-thunbnail"
                         src={video.snippet.thumbnails.high.url}
                         alt={video.snippet.title}/>
                </CardMedia>
            </Card>
        )
    }

    render() {
        return (
            this.props.choosedVideo ?
                <div className="col-sm-4">
                    <Paper className="paper" zDepth={3}>
                        {
                            this.props.videos.map((video) => {
                                return video.id.videoId !== this.props.choosedVideo.id.videoId && this.renderCard(video)
                            })
                        }
                    </Paper>
                </div>
                :
                <Paper className="paper col-xs-12" zDepth={3}>
                    {
                        this.props.videos.map((video) =>
                            <div className="col-xs-12 col-sm-6 col-md-3">
                                {this.renderCard(video)}
                            </div>
                        )
                    }
                </Paper>
        )
    }

}
;

ListOfVideo.propTypes = {
    choosedVideo: PropTypes.object,
    handleChoosedVideo: PropTypes.func,
    videos: PropTypes.array
};
