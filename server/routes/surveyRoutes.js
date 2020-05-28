const _ = require('lodash');
const { Path } = require('path-parser');
const { URL } = require('url');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplates = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

router.get('/api/surveys/:surveyId/:choice', (req, res) => {
	res.send('Cảm ơn ý kiến đóng góp của bạn!');
});

router.get('/api/surveys', requireLogin, async (req, res) => {
	const surveys = await Survey.find({ _user: req.user.id }).select({ recipients: false });

	res.send(surveys);
});

router.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
	const { title, subject, body, recipients } = req.body;

	const survey = new Survey({
		title,
		subject,
		body,
		recipients: recipients.split(',').map(email => ({ email })),
		_user: req.user.id,
		dateSent: Date.now(),
	});

	// Send email
	const mailer = new Mailer(survey, surveyTemplates(survey));

	try {
		await mailer.send();
		await survey.save();
		req.user.credits -= 1;
		const user = await req.user.save();

		res.send(user);
	} catch (error) {
		res.status(422).send(error);
	}
});

router.post('/api/surveys/webhooks', async (req, res) => {
	const p = new Path('/api/surveys/:surveyId/:choice');

	_.chain(req.body)
		.map(({ email, url }) => {
			const match = p.test(new URL(url).pathname); // {surveyId, choice} | null
			if (match) {
				return { ...match, email };
			}
		})
		.compact() // remove undefined
		.uniqBy('email', 'surveyId') // remove duplicate events (same email AND surveyId)
		.each(({ surveyId, choice, email }) => {
			Survey.updateOne(
				{
					_id: surveyId,
					recipients: { $elemMatch: { email, response: false } },
				},
				{
					$inc: { [choice]: 1 },
					$set: { 'recipients.$.response': true },
					lastResponded: new Date(),
				}
			).exec();
		})
		.value();

	res.send({});
});

module.exports = router;
