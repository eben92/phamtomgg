import { combineReducers } from 'redux';
import exampleReducer from './_exampleReducer';
import adminReducer from './adminReducer';
import patientsReducer from './patientsReducer';
import staffsReducer from './staffsReducer';
import telechatReducer from './telechatReducer';

const rootReducer = combineReducers({
  // Add reducers here
  adminReducer,
  exampleReducer,
  patientsReducer,
  staffsReducer,
  telechatReducer
});

export default rootReducer;
