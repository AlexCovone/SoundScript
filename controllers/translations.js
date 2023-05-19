const Translation = require("../models/Translation");

module.exports = {
    getProfile: async (req, res) => {
      try {
        res.render("userHistory.ejs", {user: req.user });
      } catch (err) {
        console.log(err);
      }
    },
}