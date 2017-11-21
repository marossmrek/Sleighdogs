import React from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

import {PlayedVideo} from '../components/PlayedVideo';
import {ListOfVideo} from '../components/ListOfVideo';
import ReduxSearchField from '../components/ReduxSearchField';

import {switchLoaderDisplay} from '../actions/loaderAction';
import {setSnackBarMsg} from '../actions/snackAction';
import {setFetchVideos, changeChoosedVideo} from '../actions/videoAction'
import {reset} from 'redux-form';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.searchVideos = this.searchVideos.bind(this);
    }

    componentWillMount() {
        this.searchVideos();
    }

    searchVideos(searchText = "") {
        this.props.switchLoaderDisplay(true);

        const ApiKey = 'AIzaSyAMgv6qxRfvWnfsOkEgkwwebN7RI3-uenY';
        const NumberOfResult = 20;
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}
                      &part=snippet&maxResults=${NumberOfResult}&q=${searchText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.props.setFetchVideos(responseJson.items);
                this.props.switchLoaderDisplay(false);
            })
            .catch(() => {
                this.props.setSnackBarMsg("Something wrong, please try later")
            })
    }

    render() {
        return (
            <div>
                {this.props.loader.isShow &&
                <CircularProgress
                    style={{position: "absolute", zIndex: 10000, left: 'calc(50% - 40px)', top: 'calc(50% - 40px)'}}
                    size={80} thickness={5}/>
                }
                <AppBar
                    titleStyle={{display: "none"}}
                    showMenuIconButton={false}
                    className="app-bar"
                    children={<ReduxSearchField onSubmit={(searchVideo) => this.searchVideos(searchVideo.video)}/>}
                />
                <div className="container-fluid text-center">
                    <div className="row content">
                        <PlayedVideo choosedVideo={this.props.video.choosedVideo && this.props.video.choosedVideo}/>
                        <ListOfVideo choosedVideo={this.props.video.choosedVideo && this.props.video.choosedVideo}
                                     handleChoosedVideo={(video) => this.props.changeChoosedVideo(video)}
                                     videos={this.props.video.resultOfSearch}/>
                    </div>
                </div>
                <Snackbar
                    open={this.props.snack.isOpen}
                    message={this.props.snack.msg}
                    autoHideDuration={5000}
                />
            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        snack: state.snack,
        video: state.video
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        switchLoaderDisplay: (isShow) => {
            dispatch(switchLoaderDisplay(isShow));
        },
        setSnackBarMsg: (msg) => {
            dispatch(setSnackBarMsg(msg));
        },
        setFetchVideos: (videos) => {
            dispatch(setFetchVideos(videos));
            dispatch(reset('ReduxSearchField'));
        },
        changeChoosedVideo: (choosedVideo) => {
            dispatch(changeChoosedVideo(choosedVideo))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
