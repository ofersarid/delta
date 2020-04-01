import { combineReducers } from 'redux-immutable';
import reactor from 'reactor-connect';
import { device, cursor } from './services';

const rootReducer = combineReducers({
  reactor: reactor.reducer,
  device: device.reducer,
  cursor: cursor.reducer,
});

export default rootReducer;
