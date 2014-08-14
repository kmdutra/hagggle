Router.configure({ 
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	waitOn: function() { return Meteor.subscribe('hagggles'); }

});

Router.map(function() { 
	
	this.route('hagggleHome', {
		path: '/',
		data: function() { mixpanel.track("Homepage"); }
	});
	
	this.route('hagggleCreated', { 
		path: '/created/:_id',
		data: function() { 
			mixpanel.track("Confirmation");
			return Hagggles.findOne(this.params._id);
			
		}
	});

	this.route('haggglePage', { 
		path: '/h/:_id',
		data: function() { 
			mixpanel.track("Hagggle Viewed");
			return Hagggles.findOne(this.params._id);
			
		}
	});

	this.route('deal', { 
		path: '/yup',
		data: function() { mixpanel.track("Deal"); }
	});
	
	this.route('nodeal', { 
		path: '/nope',
		data: function() { mixpanel.track("No Deal"); }
	});
	
	this.route('close', { 
		path: '/almost',
		data: function() { mixpanel.track("Almost"); }
	});

	this.route('terms', { 
		path: '/terms',
		data: function() { mixpanel.track("Terms"); }
	});

});