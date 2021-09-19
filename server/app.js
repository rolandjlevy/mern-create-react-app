const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const port = process.env.PORT || 5050;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// router
// const users = require('./api/users');
// app.use('/api/users', users);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://replit.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const User = require('./models/user');

app.get('/api/users', (req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => console.log(err));
});

app.post('/api/users', (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username, email });
  newUser.save()
    .then(() => res.json({
      message: "Created account successfully"
    }))
    .catch(err => res.status(400).json({
      "error": err,
      "message": "Error creating account"
    }));
});

app.use(express.static(path.join(__dirname, '../build')))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build'))
});

module.exports = app;