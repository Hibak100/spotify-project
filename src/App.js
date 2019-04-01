import React, {Component} from 'react';
import './App.css';
import CurrentSong from "./components/CurrentSong";
import {getNowPlaying} from "./lib/spotifyApiCalls";
import ArtistTracks from "./components/ArtistTracks";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nowPlaying: null
    };
    this.nowPlaying();
  }

  nowPlaying() {
    getNowPlaying().then((response) => this.setState(response));
  }

  render() {
    return (
      <div className="App">
        <div className="LoginContainer">
          <button className="btn btn-outline-dark">
            <a href='http://localhost:8888' className="LoginIn"> Login to Spotify </a>
          </button>
        </div>
        {
          this.state.nowPlaying ?
            <div className="Container">
              <CurrentSong nowPlaying={this.state.nowPlaying} updatePlaying={() => this.nowPlaying()}>
                <button className="btn btn-outline-dark" onClick={() => this.nowPlaying()}>Now Playing</button>
              </CurrentSong>
              <ArtistTracks artists={this.state.nowPlaying.artists}/>
            </div> :
            <div className="alert alert-warning" role="alert">
              Player has stopped
            </div>
        }
      </div>
    );
  }
}

export default App;
