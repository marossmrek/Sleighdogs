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
        const NumberOfResult = 20;
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}
                      &part=snippet&maxResults=${NumberOfResult}&q=${this.state.searchText}`;

        fetch(apiUrl)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    resultOfSearch: responseJson.items,
                    searchText: "",
                    choosedVideo: null
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
                        <PlayedVideo choosedVideo={this.state.choosedVideo && this.state.choosedVideo}/>
                        <ListOfVideo choosedVideo={this.state.choosedVideo && this.state.choosedVideo}
                                     handleChoosedVideo={this.handleChoosedVideo}
                                     videos={this.state.resultOfSearch}/>
                </div>
            </div>
        );
    }

}

export default App;
