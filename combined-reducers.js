import { combineReducers } from 'redux-immutable';
import reactor from 'reactor-connect';
import { device, section } from './services';

const rootReducer = combineReducers({
  reactor: reactor.reducer,
  device: device.reducer,
  section: section.reducer,
});

export default rootReducer;
