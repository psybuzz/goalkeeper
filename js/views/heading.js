var app = app || {};

(function(){
	//HeadingView
	HeadingView = app.HeadingView = Backbone.View.extend({
		el: 'header',
		events: {
		  'click .logo': 'zoom',
		},
		zoomout: false,

		initialize: function(){
			var self = this;
			_.bindAll(this, 'render', 'unrender', 'zoom', 'remove'); // every function that uses 'this' as the current object should be in here

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);

		  //initial heading
			var heading = new Heading();
			//$('ul', this.el).append(goalView.render().el);
			this.render();

		//make sets selectable
			$('.set').click(function(){
				self.chooseSet($(this));
			});
		},

		render: function(){
			var self = this;

			var newHtml = "<div class='jumbotron'>"
				+ "<ul class='setlist'>"
					+ "<li class='logo'>" + self.model.get('backhead') + "</li>";

			//add each set
			var sets = self.model.get('sets');
			for (var i=0; i<sets.length; i++){
				newHtml += "<li class='set'>" + sets[i] + "</li>";
			}
			newHtml += "</ul>"
				+ "<h1 id='forehead'>" + self.model.get('forehead') + '</h1>'
				+ "<div id='message' class='lead'>" + self.model.get('message')+"</div>"
				+ "</div>";

			$(this.el).html( newHtml );
			return this; // for chainable calls, like .render().el
		},

		setForehead: function(text){
			this.model.set('forehead', text);
		},
		setBackhead: function(text){
			this.model.set('backhead', text);
		},
		setMessage: function(text){
			this.model.set('message', text);
		},

		chooseSet: function(set){
			$('.set').removeClass('chosen');
			$(set).addClass("chosen");
		},

		zoom: function(){
			var body = $('body');
			if ( this.zoomout == false ){
				// $('body').css('margin', '100px');
				$('body').css('-webkit-transform', 'translateX(100px) translateY(100px)');
				$('.setlist').animate({
					'top': '-25px',
					'left': '15px',
				});
				$('.logo').addClass('logo-chosen');
				$('.set').addClass('inline');
				$('#leftpane, #rightpane').fadeOut();
			} else {
				// $('body').css('margin', '0px');
				$('body').css('-webkit-transform', 'translateX(0px) translateY(0px)');
				$('.setlist').animate({
					'top': '-5px',
					'left': '-25px',
					'display': 'none'
				});
				$('.logo').removeClass('logo-chosen');
				$('.set').removeClass('inline');
				$('#leftpane, #rightpane').fadeIn();
			}
			this.zoomout = !this.zoomout;
		},
		
		unrender: function(){},

		// `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
		remove: function(){
		  this.model.destroy();
		  $(this.el).remove();
		}
	});
	
})();