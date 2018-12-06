import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import reducer from './reducer';

const configureStore = (initialState) => (
  createStore(reducer, initialState, applyMiddleware(ReduxThunk))
);

export default configureStore;
