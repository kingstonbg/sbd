const express = require('express');
const axios = require('axios');
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
		function (req, accessToken, refreshToken, profile, done) {
			console.log('auth: ', req.user);
			req.user = profile;
			return done(null, profile);
		},
	),
);

passport.serializeUser(function (user, done) {
	done(null, user);
});

passport.deserializeUser(function (user, done) {
	done(null, user);
});

userRoutes.get('/oauth/battlenet', passport.authenticate('bnet'));

userRoutes.get(
	'/oauth/battlenet/callback',
	passport.authenticate('bnet', { failureRedirect: '/' }),
	function (req, res) {
		console.log('callback: ', req.user);
		res.redirect(`/login/${req.user.token}`);
	},
);

userRoutes.get('/user', async (req, res) => {
	const token = req.headers.authorization.substring('Bearer '.length);
	try {
		const response = await axios.get(
			// `https://eu.api.blizzard.com/profile/user/wow?namespace=profile-eu&locale=en_US&access_token=${token}`,
			'https://oauth.battle.net/userinfo',
			{
				headers: {
					// Accept: 'application/json, text/plain, */*',
					Authorization: `Bearer ${token}`,
				},
			},
		);
		res.json(response.data);
	} catch (error) {
		console.log(error.message);
	}
});

module.exports = userRoutes;
