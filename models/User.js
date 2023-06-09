const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// Google Oauth Strategy Schema
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  displayName: {
    type: String,
    unique: false,
    required: true
  },
  firstName: {
    type: String,
    unique: false,
    required: true
  },
  lastName: {
    type: String,
    unique: false,
    required: true
  },
  image: {
    type: String,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('User', UserSchema)


// Local Strategy Schema

// const bcrypt = require("bcrypt");
// const mongoose = require("mongoose");

// const UserSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     unique: false
//   },
//   lastName: {
//     type: String,
//     unique: false
//   },
//   email: {
//     type: String,
//     unique: true
//   },
//   password: String,
// })

// Password hash middleware.

// UserSchema.pre("save", function save(next) {
//   const user = this;
//   if (!user.isModified("password")) {
//     return next();
//   }
//   bcrypt.genSalt(10, (err, salt) => {
//     if (err) {
//       return next(err);
//     }
//     bcrypt.hash(user.password, salt, (err, hash) => {
//       if (err) {
//         return next(err);
//       }
//       user.password = hash;
//       next();
//     });
//   });
// });

// // Helper method for validating user's password.

// UserSchema.methods.comparePassword = function comparePassword(
//   candidatePassword,
//   cb
// ) {
//   bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
//     cb(err, isMatch);
//   });
// };

// module.exports = mongoose.model("User", UserSchema);
