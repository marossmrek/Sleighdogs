import React from 'react';
import {connect} from 'react-redux';

import AppBar from 'material-ui/AppBar';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import FlatButton from 'material-ui/FlatButton';

import {PlayedVideo} from '../components/PlayedVideo';
import {ListOfVideo} from '../components/ListOfVideo';
import ReduxSearchField from '../components/ReduxSearchField';

import {switchLoaderDisplay} from '../actions/loaderAction';
import {setSnackBarMsg, closeSnackBarMsg} from '../actions/snackAction';
import {setFetchVideos, changeChoosedVideo} from '../actions/videoAction';
import {setUserGoogleLoggin} from '../actions/userAction';

import {reset} from 'redux-form';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.searchVideos = this.searchVideos.bind(this);
        this.initClient = this.initClient.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.handleLoginClick = this.handleLoginClick.bind(this);
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

    componentDidMount() {
        window.gapi.load('client:auth2', this.initClient);
    }

    initClient() {
        window.gapi.client.init({
            'clientId': '333261271673-dpbki5e39148gtpaqisni0sv8qttejrt.apps.googleusercontent.com',
            'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
            'scope': 'https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner'
        }).then(() => {
            let auth = window.gapi.auth2.getAuthInstance();
            let user = auth.currentUser.get();
            let isAuthorized = user.hasGrantedScopes('https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtubepartner');
            this.props.setUserGoogleLoggin(isAuthorized)

        }).catch(() => {
            this.props.setSnackBarMsg("Something wrong, please try later")
        })
    }

    handleLoginClick() {
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signIn().then(() => {
           this.setUserLogin(true,"Login successful");
        }).catch(() => {
            this.props.setSnackBarMsg("Something wrong, please try later")
        });
    }

    handleLogoutClick() {
        let auth2 = window.gapi.auth2.getAuthInstance();
        auth2.signOut().then(() => {
            this.setUserLogin(false,"Logout successful");
        }).catch(() => {
            this.props.setSnackBarMsg("Something wrong, please try later")
        });
    }

    setUserLogin(isLoggin,msg) {
        this.props.setUserGoogleLoggin(isLoggin);
        this.props.setSnackBarMsg(msg)
    }

    executeRequest(request) {
        request.execute((response) => {
            !response.code ? this.props.setSnackBarMsg("The rating send successfully") :
                response.code === 401 ? this.props.setSnackBarMsg("You are not loggin") :
                    this.props.setSnackBarMsg("Something wrong, please try later");
        });
    }

    videosRate(params) {
        let request = window.gapi.client.youtube.videos.rate(params);
        this.executeRequest(request);
    }

    defineRequest(videoId, rateStatus) {
        this.videosRate({'id': videoId, 'rating': rateStatus});
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
                    iconElementRight={this.props.user.isLoggin ?
                        <FlatButton label="Logout" onClick={this.handleLogoutClick}/> :
                        <FlatButton label="Login" onClick={this.handleLoginClick}/>
                    }
                    iconStyleRight={{margin: "0", width: "50%"}}
                />

                <div className="container-fluid text-center">
                    <div className="row content">
                        <PlayedVideo handleClickRate={(videoId, rateStatus) => this.defineRequest(videoId, rateStatus)}
                                     choosedVideo={this.props.video.choosedVideo && this.props.video.choosedVideo}/>
                        <ListOfVideo choosedVideo={this.props.video.choosedVideo && this.props.video.choosedVideo}
                                     handleChoosedVideo={(video) => this.props.changeChoosedVideo(video)}
                                     videos={this.props.video.resultOfSearch}/>
                    </div>
                </div>

                <Snackbar
                    open={this.props.snack.isOpen}
                    message={this.props.snack.msg}
                    autoHideDuration={5000}
                    onRequestClose={this.props.closeSnackBarMsg}
                />

            </div>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        loader: state.loader,
        snack: state.snack,
        video: state.video,
        user: state.user
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
        closeSnackBarMsg: () => {
            dispatch(closeSnackBarMsg())
        },
        setFetchVideos: (videos) => {
            dispatch(setFetchVideos(videos));
            dispatch(reset('ReduxSearchField'));
        },
        changeChoosedVideo: (choosedVideo) => {
            dispatch(changeChoosedVideo(choosedVideo))
        },
        setUserGoogleLoggin: (isLoggin) => {
            dispatch(setUserGoogleLoggin(isLoggin))
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
