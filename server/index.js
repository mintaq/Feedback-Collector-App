const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');
const bodyParser = require('body-parser');

require('./models/User');
require('./models/Survey')
require('./services/passport.js');
const authRoute = require('./routes/authRoutes');
const billingRoute = require('./routes/billingRoutes');
const surveyRoute = require('./routes/surveyRoutes')
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(bodyParser.json());
app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);
app.use(billingRoute);
app.use(surveyRoute);

if (process.env.NODE_ENV === 'production') {
	// NOTE: THỨ TỰ QUAN TRỌNG
	// Express trả về prod assets (main.js, main.css, ...)
	app.use(express.static('client/build'));

	// Express trả về index.html nếu không biết route
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
	});
}

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
