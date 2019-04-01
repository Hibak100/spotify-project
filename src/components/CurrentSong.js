import React, {Component} from 'react';
import './CurrentSong.css';
import PropTypes from 'prop-types';
import {controls} from "../lib/spotifyApiCalls";

class CurrentSong extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pause: true,
      skip: null
    };
  }

  updatePauseAction(action) {
     this.setState({
      pause: !this.state.pause
    },  async () => await controls(action));
  }

  updateSkipAction(action) {
     controls(action).then(() => this.props.updatePlaying())
  }

  render() {
    const action = this.state.pause ? "pause" : "play";
    return (
      <div className="CurrentSong">
        <div>
          <img className="MainImage" src={this.props.nowPlaying.image} alt={'albumArt'}/>
        </div>
        <div className="Controls">
          <button className="btn" onClick={() => this.updateSkipAction("previous")}><i className="fa fa-backward"/></button>
          <button className="btn" onClick={() => this.updatePauseAction(action)}><i className={`fa fa-${action}`}/></button>
          <button className="btn" onClick={() => this.updateSkipAction("next")}><i className="fa fa-forward"/></button>
          {this.props.children}
        </div>
        <div>
          <div>
            Now Playing: {this.props.nowPlaying.song}
          </div>
          <div>
            Artist: {this.props.nowPlaying.artists.map((a, idx) =>
            <span key={`${a.name}_${idx}`}> {a.name}</span>)}
          </div>
          <div>
            Album: {this.props.nowPlaying.album}
          </div>
          <div>
            Release Date: {this.props.nowPlaying.releaseDate}
          </div>
        </div>
      </div>
    );
  }
}

CurrentSong.propTypes = {
  nowPlaying: PropTypes.object,
  children: PropTypes.node,
  updatePlaying: PropTypes.func
};

export default CurrentSong;
