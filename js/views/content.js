var app = app || {};

(function(){
	//DatesetView
	DatesetView = app.DatesetView = Backbone.View.extend({

	});
	//CardView
	CardView = app.CardView = Backbone.View.extend({
		events: {
		  'click': 'toggleEdit',
		  'click .check': 'toggleCheck',
		  'hover': 'showCheck',
		},

		initialize: function(){
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'unrender', 'toggleEdit', 'toggleCheck', 'showCheck'); 

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);
			return this.render();
		},

		render: function(){
			var self = this;
		},
		unrender: function(){
		},

		toggleEdit: function(){

		},
		toggleCheck: function(){
			
		}, 
		showCheck: function(){

		},
	});

})();