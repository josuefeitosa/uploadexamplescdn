require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const path = require('path');

const app = express();

/** MongoDB setup */
mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  '/files',
  express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')),
);

app.use(require('./routes'));

app.listen(3333);
