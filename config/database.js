const mongoose = require('mongoose');

const { MONGODB_URI = 'mongodb://localhost:27017/amazonsharp' } = process.env;

const connection = mongoose.createConnection(MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});

module.exports = connection;
