const { ExtractJwt, Strategy } = require('passport-jwt');
var LocalStrategy = require('passport-local').Strategy;
const CONFIG = require('../config/config');
const { to } = require('../utils/response');
//var user = require('../models/user')
passport_config = function (passport) {
  passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(async function (user, done) {
        done(null, user);
    });

    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = CONFIG.jwt_encryption;

    passport.use('local-login', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true // allows us to pass back the entire request to the callback

    },
        async function (req,email, password,done) { // callback with email and password from our form
            var user = require('../models/user')
            var user = await user.findByEmail(req.body.email, req.body.password)

            if (!user) { req.loginErrors = "Login has failed......"; return done(null, false, { message: "Please check your credentials!" }) }
            else return done(null, user)

        }))
}
module.exports = { passport_config }