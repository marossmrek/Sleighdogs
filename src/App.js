import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            resultOfSearch: [],
            searchText: ""
        };

        this.searchVideos = this.searchVideos.bind(this);
        this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
    }

    searchVideos(event) {
        const ApiKey = 'AIzaSyAMgv6qxRfvWnfsOkEgkwwebN7RI3-uenY';
        const NumberOfResult = 10;
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
        return (
            <MuiThemeProvider>
                <AppBar
                    titleStyle={{display: "none"}}
                    showMenuIconButton={false}
                    style={{padding: "10px 0"}}
                    children={
                        <TextField
                            onKeyPress={this.searchVideos}
                            value={this.state.searchText}
                            onChange={this.handleSearchTextChange}
                            autoFocus={true}
                            style={{position: "relative", left: "25%", width: "50%"}}
                            hintText="Search video"/>
                    }
                />
            </MuiThemeProvider>
        );
    }

}

export default App;
