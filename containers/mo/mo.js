import React, { PureComponent } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { device } from '../../services';

class Mo extends PureComponent {
  render() {
    return (
      <section className={styles.agile} >
        <div className={styles.left} >
          <img src="/images/agile.svg" />
        </div >
        <div className={styles.right} >
          <h1 >Our M.O</h1 >
          <ul >
            <li >We <span className={styles.blue} >integrate</span > seamlessly with your specific workflow whatever it
                 may be.
            </li >
            <li >We are <span className={styles.blue} >&quot;agile&quot;</span > lovers and we work in 1-2-week sprints.
            </li >
            <li >We combine working remotely with actual face-time <span className={styles.blue} >on prem</span >.</li >
          </ul >
        </div >
      </section >
    );
  }
}

Mo.propTypes = {
  deviceOrientation: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
  deviceOrientation: device.selectors.orientation(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Mo);
