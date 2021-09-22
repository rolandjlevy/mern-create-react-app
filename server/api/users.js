const express = require('express');
const router = express.Router();

const User = require('../models/user');

const getUsers = async () => {
  try {
    return await User.find();
  } catch (err) {
    return {
      "error": err,
      "message": "Error retrieving users"
    };
  }
}

router.get('/', async (req, res) => {
  const users = await getUsers();
  res.json(users);
});

router.post('/', async (req, res) => {
  const { username, email } = req.body;
  const newUser = new User({ username, email });
  try {
    const response = await newUser.save();
    const users = await getUsers();
    res.json(users);
  } catch (err) {
    res.status(400).json({
      "error": err,
      "message": "Error creating user"
    })
  }
});

module.exports = router;