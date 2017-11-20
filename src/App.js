import React from 'react';

import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

import {PlayedVideo} from './PlayedVideo';
import {ListOfVideo} from './ListOfVideo';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultOfSearch: [],
            searchText: "",
            choosedVideo: null
        };

        this.searchVideos = this.searchVideos.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
        this.handleChoosedVideo = this.handleChoosedVideo.bind(this)
    }

    componentWillMount() {
        this.searchVideos();
    }

    searchVideos() {
        const ApiKey = 'AIzaSyAMgv6qxRfvWnfsOkEgkwwebN7RI3-uenY';
        const NumberOfResult = 50;
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}
                      &part=snippet&maxResults=${NumberOfResult}&q=${this.state.searchText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    resultOfSearch: responseJson.items,
                    searchText: ""
                })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    handleSearchTextChange(event) {
        this.setState({
            searchText: event.target.value
        })
    }

    handleChoosedVideo(id) {
        this.setState({
            choosedVideo: `https://www.youtube.com/embed/${id}`
        })
    }

    render() {
        const videoLinks = this.state.resultOfSearch.map(video => "https://www.youtube.com/embed/" + video.id.videoId);
        return (
            <div>
                <AppBar
                    titleStyle={{display: "none"}}
                    showMenuIconButton={false}
                    className="app-bar"
                    children={
                        <TextField
                            onKeyPress={(event) => event.which === 13 && this.searchVideos()}
                            value={this.state.searchText}
                            onChange={this.handleSearchTextChange}
                            autoFocus={true}
                            className="search-field"
                            hintText="Search video"/>
                    }
                />
                <div className="container-fluid text-center">
                    <div className="row content">
                        <PlayedVideo videoLink={this.state.choosedVideo ? this.state.choosedVideo : videoLinks[0]}/>
                        <ListOfVideo handleChoosedVideo={this.handleChoosedVideo}
                                     videos={this.state.resultOfSearch}/>
                    </div>
                </div>
            </div>
        );
    }

}

export default App;
