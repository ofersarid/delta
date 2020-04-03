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
        Hiring Senior FEDs/PMs/Designers is not an easy task, let alone forging them into an effective &#34;delta
        force&#34;.<br />
        _Delta is A team of senior-level individuals who love working together and are ready to get you to your next
        milestone fast and strong.
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
