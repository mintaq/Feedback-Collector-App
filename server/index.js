const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys.js');

require('./models/User.js');
require('./services/passport.js');
const authRoute = require('./routes/authRoutes.js');
const PORT = process.env.PORT || 5000;

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express();

app.use(
	cookieSession({
		maxAge: 30 * 24 * 60 * 60 * 1000,
		keys: [keys.cookieKey],
	})
);
app.use(passport.initialize());
app.use(passport.session());

app.use(authRoute);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
