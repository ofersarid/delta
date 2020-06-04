import { combineReducers } from 'redux-immutable';
import reactor from 'reactor-connect';
import { device, section, coupon, home, crew, estimator } from './services';
// import { device, section } from './services';

const rootReducer = combineReducers({
  reactor: reactor.reducer,
  device: device.reducer,
  section: section.reducer,
  coupon: coupon.reducer,
  home: home.reducer,
  crew: crew.reducer,
  estimator: estimator.reducer,
});

export default rootReducer;
