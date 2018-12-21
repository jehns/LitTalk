const path = require('path');
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {db} = require('./db')


// main express app
const app = express();

// logging middleware
app.use(morgan('dev'));

// static middleware
app.use(express.static(path.join(__dirname, '..', 'public')));

// body-parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/api', require('./api'));

// error middleware
app.use(function (req, res, next) {
  const err = new Error('Not found.');
  err.status = 404;
  next(err);
});

// sends index.html
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public/index.html'))
})

// server errors (if any errors get this far)
app.use(function (err, req, res, next) {
  console.error(err);
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error.');
});

const PORT = process.env.PORT || 3000;

const startListening = () => {
  // start listening (and create a 'server' object representing our server)
  app.listen(PORT, () =>
    console.log(`Mixing it up on port ${PORT}`)
  )

  // set up our socket control center
  // const io = socketio(server)
  // require('./socket')(io)
}

const syncDb = () => db.sync()

async function bootApp() {
  await syncDb()
  await startListening()
}
// This evaluates as true when this file is run directly from the command line,
// i.e. when we say 'node server/index.js' (or 'nodemon server/index.js', or 'nodemon server', etc)
// It will evaluate false when this module is required by another module - for example,
// if we wanted to require our app in a test spec

bootApp()

