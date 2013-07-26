var app = app || {};

(function(){
	//HeadingView
	HeadingView = app.HeadingView = Backbone.View.extend({
		el: 'header',
		events: {
		  'click span': 'zoom'
		},

		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'zoom', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);

		  //initial heading
			var heading = new Heading();
			//$('ul', this.el).append(goalView.render().el);
			this.render();
		},

		render: function(){
			var self = this;

			$(this.el).html("<div class='jumbotron'><h1 id='forehead'>"+self.model.get('forehead') + '</h1>'
				+ "<h2 id='backhead'>" + self.model.get('backhead') + "</h2>"
				+ "<div id='message' class='lead'" + self.model.get('message')+"</div></div>");

			return this; // for chainable calls, like .render().el
		},

		zoom: function(){
			alert('zoom zoom zoooom');
		},
		
		unrender: function(){},

		// `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
		remove: function(){
		  this.model.destroy();
		  $(this.el).remove();
		}
	});
	
})();