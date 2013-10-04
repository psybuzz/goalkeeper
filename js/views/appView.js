var app = app || {};

(function(){
	//AppView
	AppView = app.AppView = Backbone.View.extend({
		el: $('body'), // el attaches to existing element
		terminal: '#bigContainer',
		lastDay: '',
		events: {
		  'keypress #cmd-input': 'cmdInput',
		},
		initialize: function(){
			
			_.bindAll(this, 'render', 'cmdInput'); // every function that uses 'this' as the current object should be in here
			this.mode = 'goal';

			this.checkpointList = new CheckpointListView({ model: new Checkpoint});
			this.head = new HeadingView({ model: new Heading });
			this.goalList = new GoalListView({ model: new Goal });
			this.datesets = new DatesetView({ model: new Dateset });
			this.cards = new CardView({ model: new Card });
			//
			this.render();
			$('#cmd-input').focus();

		//suggestions for new users
			$('#suggestNewGoal').css('opacity', 0);
			setTimeout(function(){
				$('#suggestNewGoal').animate({ 
					'top': '80',
					'opacity': 1,
				});
				setTimeout(function(){
					$('#suggestNewGoal').fadeOut();
				}, 6000);
			}, 400);

		//scrolling
			$(window).scroll(this.scrollResponse);
		},
		render: function(){
			if (this.mode == 'goal'){
				//left side bigger
			} else {
				//right side bigger
			}
		},
		scrollResponse: function(e){
			var scroll = $(window).scrollTop();
			if (scroll > 90) {
				$('header').css('top', -90);
				$('header').css('position', 'fixed');
				$('#checkpointPane').css('height', '100%');
				$('#checkpointPane').css('position', 'fixed');
				$('#checkpointPane').css('top', 0);
				$('#checkpointPane').css('height' ,'-moz-calc(100% - ' + scroll +')');
				$('#checkpointPane').css('height' ,'-webkit-calc(100% - ' + scroll +')');
				$('#checkpointPane').css('height' ,'calc(100% - ' + scroll +')');
			} else if (scroll > 0) {
				$('#checkpointPane').css('height' ,'-moz-calc(100% - 90px -' + scroll +')');
				$('#checkpointPane').css('height' ,'-webkit-calc(100% - 90px -' + scroll +')');
				$('#checkpointPane').css('height' ,'calc(100% - 90px -' + scroll +')');
			} else {
				$('header').css('position', 'relative');
				$('header').css('top', 0);
				$('#checkpointPane').css('position', 'absolute');
				$('#checkpointPane').css('top', 90);

			}
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
					//simply adds the text to the container within a div

					$(this.terminal).append( "<div class='card-div'><span class='card' contentEditable='true'>" + text + "</span></div>" );
				}

				//SAVE: Send update to DB
				localStorage[ $('#forehead').text() ] = $('#bigContainer').html();

					

				//scroll
				$("html, body").animate({ scrollTop: $(document).height() }, "fast");
			}
		}
	});
})();