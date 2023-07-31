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
let db = mongoose.connection;

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

  const sampleTranslations = [
    {
      _id: 1,
      translation: 'Hej, jag heter Katelyn! Jag är en student från Florida. Jag ska vara i Sverige i tre månader; har ni några förslag på var jag ska besöka?',
      sourceLanguage: 'English',
      targetLanguage: 'Swedish',
      formattedDate: 'May 21, 2023',
      userDisplayName: 'Katelyn Gentry',
      userImage: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      _id: 2,
      translation: 'Can you please help? I have run out of petrol. Where can I find the nearest petrol station for my car to refill?',
      sourceLanguage: 'Finnish',
      targetLanguage: 'English',
      formattedDate: 'May 24, 2023',
      userDisplayName: 'Eero Mäkinen',
      userImage: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      _id: 3,
      translation: '食べ物はとてもおいしいです！ このレシピの秘密は何ですか？',
      sourceLanguage: 'German',
      targetLanguage: 'Japanese',
      formattedDate: 'May 24, 2023',
      userDisplayName: 'Julia Müller',
      userImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    },
    {
      _id: 4,
      translation: 'الثقافة والتقاليد هنا لا تصدق. كانت عائلتك لطيفة بشكل لا يصدق أثناء إقامتنا هنا. شكرًا لك. أنت وعائلتك مدعوون إلى وطننا في أي وقت.',
      sourceLanguage: 'Spanish',
      targetLanguage: 'Arabic',
      formattedDate: 'April 30, 2023',
      userDisplayName: 'Ricardo Noll',
      userImage: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 5,
      translation: "Sto facendo un viaggio culturale in giro per l'Europa e ora sto attraversando l'Italia. Non vedo l'ora di visitare Napoli e assaggiare il cibo!",
      sourceLanguage: 'English',
      targetLanguage: 'Italian',
      formattedDate: 'May 4, 2023',
      userDisplayName: 'Anna Esposito',
      userImage: 'https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 6,
      translation: "나는 이것을 전혀 기대하지 않았습니다. 이곳 뉴욕에는 상당한 규모의 한국인이 존재합니다.",
      sourceLanguage: 'English',
      targetLanguage: 'Korean',
      formattedDate: 'May 25, 2023',
      userDisplayName: '민지 장 ',
      userImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 7,
      translation: "Feliz aniversário vovó! Enviando muito amor da nossa família para você no Brasil. Espero vê-lo em breve.",
      sourceLanguage: 'English',
      targetLanguage: 'Portuguese',
      formattedDate: 'May 24, 2023',
      userDisplayName: 'Ben Richardson',
      userImage: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 8,
      translation: "Avez-vous des indications pour l'aéroport? Notre vol part dans 2 heures et nous pourrions manquer notre vol si nous n'arrivons pas à temps.",
      sourceLanguage: 'English',
      targetLanguage: 'French',
      formattedDate: 'May 29, 2023',
      userDisplayName: 'Natalie Dubois',
      userImage: 'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 9,
      translation: "Сколько стоит керамическая кружка? У нас такое же мастерство дома, во Франции; выглядит феноменально!",
      sourceLanguage: 'French',
      targetLanguage: 'Russian',
      formattedDate: 'May 27, 2023',
      userDisplayName: 'Luis Johnson',
      userImage: 'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 10,
      translation: "Nie mogę się doczekać dzisiejszego meczu reprezentacji Polski! Czy wiemy o której zaczyna się mecz?",
      sourceLanguage: 'English',
      targetLanguage: 'Polish',
      formattedDate: 'May 27, 2023',
      userDisplayName: 'Wendy Armstrong',
      userImage: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 11,
      translation: "Our family is having a barbecue this weekend. We would love to invite you over to celebrate our grandmother's birthday.",
      sourceLanguage: 'Spanish',
      targetLanguage: 'English',
      formattedDate: 'May 29, 2023',
      userDisplayName: 'Sarah Stanton',
      userImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 12,
      translation: "¡Nos encantaría unirnos a tu barbacoa! ¿Qué hora es y cuántos años cumple tu abuela?",
      sourceLanguage: 'English',
      targetLanguage: 'Spanish',
      formattedDate: 'May 29, 2023',
      userDisplayName: 'Richard Stanton',
      userImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 13,
      translation: "हम तुमसे प्यार करते हैं। कृपया हमसे कभी भी मिलें, आप हमारे लिए परिवार हैं।",
      sourceLanguage: 'English',
      targetLanguage: 'Hindi',
      formattedDate: 'May 29, 2023',
      userDisplayName: 'Gabby Willmington',
      userImage: 'https://images.unsplash.com/photo-1505840717430-882ce147ef2d?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    },
    {
      _id: 14,
      translation: "Jag kan inte vänta med att besöka Stockholm. Har du några förslag på vad jag bör se, eller ställen jag bör äta?",
      sourceLanguage: 'English',
      targetLanguage: 'Swedish',
      formattedDate: 'May 29, 2023',
      userDisplayName: 'Rachel Flores',
      userImage: 'https://images.unsplash.com/photo-1507101105822-7472b28e22ac?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80',
    }
  ];

  function getRandomDocuments(array, size){
    const shuffledArray = array.sort(() => 0.5 - Math.random())
    return shuffledArray.slice(0, size)
  }

  const translations = getRandomDocuments(sampleTranslations, 7)

  // Select 7 random documents in Translation collection
  // const sampleCollection = db.collection('sampleTranslations');
  // const translations = await sampleCollection.aggregate([{ $sample: { size: 7 } }]).toArray();
  // remove translations from render

  res.render('index.ejs', { date, currentYear: year, subscriptionKey, serviceRegion, translations, message, user: req.user });
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
  console.log(`Server is running on port ${process.env.PORT}.`);
});
