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

require('dotenv').config({ path: './config/.env' });

// Passport config
require('./config/passport')(passport);

//Connect To Database
connectDB();

// pull in the required packages.
const sdk = require('microsoft-cognitiveservices-speech-sdk');
const fs = require('fs');
const path = require('path');

const subscriptionKey = process.env.MS_KEY;
const serviceRegion = process.env.MS_REGION;
const filename = 'YourAudioFile.wav';

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
const { getFormattedCurrentDate } = require("./controllers/services/helperFunctions")

app.get('/', (req, res) => {
  const date = getFormattedCurrentDate()
  res.render('index.ejs', { date, subscriptionKey, serviceRegion });
});

// Grabs text from box
// TODO: REMOVE?
app.post('/textToSpeech', async (req, res) => {
  try {
    // now create the audio-config pointing to our stream and
    // the speech config specifying the language.
    var audioConfig = sdk.AudioConfig.fromAudioFileOutput(filename);
    var speechConfig = sdk.SpeechConfig.fromSubscription(subscriptionKey, serviceRegion);

    // create the speech synthesizer.
    var synthesizer = new sdk.SpeechSynthesizer(speechConfig, audioConfig);

    // start the synthesizer and wait for a result.
    console.log('text: ', req.body);
    synthesizer.speakTextAsync(
      req.body.sendText,
      function (result) {
        if (result.reason === sdk.ResultReason.SynthesizingAudioCompleted) {
          console.log('synthesis finished.');
        } else {
          console.error('Speech synthesis canceled, ' + result.errorDetails + '\nDid you update the subscription info?');
        }
        synthesizer.close();
        synthesizer = undefined;
      },
      function (err) {
        console.trace('err - ' + err);
        synthesizer.close();
        synthesizer = undefined;
      }
    );
  } catch (err) {
    console.log(err);
  }
});

// Login, Logout, Signup Routes
app.use('/', mainRoutes);

// 404 Error Handling
app.get('*', function (req, res) {
  res.status(404);

  if (req.user) {
    // Button redirects user to /events
    return res.render('404', { user: req.user });
  } else {
    // Button redirects user to /
    return res.render('404');
  }
});



//Server Running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}, you better catch it!`);
});
