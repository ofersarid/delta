import { fromJS } from 'immutable';

const reducer = (state = fromJS({}), action) => {
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
