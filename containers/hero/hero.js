import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { device, section, home } from '../../services';
import styles from './styles.scss';

const Hero = ({ isMobile, data }) => (
  <section className={styles.hero} >
    <div className={styles.left} >
      <h1 >{data.get('heroTitle')}</h1 >
      <img src={`/images/hero${isMobile ? '' : '-desktop'}.png`} alt="team" />
      <p >
        {data.get('heroParagraph').split('\n').map((item, key) => {
          return <Fragment key={key} >{item}<br /></Fragment >;
        })}
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
  isMobile: device.selectors.type(state) === 'mobile' || device.selectors.type(state) === 'tablet',
  data: home.selectors.data(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default section.HOC(compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Hero), 'hero');
