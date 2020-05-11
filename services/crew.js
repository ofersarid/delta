import { fromJS } from 'immutable';

const reducer = (state = fromJS([]), action) => {
  switch (action.type) {
    case 'CREW:UPDATE':
      return fromJS(action.data);
    default:
      return state;
  }
};

const actions = {
  update: (data) => dispatch => dispatch({
    type: 'CREW:UPDATE',
    data,
  })
};

const selectors = {
  data: state => state.getIn(['crew']),
};

export default {
  reducer,
  actions,
  selectors
};
