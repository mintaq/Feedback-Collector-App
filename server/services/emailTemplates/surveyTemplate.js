const keys = require('../../config/keys')

module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Hey, cảm ơn bạn đã đọc email này!</h3>
					<p>Hãy trả lời giúp tôi câu hỏi sau nhé:</p>
					<p>${survey.body}</p>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes">Yes</a>
					</div>
					<div>
						<a href="${keys.redirectDomain}/api/surveys/${survey.id}/no">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};
