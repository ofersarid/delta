import React from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
// import PropTypes from 'prop-types';
import styles from './styles.scss';

const Footer = () => (
  <div className={cx(styles.footer)} >
    <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam</p>
    <div className={styles.logo} >_DELTA</div >
  </div >
);

Footer.propTypes = {};

const mapStateToProps = state => ({}); // eslint-disable-line

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Footer);
