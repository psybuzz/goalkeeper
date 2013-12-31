
/*
 * GET home page.
 */

exports.index = function(db) {
	return function(req, res) {
		var collection = db.get('users'); 
		// should probably make an AJAX call here to get the user
		// we need to check cookies first
		res.render('index', { title: 'Express' });
	};
};

/*
 * User login/registration page
 */

exports.login = function(req, res) {
	res.render('login', { title: 'Login to Goalkeeper',
						  register: 'Not a member? Sign up!' });
};