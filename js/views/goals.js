var app = app || {};

(function(){
	//Views for GoalList, Goal, Heading, Dateset, Card
	//GoalListView
	GoalListView = app.GoalListView = Backbone.View.extend({
		el: '#leftpane',
		container: '#goalContainer',
		goalViews: [],
		events: {
		  'click #createGoalBtn': 'createGoal', 
		  'click #searchBtn': 'toggleSearch',
		},
		dragSrcEl: null,

		initialize: function(){
		  _.bindAll(this, 'render', 'unrender', 'createGoal', 'addGoal'); // every function that uses 'this' as the current object should be in here

		  this.collection = new GoalList();
		  this.collection.bind('add', this.addGoal);

		  $('#searchbar').hide();

		  this.render();
		},

		render: function(){
			var self = this;

			$(this.container).html("<ol id='goalList'></ol>");
			_(this.goalViews).each(function(view){ $('ol', this.el).append(view.el); }, this);
			return this; // for chainable calls, like .render().el
		},

		toggleSearch: function(){
			$('#searchbar').fadeToggle();
			$('#searchbar').focus();
		},

		createGoal: function(text){
			var goal = new Goal();
			goal.set({
				progress: Math.floor(Math.random()*100),
				index: this.collection.length,
			});
			if (typeof text === 'string'){
				goal.set({ title: text });
			}
			this.collection.add(goal);

			$('#suggestNewGoal').fadeOut();

			return goal;
		},

		addGoal: function(newGoal){
			var goalView = new GoalView({ model: newGoal });
			$('ol', this.el).append(goalView.render().el);
			this.goalViews.push(goalView);
		},
		
		//should rerender the goals after sorting
		updateGoals: function() {
			var ref = this.collection, $el;
			this.goalViews.sort(function(a,b){
				return a.model.get('priority') > b.model.get('priority');
			});

			_(this.goalViews).each(function(view){ $('ol', this.el).append(view.el); }, this);
		},
		
		unrender: function(){},
	});
	  
	//GoalView
	GoalView = app.GoalView = Backbone.View.extend({
		events: {
		  'click span.up':  'up',
		  'click span.delete': 'remove',
		  'click span.down': 'down',
		  'mouseover': 'hover',
		  'mouseout': 'leave',
		  'mousedown .removeGoalBtn': 'removeGoalDown',
		  'mouseup .removeGoalBtn': 'removeGoalUp',
		  'click .removeGoalBtn': 'removeGoal',
		  'click .upVoteBtn': 'up',
		  'click .downVoteBtn': 'down',
		  'click': 'focus',
		  'blur': 'blur',
		  'dragstart': 'dragstart',
		  'dragend': 'dragend',
		  'dragover': 'dragover',
		  'dragenter': 'dragenter',
		  'dragleave': 'dragleave',
		  'drop': 'drop',
		},
		cPanelVisible: false,

		initialize: function(){
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'unrender', 'up', 'down', 'swap', 'remove', 'hover', 
				'focus', 'blur', 'leave', 'removeGoalDown', 'removeGoalUp', 'removeGoal'); 

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);
			return this.render();
		},

		render: function(){
			var self = this;

			$(this.el).html("<li class='goal-label selectable' draggable='true' style='border-left-color:" 
			+ self.model.get('color') + "'>" 
			+ "<div class='removeGoalBtn'><i class='icon-remove icon-white'></i></div>"
			+ "<div class='upVoteBtn'><i class='icon-chevron-up'></i></div>"
			+ "<div class='downVoteBtn'><i class='icon-chevron-down'></i></div>"
			+ self.model.get('priority') + ". " 
			+ "<span class='gTitle'>" + self.model.get('title') + '</span><br>'
			+ "<span class='gDescription'>" + self.model.get('description') + ' ' 
			+ self.model.get('progress') + '. Index: '
			+ self.model.get('index')
			+ "</span>"
			+ "</li>");

			$(this.el).hide().fadeIn(100);

			return this; // for chainable calls, like .render().el
		},

		dragstart: function(e){
			$(this.el).addClass('dragging');

			app.appView.goalList.dragSrcEl = this.el;

			e.originalEvent.dataTransfer.effectAllowed = 'move';
			e.originalEvent.dataTransfer.setData('text/html', this.el.innerHTML);
		},

		dragend: function(){
			$(this.el).removeClass('dragging');
		},

		dragover: function(e){
			if (e.preventDefault) {
		    	e.preventDefault(); // Necessary. Allows us to drop.
		  	}
		  	e.originalEvent.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.
		  	return false;
		},

		dragenter: function(){
			$(this.el).addClass('dragenter');
		},

		dragleave: function(){
			$(this.el).removeClass('dragenter');
		},

		drop: function(e){
			if (e.stopPropagation) {
		    	e.stopPropagation(); 	//for some browsers
		  	}

		  	var dragSrcEl = app.appView.goalList.dragSrcEl;

		  	var destEl = this.el;
		  	if (dragSrcEl != destEl) {
		    	// Set the source column's HTML to the HTML of the column we dropped on.
		    	dragSrcEl.innerHTML = destEl.innerHTML;
		    	this.el.innerHTML = e.originalEvent.dataTransfer.getData('text/html');
		  	}
		  	$('#goalList').children().removeClass('dragenter dragging');

		  	return false;
		},

		focus: function(){
			var self = this;
			var title = self.model.get('title');

			//if clicking a different goal, switch to this context
			//alert($('.goal-label', this.el).css('background-color'))
			$('.goal-label').css('background-color', "");
			$('.goal-label').addClass('selectable');
			$('.goal-label', this.el).removeClass('selectable').css('box-shadow', 'box-shadow: inset -10px 0px 30px -15px #000000');
			
			//apply new color
			var rgbString = $('.goal-label', this.el).css('border-left-color');
			var rgb = rgbString.substr(4, rgbString.length - 5).split(",");
			var target = 96;
			var r2 = Math.round((3*parseInt(rgb[0],10) + target) / 4);
			var g2 = Math.round((3*parseInt(rgb[1],10) + target) / 4);
			var b2 = Math.round((3*parseInt(rgb[2],10) + target) / 4);
			var newRgb = "rgb(" + r2 + "," + g2 + "," + b2 + ")";
			$('.goal-label', this.el).css('background-color', newRgb);
			$(this.el).attr('contentEditable', 'true');
			$('.checkpoint-label').css('background-color', newRgb);

			//draw the checkpoint panel
			$('#checkpointPane').show();
			$('#checkpointPane').animate({
				'right': 0
			});
		
			//load goal data into header
			app.appView.head.setForehead( title );
			app.appView.head.setMessage( self.model.get('description') );

			//load goal contents into the bigContainer
			//LOAD FROM DB
			if (localStorage){
				//check if a goal has been previously saved
				if (localStorage.hasOwnProperty(title)){
					$('#bigContainer').html(localStorage[title]);
				} else {
					//if not, load an empty slate
					$('#bigContainer').html("");
				}
			}
			




			//to put into an edit func later..
			//EDIT
			$(".gTitle, .gDescription", this.el).addClass('editable');
			// $(this.el).append("<div>I'm editable</div>");
		},
		blur: function(){

		},
		hover: function(){
			$('.removeGoalBtn', this.el).show();
		},
		leave: function(){
			$('.removeGoalBtn', this.el).hide();
		},
		removeGoalDown: function () {
			$('.icon-remove', this.el).removeClass('icon-white');	
		},
		removeGoalUp: function () {
			$('.icon-remove', this.el).addClass('icon-white');
		},
		removeGoal: function () {
			this.remove();
		},
		
		unrender: function(){},

		down: function(){
			var currPriority = this.model.get('priority');
			if (currPriority > 0) {
				var newVote = currPriority - 1;
				this.model.set({ priority: newVote });
				/*var currIndex = this.model.get('index');
				if (currIndex < this.collection.length - 1) 
					this.model.swap(this.collection.at(currIndex + 1));
				*/	
				// this.collection.sortGoals('priority');
				if (newVote == 0)
					this.model.removeGoalDown();
			}
			app.appView.goalList.updateGoals();
		},

		up: function(){
		 	var newVote = this.model.get('priority') + 1;
			this.model.set({ priority: newVote });
			/*var currIndex = this.model.get('index');
			if (currIndex > 0)
				this.model.swap(this.collection.at(currIndex - 1));
			*/	
			// this.collection.sortGoals('priority');
			app.appView.goalList.updateGoals();
		},
		
		// `swap()` will interchange an `Item`'s attributes. When the `.set()` model function is called, the event `change` will be triggered.
		swap: function(other) {
			var oColor = other.get('color');
			var oTitle = other.get('title');
			var oDescription = other.get('description');
			var oProgress = other.get('progress');
			var oTotal = other.get('total');
			var oPriority = other.get('priority');
			var oIndex = other.get('index');
			
			//if (this.model.get('priority') > oPriority) {
				other.set({
					color: this.model.get('color'),
					title: this.model.get('title'),
					description: this.model.get('description'),
					progress: this.model.get('progress'),
					total: this.model.get('total'),
					priority: this.model.get('priority'),
					index: this.model.get('index')
				});
				
				self.model.set({
					color: oColor,
					title: oTitle,
					description: oDescription,
					progress: oProgress,
					total: oTotal,
					priority: oPriority,
					index: oIndex
				});
			//}
		},
		
		// `remove()`: We use the method `destroy()` to remove a model from its collection. Normally this would also delete the record from its persistent storage, but we have overridden that (see above).
		remove: function(){
			var self = this;
			var mypos = app.appView.goalList.goalViews.indexOf(this);
			console.log(mypos)
			app.appView.goalList.goalViews.splice( mypos, 1 );
		  this.model.destroy();
		  $(this.el).remove();
		}
	  });
	  
})();