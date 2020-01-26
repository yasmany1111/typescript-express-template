// NodeModules
import fs = require('fs-extra');
import http = require('http');
import https = require('https');
import express = require('express');
import bodyParser = require('body-parser');
// App
import { mainRouter } from './routes/router';

// App
const app: express.Application = express();
const httpServer = http.createServer(app);
const httpsServer = https.createServer({
  key: fs.readFileSync('/etc/letsencrypt/live/yasmany.dev/privkey.pem', 'utf-8'),
  cert: fs.readFileSync('/etc/letsencrypt/live/yasmany.dev/fullchain.pem', 'utf-8')
}, app);

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

// CORS Accept, Logging
app.use(function (req, res, next) {
  const currDateToLog = new Date();
  console.log(
    currDateToLog.toDateString() +
    ' ' +
    currDateToLog.toLocaleTimeString() +
    ' | ' +
    req.ip +
    ' ' +
    req.url,
    { level: -1 }
  );
  res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

// Setting up routes
app.use((req, res, next) => {
  if (mainRouter(privateContext) === undefined) {
    next();
  }
  // next only if route not found
});

// Serve static content
app.get('*.*', express.static('./app/www'/*, { maxAge: '1y' }*/));
app.all('*', function (req, res) {
  res.status(200).sendFile(`/`, { root: './app/www' });
});

// Start App
httpServer.listen(80);
httpsServer.listen(443);
console.log('Initialized', 80, 443);
