const Translation = require('../models/Translation');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const translations = await Translation.find({ user: req.user.id}).sort({ createdAt: 'desc' })
      console.log(translations)

      res.render('userHistory.ejs', {user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  saveTranslation: async (req, res) => {
    try {
      await Translation.create({
        translation: req.body.translation,
        sourceLanguage: req.body.sourceLanguage,
        targetLanguage: req.body.targetLanguage,
        user: req.user.id,
      });
      console.log('Trasnlation has been saved!');
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  },
};
