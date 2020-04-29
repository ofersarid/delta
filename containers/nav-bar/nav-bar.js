import React, { Fragment, useEffect } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import styles from './styles.scss';
import { coupon } from '../../services';

const NavBar = ({ claimed }) => {
  function scrollToContact() {
    document.getElementById('contactSection').scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  useEffect(() => {
    if (claimed) {
      scrollToContact();
    }
  }, [claimed]);

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
  claimed: coupon.selectors.claimed(state)
});

const mapDispatchToProps = dispatch => ({}); // eslint-disable-line

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(NavBar);
