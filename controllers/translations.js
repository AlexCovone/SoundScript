const Translation = require('../models/Translation');
const { getFormattedCurrentDate, mapSourceLanguage, mapTargetLanguage } = require('../controllers/services/helperFunctions');

module.exports = {
  getProfile: async (req, res) => {
    try {
      const translations = await Translation.find({ user: req.user.id }).sort({ createdAt: 'desc' });

      console.log(translations);

      res.render('userHistory.ejs', { translations, user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  saveTranslation: async (req, res) => {
    try {
      const { translation, sourceLanguage, targetLanguage } = req.body;

      if (!translation || !sourceLanguage || !targetLanguage) {
        req.flash('error', 'Oops! Please record what you would like translated to save it.');
        return res.redirect('/');
      }

      await Translation.create({
        translation: req.body.translation,
        sourceLanguage: mapSourceLanguage(req.body.sourceLanguage),
        targetLanguage: mapTargetLanguage(req.body.targetLanguage),
        formattedDate: getFormattedCurrentDate(),
        user: req.user.id,
      });
      req.flash("success", `Translation Saved!`)
      console.log(`Translation has been saved for ${req.user.displayName}!`);
      res.redirect('/');
    } catch (err) {
      console.log(err);
      res.redirect('/');
    }
  },
};
