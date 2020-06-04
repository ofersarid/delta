import { fromJS } from 'immutable';

const schema = {
  step1: {
    title: 'What is your industry?',
    options: [{
      txt: 'SAAS',
      effort: {
        study: 0.1,
        design: 0.1,
        dev: 0,
      }
    }, {
      txt: 'Medtech, Robotics, Electronics',
      effort: {
        study: 0.3,
        design: 0.1,
        dev: 0,
      },
    }, {
      txt: 'eCommerce',
      effort: {
        study: -0.3,
        design: 0.1,
        dev: 0.3,
      },
    }],
  },
  step2: {
    title: 'What is your company’s current funding stage?',
    options: [{
      txt: 'Before Series',
      effort: {
        study: 0,
        design: -0.3,
        dev: 0.3,
      }
    }, {
      txt: 'Series A',
      effort: {
        study: 0.1,
        design: 0.1,
        dev: 0.1,
      },
    }, {
      txt: 'After Series A',
      effort: {
        study: 0.3,
        design: 0.3,
        dev: 0.3,
      },
    }],
  },
  step3: {
    title: 'Does your product incorporate hardware or a device?',
    options: [{
      txt: 'Yes',
      effort: {
        study: 0.3,
        design: 0.1,
        dev: 0.3,
      }
    }, {
      txt: 'No',
      effort: {
        study: 0,
        design: 0,
        dev: 0,
      },
    }, {
      txt: 'Probably in a future',
      effort: {
        study: 0,
        design: 0,
        dev: 0.1,
      },
    }],
  },
  step4: {
    title: 'Do you have constant branding?',
    options: [{
      txt: 'No',
      effort: {
        study: 0.1,
        design: 0.3,
        dev: 0,
      }
    }, {
      txt: 'Yes',
      effort: {
        study: 0,
        design: 0,
        dev: 0,
      },
    }, {
      txt: 'We have a temporary branding',
      effort: {
        study: 0.1,
        design: 0.1,
        dev: 0,
      },
    }],
  },
  step5: {
    title: 'When would you like to start?',
    options: [{
      txt: 'NOW',
      effort: {
        study: -0.1,
        design: 0,
        dev: 0,
      }
    }, {
      txt: 'Within a 3-4 month period',
      effort: {
        study: 0.1,
        design: 0,
        dev: 0.1,
      },
    }, {
      txt: 'After the COVID-19 desepearse',
      effort: {
        study: 0.1,
        design: 0.3,
        dev: 0.1,
      },
    }],
  }
};

function composeEstimation() {

}

const reducer = (state = fromJS({
  calculation: null,
  selection: null,
  data: null,
}), action) => {
  switch (action.type) {
    case 'ESTIMATOR:INIT':
      return state.set('data', fromJS(action.data));
    case 'ESTIMATOR:UPDATE':
      return state.set('calculation', action.calculation);
    case 'ESTIMATOR:STORE_SELECTION':
      return state.set('selection', fromJS(action.selection));
    default:
      return state;
  }
};

const actions = {
  init: data => dispatch => dispatch({
    type: 'ESTIMATOR:INIT',
    data,
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
  data: state => state.getIn(['estimator', 'data']),
  composeEstimation: state => {
    const selection = selectors.selection(state);
    const total = selectors.calculation(state);
    if (!total || !selection) return null;
    return {
      total,
      industry: schema.step1.options[selection.get(0)].txt,
      funding: schema.step2.options[selection.get(1)].txt,
      device: schema.step3.options[selection.get(2)].txt,
      branding: schema.step4.options[selection.get(3)].txt,
      start: schema.step5.options[selection.get(4)].txt,
    };
  },
};

export default {
  reducer,
  actions,
  selectors,
  schema,
  composeEstimation,
};
