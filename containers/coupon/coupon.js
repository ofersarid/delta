import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { referrer } from '../../services';
import styles from './styles.scss';

const Coupon = ({ coupon, claim, renounce }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(!coupon.get('claimed') && !coupon.get('renounced'));
  });

  return (
    <div className={cx(styles.coupon, { [styles.show]: show })} >
      {`Coupon Detected "${coupon.get('name')}": ${coupon.get('message')}`}
      <button className={styles.claimBtn} onClick={claim} >Claim</button >
      <button className={styles.passBtn} onClick={renounce} >Renounce</button >
    </div >
  );
};

const mapStateToProps = state => ({
  coupon: referrer.selectors.coupon(state)
});

const mapDispatchToProps = dispatch => ({
  claim: () => dispatch(referrer.actions.claimCoupon()),
  renounce: () => dispatch(referrer.actions.renounceCoupon())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps)
)(Coupon);
