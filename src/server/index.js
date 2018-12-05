import express from 'express';
import cors from 'cors';
// react
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../shared/App';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res) => {

  const htmlMarkup = renderToString(<App />);

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
    </body>
    <script type="text/javascript" src="./bundle.js"></script>
    </html>
  `;

  res.send(html);

});

app.listen(PORT, () => {
  console.log(`Server is listening on localhost:${ PORT }`);
});
