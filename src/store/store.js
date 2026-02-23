import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  // ← { thunk } DEĞİL, thunk
import logger from 'redux-logger';
import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk, logger)
);

// Make store accessible in browser console for debugging
if (typeof window !== 'undefined') {
  window.store = store;
}

export default store;