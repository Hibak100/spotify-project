import React, {Component} from 'react';
import './Table.css';
import PropTypes from 'prop-types';
import Modal from 'react-modal';

class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      preview: null
    };
  }

  showModal(preview) {
    this.setState({
      modal: !this.state.modal,
      preview: preview
    })
  }

  render() {
    return (
      <React.Fragment>
        <table className="table">
          <thead>
          <tr>
            <th className="preview">Preview</th>
            <th className="art">Album Art</th>
            <th className="song">Song</th>
            <th className="artist">Artist</th>
            <th className="album">Album</th>
          </tr>
          </thead>
          <tbody>
          {
            this.props.tracks.map((t, idx) => {
              return (
                <tr key={`${t.song}_${idx}`}>
                  <td className="preview">
                    <button className="btn btn-outline-dark" onClick={() => this.showModal(t.preview)}><i
                      className="fa fa-music"/></button>
                  </td>
                  <td className="art"><img src={t.image} className="Thumbnail" alt={'albumArt'}/></td>
                  <td className="song">{t.song}</td>
                  <td className="artist">{t.artist.map((a, idx) => <div key={`${a}_${idx}`}>{a.name}</div>)}</td>
                  <td className="album">{t.album}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
        <Modal isOpen={this.state.modal} className="Modal">
          <div className="ModalContent">
            <audio controls src={this.state.preview}/>
            <button className="btn" onClick={() => this.showModal(this.state.preview)}><i className="fa fa-times"/></button>
          </div>
        </Modal>
      </React.Fragment>

    );
  }
}

Table.propTypes = {
  tracks: PropTypes.array
};

export default Table;
