import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { device } from '../../services';
import styles from './styles.scss';

const Hero = ({ isMobile }) => (
  <section className={styles.hero} >
    <div className={styles.left} >
      <h1 >Hire an elite front team on-demand</h1 >
      <img src={`/images/hero${isMobile ? '' : '-desktop'}.png`} alt="team" />
      <p >
        When you need to get to your next business milestone quickly, hiring Senior Developers, PMs & Designers is not
        an simple operation.<br />
        Delta is an experienced team of advanced technologists who love working together - and we are ready to drive
        your projects forward.
      </p >
    </div >
    <div className={styles.right} >
      <img src={`/images/hero${isMobile ? '' : '-desktop'}.png`} alt="team" />
    </div >
  </section >
);

Hero.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isMobile: device.selectors.type(state) === 'mobile'
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Hero);
