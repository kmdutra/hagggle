Meteor.publish(
	'hagggles', function() { 
		return Hagggles.find();
	}
);

process.env.MAIL_URL="smtp://kmdutra%40gmail.com:Amy11755@smtp.gmail.com:465/";

Meteor.methods({
	sendEmail: function (to, subject, text) {
		check([to, subject, text], [String]);

		// Let other method calls from the same client start running,
		// without waiting for the email sending to complete.
		this.unblock();

		Email.send({
			to: to,
			subject: subject,
			text: text
		});
	}
})