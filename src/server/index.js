import express from 'express';
import cors from 'cors';
import serialize from 'serialize-javascript';
// react
import React from 'react';
import { renderToString } from 'react-dom/server';
// react-router
import { StaticRouter as Router, matchPath } from 'react-router-dom';
import routes from '../shared/routes';
// redux
import { Provider } from 'react-redux';
import configureStore from '../shared/redux/store';
// component
import App from '../shared/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

// app.get('/favicon.ico', (req, res, next) => {
//   res.writeHead(200, {'Content-Type': 'image/x-icon'} );
//   res.end();
// });

app.get('*', (req, res, next) => {

  const store = configureStore();
  
  const promises = routes.reduce((list, route) => {

    if (matchPath(req.url, route) && route.component && route.component.initialAction) {
      const promise = Promise.resolve(store.dispatch(route.component.initialAction()));
      list.push(promise);
    }
    return list;

  }, []);

  Promise.all(promises)
    .then(() => {
      const context = {};
    
      const htmlMarkup = renderToString(
        <Provider store={store}>
          <Router location={req.url} context={context}>
            <App />
          </Router>
        </Provider>
      );
    
      const initialState = store.getState();

      const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>Document</title>
        </head>
        <body>
          <div id="root">${ htmlMarkup }</div>
          <script type="text/javascript" src="./bundle.js"></script>
          <script type="text/javascript">
            window.__initialState__ = ${serialize(initialState)}
          </script>
        </body>
        </html>
      `;
    
      res.send(html);

    })
    .catch(next);

});

app.listen(PORT, () => {
  console.log(`Server is listening on localhost:${ PORT }`);
});
