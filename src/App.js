import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
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
    }

    searchVideos(event) {
        const ApiKey = 'AIzaSyAMgv6qxRfvWnfsOkEgkwwebN7RI3-uenY';
        const NumberOfResult = 5;
        let apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${ApiKey}
                        &part=snippet,id&order=date&maxResults=${NumberOfResult}&q=${this.state.searchText}`;

        if (event.which === 13) {
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
    }

    handleSearchTextChange(event) {
        this.setState({
            searchText: event.target.value
        })
    }

    render() {
        const videoLinks = this.state.resultOfSearch.map(video => "https://www.youtube.com/embed/" + video.id.videoId);
        return (
            <MuiThemeProvider>
                <div>
                    <AppBar
                        titleStyle={{display: "none"}}
                        showMenuIconButton={false}
                        className="app-bar"
                        children={
                            <TextField
                                onKeyPress={this.searchVideos}
                                value={this.state.searchText}
                                onChange={this.handleSearchTextChange}
                                autoFocus={true}
                                className="search-field"
                                hintText="Search video"/>
                        }
                    />
                    <div className="container-fluid text-center">
                        <div className="row content">
                            <PlayedVideo videoLink={this.state.choosedVideo === null ? videoLinks[0] : this.state.choosedVideo}/>
                            <ListOfVideo videos={this.state.resultOfSearch}/>
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

}

export default App;
