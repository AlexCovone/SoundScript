const Translation = require('../models/Translation');

module.exports = {
  getProfile: async (req, res) => {
    try {
      // const user = await User.findById(req.user._id);

      res.render('userHistory.ejs', { user: req.user });
    } catch (err) {
      console.log(err);
    }
  },
  saveTranslation: async (req, res) => {
    try {
      console.log(req.body);

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
