import { fromJS } from 'immutable';

const COUPONS = {
  linkedIn123: {
    active: true,
    discount: 15,
    name: 'LinkedIn Post',
    header: '25% Discount at May',
    paragraph: 'When you need to get to your next business milestone quickly, hiring Senior Developers',
    referrer: 'www.linkedin.com',
    expiration: new Date('May 31, 2020'),
  }
};

const reducer = (state = fromJS({
  domain: '',
  coupon: {
    claimed: false,
    renounced: false,
  },
}), action) => {
  switch (action.type) {
    case 'REFERRER:CLAIM_COUPON':
      return state.setIn(['coupon', 'claimed'], true);
    case 'REFERRER:RENOUNCE_COUPON':
      return state.setIn(['coupon', 'renounced'], true);
    case 'REFERRER:SET_DOMAIN':
      return state.set('domain', action.domain);
    case 'REFERRER:SET_COUPON':
      const coupon = action.id ? COUPONS[action.id] : null;
      if (coupon) {
        coupon.id = action.id;
        return state.mergeIn(['coupon'], fromJS(coupon));
      } else {
        return state;
      }
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
  setDomain: () => dispatch => {
    const domain = document.referrer.split('/')[2];
    dispatch({
      type: 'REFERRER:SET_DOMAIN',
      domain
    });
  },
  setCoupon: () => dispatch => {
    const searchParams = new URLSearchParams(window.location.search);
    dispatch({
      type: 'REFERRER:SET_COUPON',
      id: searchParams.get('coupon')
    });
  }
};

const selectors = {
  domain: state => state.getIn(['referrer', 'domain']),
  coupon: state => state.getIn(['referrer', 'coupon'])
};

export default {
  reducer,
  actions,
  selectors
};
