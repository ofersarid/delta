import React, { PureComponent } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import autoBind from 'auto-bind';
// import PropTypes from 'prop-types';
import styles from './styles.scss';

class Playground extends PureComponent {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  getExt(string) {
    return string.split(' ')[0].split('.').pop();
  }

  getBytes(string) {
    return parseInt(string.split(' ')[1].slice(0, -1));
  }

  solution(S) {
    const rows = S.split('\n');

    const analysis = {
      music: 0,
      images: 0,
      movies: 0,
      other: 0
    };

    rows.forEach(row => {
      const ext = this.getExt(row);
      const bytes = this.getBytes(row);
      switch (ext) {
        case 'mp3':
        case 'aac':
        case 'flac':
          analysis.music += bytes;
          break;
        case 'jpg':
        case 'bmp':
        case 'gif':
          analysis.images += bytes;
          break;
        case 'mp4':
        case 'avi':
        case 'mkv':
          analysis.movies += bytes;
          break;
        default:
          analysis.other += bytes;
          break;
      }
    });

    return `music ${analysis.music}b\nimages ${analysis.images}b\nmovies ${analysis.movies}b\nother ${analysis.other}b`;
  }

  runSolution() {
    this.solution(`my.song.mp3 11b
greatSong.flac 1000b
not3.txt 5b
video.mp4 200b
game.exe 100b
mov!e.mkv 10000b`);
  }

  render() {
    return (
      <div className={cx(styles.playground)} onClick={this.runSolution} >Playground</div >
    );
  }
}

Playground.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Playground);
