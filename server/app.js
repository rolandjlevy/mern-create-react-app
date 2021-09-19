const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const User = require('./models/user');

const users = require('./api/users');
app.use('/api/users', users);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://replit.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, '../client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build'))
});

module.exports = app;