Template.hagggleCreate.events({ 
	'submit form': function(e) {
		e.preventDefault();
		var hagggle = {
			seller: $(e.target).find('[name=seller]').val(),
			description: $(e.target).find('[name=description]').val(),
			sellPrice: $(e.target).find('[name=sellPrice]').val()
		}
		hagggle._id = Hagggles.insert(hagggle);
		Router.go('hagggleCreated', hagggle);

		mixpanel.track("Hagggle Created");
		mixpanel.identify(hagggle.seller);

	}
});


Template.hagggle.events({ 
	'submit form': function(e) {
		e.preventDefault();
		
		var buyPrice = parseFloat($(e.target).find('[name=buyPrice]').val());
		var sellPrice = parseFloat($(e.target).find('[name=sellPrice]').val());
		var seller = $(e.target).find('[name=seller]').val();
		var buyer = $(e.target).find('[name=buyer]').val();
		var description = $(e.target).find('[name=description]').val();
		
		var average = sellPrice + buyPrice;
			average = average/2;
		var closePercent = sellPrice * .1;
		var closePrice = sellPrice - closePercent;

		mixpanel.track("Offer Submitted");
		mixpanel.identify(buyer);

		
		if (buyPrice >= sellPrice) {
			Meteor.call('sendEmail',
	            seller + ', ' + buyer,
	            'Congratulations you have a deal for your ' + description + '!',
	            'Congratulations you have a deal for your ' + description + '. at the price of ' + average + '. You are both listed on this email, work out the details by replying all.' )
			
			Router.go('deal');
		} else if (buyPrice >= closePrice) {
			Router.go('almost');
		} else {
			Router.go('nodeal');
		}

	}
});
