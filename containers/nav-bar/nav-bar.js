import React, { Fragment, useEffect } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { referrer } from '../../services';

const NavBar = ({ coupon }) => {
  function scrollToContact() {
    document.getElementById('contactSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  useEffect(() => {
    if (coupon.get('claimed')) {
      scrollToContact();
    }
  }, [coupon.get('claimed')]);

  return (
    <Fragment >
      <div className={cx(styles.navBar)} >
        <img className={styles.logo} src="/images/logo.svg" alt="logo" />
        <button className={styles.contact} onClick={scrollToContact} >Contact</button >
      </div >
    </Fragment >
  );
};

NavBar.propTypes = {};

const mapStateToProps = state => ({
  coupon: referrer.selectors.coupon(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
