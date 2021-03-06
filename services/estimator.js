import { fromJS } from 'immutable';

function composeEstimation() {

}

const reducer = (state = fromJS({
  calculation: null,
  selection: null,
  summery: null,
  schema: null,
  interfaceSignificance: null,
}), action) => {
  switch (action.type) {
    case 'ESTIMATOR:INIT':
      return state.set('summery', fromJS(action.data)).set('schema', fromJS(action.schema)).set('interfaceSignificance', fromJS(action.interfaceSignificance));
    case 'ESTIMATOR:UPDATE':
      return state.set('calculation', action.calculation);
    case 'ESTIMATOR:STORE_SELECTION':
      return state.set('selection', fromJS(action.selection));
    default:
      return state;
  }
};

const actions = {
  init: (data, schema, interfaceSignificance) => dispatch => dispatch({
    type: 'ESTIMATOR:INIT',
    data,
    schema,
    interfaceSignificance,
  }),
  update: calculation => dispatch => dispatch({
    type: 'ESTIMATOR:UPDATE',
    calculation,
  }),
  storeSelection: selection => dispatch => dispatch({
    type: 'ESTIMATOR:STORE_SELECTION',
    selection,
  }),
};

const selectors = {
  calculation: state => state.getIn(['estimator', 'calculation']),
  selection: state => state.getIn(['estimator', 'selection']),
  summery: state => state.getIn(['estimator', 'summery']),
  schema: state => state.getIn(['estimator', 'schema']),
  interfaceSignificance: state => state.getIn(['estimator', 'interfaceSignificance']),
  composeEstimation: state => {
    const selection = selectors.selection(state);
    const schema = selectors.schema(state);
    const total = selectors.calculation(state);
    const significance = selectors.interfaceSignificance(state);
    if (!total || !selection) return null;
    return {
      total,
      industry: schema.getIn([0, `option${selection.get(0) + 1}Txt`]),
      funding: schema.getIn([1, `option${selection.get(1) + 1}Txt`]),
      device: schema.getIn([2, `option${selection.get(2) + 1}Txt`]),
      branding: schema.getIn([3, `option${selection.get(3) + 1}Txt`]),
      start: schema.getIn([4, `option${selection.get(4) + 1}Txt`]),
      significance: significance.get(`option${selection.get(5) + 1}Text`),
    };
  },
};

export default {
  reducer,
  actions,
  selectors,
  composeEstimation,
};
