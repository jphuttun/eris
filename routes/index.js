
/*
 * GET home page.
 */

app = require('../app');

app.get('/', function(req, res) {
	res.render('index', { title: 'Hello Eris!'});
});

// NON-OFFICIAL VERSIONS OF ERIS FOR TESTING
app.get('/dev', function(req, res) {
	res.render('dev', { title: 'Development test version'});
});