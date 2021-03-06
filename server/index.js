/* eslint consistent-return:0 */

const express = require('express');
const logger = require('./logger');
var cookieParser = require('cookie-parser');
const router = express.router;
const argv = require('minimist')(process.argv.slice(2));
const setup = require('./middlewares/frontendMiddleware');
const isDev = process.env.NODE_ENV !== 'production';
const ngrok = (isDev && process.env.ENABLE_TUNNEL) || argv.tunnel ? require('ngrok') : false;
const resolve = require('path').resolve;
const app = express();
const mongo = require('mongodb');
const monk = require('monk');
const db = monk('l127.0.0.1:27017/smartify');
const bodyParser = require('body-parser');

const spotifyAuth = require('./spotify/userAuthorise');
const spotifySmartLists = require('./spotify/smartLists')

// If you need a backend, e.g. an API, add your custom backend-specific middleware here
// app.use('/api', myApi);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(function(req,res,next) {
  req.db = db;
  next();
});

app.get('/api/userAuthorise', spotifyAuth.login);

app.get('/api/authCallback', spotifyAuth.tokenExchange);

app.post('/api/createSmartList', spotifySmartLists.createSmartList);

// In production we need to pass these values in instead of relying on webpack
setup(app, {
  outputPath: resolve(process.cwd(), 'build'),
  publicPath: '/',
});

// get the intended host and port number, use localhost and port 3000 if not provided
const customHost = argv.host || process.env.HOST;
const host = customHost || null; // Let http.Server use its default IPv6/4 host
const prettyHost = customHost || 'localhost';

const port = argv.port || process.env.PORT || 3000;

// Start your app.
app.listen(port, host, (err) => {

  if (err) {
    return logger.error(err.message);
  }

  // Connect to ngrok in dev mode
  if (ngrok) {
    ngrok.connect(port, (innerErr, url) => {
      if (innerErr) {
        return logger.error(innerErr);
      }

      logger.appStarted(port, prettyHost, url);
    });
  } else {
    logger.appStarted(port, prettyHost);
  }
});
