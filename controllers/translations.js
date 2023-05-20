const Translation = require('../models/Translation');
const { getFormattedCurrentDate } = require('../controllers/services/helperFunctions');


module.exports = {
  getProfile: async (req, res) => {
    try {
      const translations = await Translation.find({ user: req.user.id}).sort({ createdAt: 'desc' })

      console.log(translations)

      res.render('userHistory.ejs', {translations, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  
  saveTranslation: async (req, res) => {
    try {
      const sourceLanguageMap = {
        'en-US' : 'English',
        'de-DE' : 'German',
        'ar-EG' : 'Arabic',
        'es-ES' : 'Spanish',
        'fi-FI' : 'Finnish',
        'fr-FR' : 'French',
        'hi-IN' : 'Hindi',
        'it-IT' : 'Italian',
        'ja-JP' : 'Japanese',
        'ko-KR' : 'Korean',
        'pl-PL' : 'Polish',
        'pt-BR' : 'Portugese',
        'ru-RU' : 'Russian',
        'sv-SE' : 'Swedish',
        'zh-Hans' : 'Chinese'
      }

      const targetLanguageMap = {
        'en' : 'English',
        'de' : 'German',
        'ar' : 'Arabic',
        'es' : 'Spanish',
        'fi' : 'Finnish',
        'fr' : 'French',
        'hi' : 'Hindi',
        'it' : 'Italian',
        'ja' : 'Japanese',
        'ko' : 'Korean',
        'pl' : 'Polish',
        'pt' : 'Portugese',
        'ru' : 'Russian',
        'sv' : 'Swedish',
        'zh-Hans' : 'Chinese'
      }

      await Translation.create({
        translation: req.body.translation,
        sourceLanguage: sourceLanguageMap[req.body.sourceLanguage],
        targetLanguage: targetLanguageMap[req.body.targetLanguage],
        formattedDate: getFormattedCurrentDate(),
        user: req.user.id,
      });
      console.log(`Translation has been saved for ${req.user.displayName}!`);
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  },
};
