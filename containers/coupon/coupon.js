import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useClickOutside } from 'react-click-outside-hook';
import { referrer } from '../../services';
import styles from './styles.scss';

const Coupon = ({ coupon, claim, renounce, expiration, referrer }) => {
  const [peep, setPeep] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [hide, setHide] = useState(false);
  const [putBack, setPutBack] = useState(false);
  const [ref, hasClickedOutside] = useClickOutside();

  const shouldRender = coupon.get('active') &&
    expiration > new Date() &&
    (
      referrer === coupon.get('referrer') ||
      Boolean(window.location.host.match(/^delta-git|^localhost/))
    );

  useEffect(() => {
    setTimeout(() => {
      setPeep(!coupon.get('claimed') && !coupon.get('renounced'));
    }, 2000);
  }, []);

  useEffect(() => {
    if (hasClickedOutside && reveal) {
      setPutBack(true);
      setReveal(false);
    }
  });

  const toggleReveal = () => {
    if (reveal) {
      setPutBack(true);
      setReveal(false);
    } else {
      setPutBack(false);
      setReveal(true);
    }
  };

  const hideCoupon = () => {
    setHide(true);
  };

  const claimClickHandler = () => {
    hideCoupon();
    claim();
  };

  const renounceClickHandler = () => {
    hideCoupon();
    renounce();
  };

  return shouldRender ? (
    <div
      className={cx(styles.coupon, {
        [styles.peep]: peep,
        [styles.reveal]: reveal,
        [styles.hide]: hide,
        [styles.putBack]: putBack
      })}
      onClick={toggleReveal}
      ref={ref}
    >
      <img src="/images/coupon.svg" />
      <section className={styles.top} >
        <h4 >{coupon.get('header')}</h4 >
        <p >{coupon.get('paragraph')}</p >
      </section >
      <section className={styles.bottom} >
        <button className={styles.claimBtn} onClick={claimClickHandler} >Claim Now</button >
        <button className={styles.passBtn} onClick={renounceClickHandler} >No Thanks</button >
      </section >
    </div >
  ) : null;
};

const mapStateToProps = state => ({
  coupon: referrer.selectors.coupon(state),
  expiration: referrer.selectors.coupon(state).get('expiration'),
  referrer: referrer.selectors.domain(state)
});

const mapDispatchToProps = dispatch => ({
  claim: () => dispatch(referrer.actions.claimCoupon()),
  renounce: () => dispatch(referrer.actions.renounceCoupon())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Coupon);
