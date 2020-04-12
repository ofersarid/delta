import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styles from './styles.scss';
import { device, section } from '../../services';

const Mo = ({ isMobile }) => (
  <section className={styles.agile} >
    <div className={styles.left} >
      <img src={`/images/agile${isMobile ? '' : '-desktop'}.png`} alt="team" />
    </div >
    <div className={styles.right} >
      <h1 >Our M.O.</h1 >
      <ul >
        <li >We are <span className={styles.blue} >&quot;agile&quot;</span > lovers and we work in 1-2-week sprints
        </li >
        <li >Each sprint we come back with a user ready <span className={styles.blue} >MVF</span ></li >
        <li >We <span className={styles.blue} >integrate</span > seamlessly with your specific workflow whatever it
             may be
        </li >
        <li >We combine working remotely with actual face-time <span className={styles.blue} >on-prem</span ></li >
      </ul >
    </div >
  </section >
);

Mo.propTypes = {
  isMobile: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  isMobile: device.selectors.type(state) === 'mobile',
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default section.HOC(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Mo), 'M.O.');
