import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { device } from '../../services';

class Crew extends PureComponent {
  render() {
    // const { deviceOrientation } = this.props;
    // const isPortrait = deviceOrientation === 'portrait';
    return (
      <section className={styles.crew} >
        <h1 >MEET THE CREW</h1 >
        <ul >
          <li ></li >
          <li ></li >
          <li ></li >
        </ul >
      </section >
    );
  }
}

Crew.propTypes = {
  device: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  deviceOrientation: device.selectors.orientation(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Crew);
