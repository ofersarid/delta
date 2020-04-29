import { fromJS } from 'immutable';

const reducer = (state = fromJS({
  referrer: '',
  claimed: false,
  renounced: false,
  coupons: [],
}), action) => {
  switch (action.type) {
    case 'REFERRER:SET_COUPONS':
      return state.set('coupons', fromJS(action.data));
    case 'REFERRER:CLAIM_COUPON':
      return state.setIn(['claimed'], true);
    case 'REFERRER:RENOUNCE_COUPON':
      return state.setIn(['renounced'], true);
    case 'REFERRER:SET_REFERRER':
      return state.set('referrer', action.referrer);
    default:
      return state;
  }
};

const actions = {
  claimCoupon: () => dispatch => dispatch({
    type: 'REFERRER:CLAIM_COUPON'
  }),
  renounceCoupon: () => dispatch => dispatch({
    type: 'REFERRER:RENOUNCE_COUPON'
  }),
  setReferrer: () => dispatch => {
    const domain = document.referrer.split('/')[2];
    dispatch({
      type: 'REFERRER:SET_REFERRER',
      domain
    });
  },
  setCoupons: data => dispatch => {
    dispatch({
      type: 'REFERRER:SET_COUPONS',
      data
    });
  },
};

const selectors = {
  referrer: state => state.getIn(['coupon', 'referrer']),
  claimed: state => state.getIn(['coupon', 'claimed']),
  renounced: state => state.getIn(['coupon', 'renounced']),
  coupons: state => state.getIn(['coupon', 'coupons']),
};

export default {
  reducer,
  actions,
  selectors
};
