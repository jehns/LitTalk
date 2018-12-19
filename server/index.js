const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');


// main express app
const app = express();

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, './path/to/static/assets')));

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', require('./server/api'));

// error middleware
app.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

// send index.html for any requests that don't match one of our API routes.
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './path/to/index.html'));
});

// server errors (if any errors get this far)
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log(`Server is listening on port ${port}`);
});
