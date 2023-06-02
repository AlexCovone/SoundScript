const express = require('express');
const app = express();
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const connectDB = require('./config/database');
const methodOverride = require('method-override');
const flash = require('express-flash');
const logger = require('morgan');
const mainRoutes = require('./routes/main');
const authRoutes = require('./routes/auth');

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
connectDB();
let db = mongoose.connection

// pull in the required packages.
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');

const subscriptionKey = process.env.MS_KEY;
const serviceRegion = process.env.MS_REGION;

//Server Setup
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Logging
app.use(logger('dev'));

//Use forms for put / delete
app.use(methodOverride('_method'));

// Setup Sessions - stored in MongoDB
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Use flash messages for errors, info, ect...
app.use(flash());

// Landing Page Route
const { getFormattedCurrentDate, getCurrentYear } = require('./controllers/services/helperFunctions');
// const Translation = require('./models/Translation');

app.get('/', async (req, res) => {
  const date = getFormattedCurrentDate();
  const year = getCurrentYear();
  const message = {
    error: req.flash('error'),
    success: req.flash('success'),
  };
  console.log(message);

  // Select 7 random documents in Translation collection
  const sampleCollection = db.collection('sampleTranslations');
  const translations = await sampleCollection.aggregate([{ $sample: { size: 7 } }]).toArray();

  res.render('index.ejs', { date, currentYear: year, subscriptionKey, serviceRegion, message, translations, user: req.user });
});

// Login, Logout, Signup Routes
app.use('/', mainRoutes);
app.use('/auth', authRoutes);

// 404 Error Handling
// app.get('*', function (req, res) {
//   res.status(404);

//   if (req.user) {
//     // Button redirects user to /events
//     return res.render('404', { user: req.user });
//   } else {
//     // Button redirects user to /
//     return res.render('404');
//   }
// });

//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});



