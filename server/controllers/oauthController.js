const path = require('path');
const fetch = require('node-fetch');
const oauthController = {};

const githubURL = 'https://github.com/login/oauth/authorize';
const client_id = '5ad5082847b00373784f';
const scope = 'user:email';

oauthController.sendToGithub = async (req, res, next) => {
  // try {
	// 	// This is the route used for the github Oauth with our client id appended as a parameter
	// 	fetch('https://github.com/login/oauth/authorize?client_id=5ad5082847b00373784f')
	// 		.then((data) => {
	// 			// console.log(data);
	// 			res.locals.github = data.body;
	// 			return next();
	// 		})
	// 		.catch((err) => {
	// 			console.log('Error with the github Oauth request');
	// 			return next(err);
	// 		})
	// } catch (err) {
	// 	console.log('Error with github Oauth GET request');
	// 	return next(err);
	// }
	next();
}

oauthController.returnIdScope = (req, res, next) => {
	// Attach the information that github needs to res.locals
	const redirectURL = githubURL + '?client_id=' + client_id + '&scope=' + scope;
	res.locals.redirect = redirectURL;
	return next();
}

module.exports = oauthController;
