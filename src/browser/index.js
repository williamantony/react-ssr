import React from 'react';
import { render, hydrate } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../shared/redux/store';
import App from '../shared/App';

const store = configureStore(window.__initialState__);
if (delete window.__initialState__) {
  console.log('Deleted');
}

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
