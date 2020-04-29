import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useClickOutside } from 'react-click-outside-hook';
import { coupon } from '../../services';
import styles from './styles.scss';

let timeout = null;

const Coupon = ({ coupons, claim, renounce, referrer, setReferrer }) => {
  const [peep, setPeep] = useState(false);
  const [reveal, setReveal] = useState(false);
  const [hide, setHide] = useState(false);
  const [putBack, setPutBack] = useState(false);
  const [couponId, setCouponId] = useState(null);
  const [ref, hasClickedOutside] = useClickOutside();

  const coupon = coupons.find(c => c.get('id') === couponId);

  const shouldRender = coupon ? (
    new Date(coupon.get('expiration').seconds * 1000) > new Date() &&
    (
      referrer === coupon.get('referrer') ||
      Boolean(window.location.host.match(/^delta-git|^localhost/))
    )) : false;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setCouponId(searchParams.get('coupon'));
    setReferrer();
  }, []);

  useEffect(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setPeep(!coupon.get('claimed') && !coupon.get('renounced'));
    }, 2000);
  }, [couponId]);

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

  if (!coupon || !shouldRender) {
    return null;
  }

  return (
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
  );
};

const mapStateToProps = state => ({
  coupons: coupon.selectors.coupons(state),
  referrer: coupon.selectors.referrer(state)
});

const mapDispatchToProps = dispatch => ({
  claim: () => dispatch(coupon.actions.claimCoupon()),
  renounce: () => dispatch(coupon.actions.renounceCoupon()),
  setReferrer: () => dispatch(coupon.actions.setReferrer())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Coupon);
