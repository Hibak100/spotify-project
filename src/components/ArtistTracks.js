import React, {Component} from 'react';
import Table from "./Table";
import './ArtistTracks.css'
import {getArtistTracks} from "../lib/spotifyApiCalls";
import PropTypes from "prop-types";

class ArtistTracks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      currentOption: "All",
      options: ["All", "Upbeat", "Mellow"]
    };
    this.updateArtist(props.artists[0]);
  }

  updateArtist(artist) {
    getArtistTracks(artist.id).then((res) =>
      this.setState({
        allTracks: res,
        tracks: res,
        currentOption: "All",
        artist: artist.name
      }));
  }

  filterTracks(option){
    this.setState({
      tracks: this.filterBy(option, this.state.allTracks),
      currentOption: option
    })
  }

  filterBy(option, tracks) {
    if (option !== "All") {
      return tracks.filter((t) => t.mood === option);
    }
    return tracks;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.artists !== prevProps.artists && this.props.artists) {
      this.updateArtist(this.props.artists[0])
    }
  }

  render() {
    return (
      <div className="Table">
        <div className="ButtonContainer">
          <div id="artists">
          Artist: {
            this.props.artists.map((a, idx) =>
              <button key={`${a.name}_${idx}`}
                      className={`btn ${this.state.artist === a.name && 'btn-outline-dark'}`}
                      style={{marginRight:"10px"}}
                      onClick={() => this.updateArtist(a)}>{a.name}</button>)
          }
          </div>
          <div id="options">
            Options: {
            this.state.options.map((m, idx) =>
              <button key={`${m}_${idx}`}
                      className={`btn ${this.state.currentOption === m && 'btn-outline-dark'}`}
                      style={{marginRight:"10px"}}
                      onClick={() => this.filterTracks(m)}>{m}</button>
            )
          }
          </div>
        </div>
        {this.state.tracks.length > 0 ?
          <Table tracks={this.state.tracks}/>
          :
          <div className="alert alert-warning" role="alert">
            No Tracks Found
          </div>
        }
      </div>
    );
  }
}

ArtistTracks.propTypes = {
  artists: PropTypes.array
};

ArtistTracks.defaultProps ={
  artists: [{id:"foo"}]
};

export default ArtistTracks;
