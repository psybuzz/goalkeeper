var app = app || {};

(function(){
	//AppView
	AppView = app.AppView = Backbone.View.extend({
		el: $('body'), // el attaches to existing element
		terminal: '#bigContainer',
		lastDay: '',
		events: {
		  'click button#switchBtn': 'switchMode',
		  'keypress #cmd-input': 'cmdInput',
		  'click #rlBtn': 'showLogin',
		  'click .cover': 'hideLogin',
		},
		initialize: function(){
			
			_.bindAll(this, 'render', 'switchMode'); // every function that uses 'this' as the current object should be in here
			this.mode = 'goal';

			this.head = new HeadingView({ model: new Heading });
			this.goalList = new GoalListView({ model: new Goal });
			this.datesets = new DatesetView({ model: new Dateset });
			this.cards = new CardView({ model: new Card });
			this.render();
			$('#cmd-input').focus();
		},
		render: function(){
			if (this.mode == 'goal'){
				//left side bigger
			} else {
				//right side bigger
			}
		},
		switchMode: function(){
			this.mode = this.mode == 'goal' ? 'card' : 'goal';
		},
		cmdInput: function(e){
			if (e.keyCode == 13){
				var text = $('#cmd-input').val();
				var lower = text.toLowerCase();
				$('#cmd-input').val('');

				var days = ['sunday','monday','tuesday','wednesday','thursday','friday','saturday'];
				var date = new Date();
				var day = days[ date.getDay() ];
				var ampm = date.getHours > 12 ? 'PM' : 'AM';

				if (this.lastDay != day){
					this.lastDay = day;
					$(this.terminal).append( "<div class='date-label'>" + day + "</div>" );
				}

				

				if (isNaN(text) == false) {		//if it is numeric
					$(this.terminal).append( "<div class='card-div-big'><span class='card-number'>" + text + "</span></div>" );
				} else if (lower == "time") {
					$(this.terminal).append( "<div class='card-div-big'><span class='card-time'>" 
						+ date.toLocaleTimeString().substring(0, 5) + " "
						+ ampm
						+ "</span><br><br>"
						+ "<span style='font-size:15px; color:grey; margin-left:15px'>" + date.toDateString() + "</span></div>" );
				} else if (lower == "day") {
					$(this.terminal).append( "<div class='card-div-big'><span class='card-time'>" 
						+ day
						+ "</span><br><br>"
						+ "<span style='font-size:15px; color:grey; margin-left:15px'>" + date.toDateString() + "</span></div>" );
				} else if (lower == "date") {
					$(this.terminal).append( "<div class='card-div-big'><span class='card-date'>" 
						+ date.toDateString().substring(4)
						+ "</span></div>" );
				} else {
					$(this.terminal).append( "<div class='card-div'><span class='card'>" + text + "</span></div>" );
				}
					

				//scroll
				$("html, body").animate({ scrollTop: $(document).height() }, "fast");
			}
		},
		showLogin: function(){
			$('#login-overlay').fadeIn('fast');
		},
		hideLogin: function(){
			$('#login-overlay').fadeOut('fast');
		}
	});
})();