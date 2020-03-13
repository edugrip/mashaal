const { ExtractJwt, Strategy } = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('../config/config');
const { to } = require('../utils/response');
var user = require('../models/user');
passport_config = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });
  //
  // used to deserialize the user
  passport.deserializeUser(async function (id, done) {
    var user = require('../models/user');
    [err, user] = await user.findById(id);
    done(err, user);
  });

  var opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = CONFIG.jwt_encryption;

  passport.use(
    'jwt',
    new Strategy(opts, async function (jwt_payload, done) {
      let err, user;
      [err, user] = await to(User.findById(jwt_payload.user_id));

      if (err) return done(err, false);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    })
  );

  passport.use(
    'local-login',
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true, // allows us to pass back the entire request to the callback
      },
      async function (req, email, password, done) {
        // callback with email and password from our form
        var user = require('../models/user');
        var user = await user.findByEmail(req.body.email);
        if (!user) return done(null, false);
        else return done(null, user);
      }
    )
  );
};
module.exports = { passport_config };
