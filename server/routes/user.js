const express = require('express');
const passport = require('passport');

const BnetStrategy = require('passport-bnet').Strategy;
const BNET_ID = process.env.BNET_ID;
const BNET_SECRET = process.env.BNET_SECRET;

const userRoutes = express.Router();

// Use the BnetStrategy within Passport.
passport.use(
	new BnetStrategy(
		{
			clientID: BNET_ID,
			clientSecret: BNET_SECRET,
			callbackURL:
				'http://192.168.1.245:3000/api/oauth/battlenet/callback',
			region: 'eu',
		},
		function (accessToken, refreshToken, profile, done) {
			console.log(profile);
			return done(null, profile);
		},
	),
);

userRoutes.get('/oauth/battlenet', passport.authenticate('bnet'));

userRoutes.get(
	'/oauth/battlenet/callback',
	passport.authenticate('bnet', { failureRedirect: '/' }),
	function (req, res) {
		res.redirect('/');
	},
);

module.exports = userRoutes;
