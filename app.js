const express = require('express');
const cors = require('cors')
const session = require('express-session');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connection = require('./config/database');
const indexRouter = require('./routes/index')
const apiRouter = require('./routes/api');

const MongoStore = require('connect-mongo')(session);

require('dotenv').config();

var app = express();

app.use(express.json());
app.use(cookieParser(process.env.SECRET));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(
  session({
    name: 'sid',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: connection,
      collection: 'sessions'
    }),
    rolling: true,
    cookie: {
      maxAge: 1000 * 60 * 15,
    },
  }),
);


require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/', indexRouter);
app.use('/api', apiRouter);

module.exports = app;
