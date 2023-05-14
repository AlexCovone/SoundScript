const subscriptionKey = process.env.MS_KEY;
const serviceRegion = process.env.MS_REGION;

module.exports = {
    getIndex: (req, res) => {
      try{
        res.render('index.ejs', { subscriptionKey, serviceRegion });
      } catch (err) {
        console.log(err)
        return res.render("404", { user: req.user })
      }
    },
  };
  