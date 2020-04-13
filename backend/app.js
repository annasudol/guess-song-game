/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const dotenv = require('dotenv');
const express = require('express');
const app = express();
const morgan = require('morgan');
const usersRoutes = require('./routes/users-routes');
const scoreRoutes = require('./routes/score-routes');

const connectDB = require('./config/db');
const HttpError = require('./models/http-error');

dotenv.config({ path: './config/config.env' });



//Body parser
app.use(express.json());

connectDB();

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  next();
});

// Mount routers
app.use('/app', usersRoutes);
app.use('/score', scoreRoutes);

const PORT = process.env.PORT || 5000;

app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} on ${process.env.PORT}`));
