import React from 'react';
import { Route } from 'react-router-dom';
import routes from './routes';

const App = (props) => {
  return (
    <React.Fragment>
      {
        routes.map((route, index) => (
          <Route key={index} {...route} />
        ))
      }
    </React.Fragment>
  );
};

export default App;
