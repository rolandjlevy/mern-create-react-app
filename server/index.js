const mongoose = require('mongoose');
const express = require('express');
const app = require('./app.js');
const { MONGODB_URI, PORT } = process.env;
const port = PORT || 5000;

mongoose.connect(MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
})
.then(client => {
  console.log("Database Connected Successfully");
  app.listen(port, () => {
    console.log(`Server started at port ${port}`);
  });
})
.catch(err => {
  console.error(err.stack);
  process.exit(1);
});