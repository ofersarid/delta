import { fromJS } from 'immutable';

const reducer = (state = fromJS({
  type: 'dot'
}), action) => {
  switch (action.type) {
    case 'CURSOR:CHANGE':
      return state.set('type', action.cursorType);
    default:
      return state;
  }
};

const actions = {
  setCursorType: (cursorType) => ({
    type: 'CURSOR:CHANGE',
    cursorType
  })
};

const selectors = {
  type: state => state.getIn(['cursor', 'type'])
};

export default {
  reducer,
  actions,
  selectors
};
