import { fromJS } from 'immutable';

const reducer = (state = fromJS({
  tabTitle: 'Delta | Hire an elite front team on-demand',
  metaDescription: 'When you need to get to your next business milestone quickly, hiring Senior Developers, PMs & Designers is not an simple operation. Delta is an experienced team of advanced technologists who love working together - and are ready to drive your projects forward.',
  heroTitle: 'Hire an elite front team on-demand',
  heroParagraph: 'When you need to get to your next business milestone quickly, hiring Senior Developers, PMs & Designers is not an simple operation.\nDelta is an experienced team of advanced technologists who love working together - and are ready to drive your projects forward.'
}), action) => {
  switch (action.type) {
    case 'HOME:UPDATE':
      return fromJS(action.data);
    default:
      return state;
  }
};

const actions = {
  update: (data) => dispatch => dispatch({
    type: 'HOME:UPDATE',
    data,
  })
};

const selectors = {
  data: state => state.getIn(['home']),
};

export default {
  reducer,
  actions,
  selectors
};
