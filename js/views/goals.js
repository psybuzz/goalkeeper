var app = app || {};

(function(){
	//Views for GoalList, Goal, Heading, Dateset, Card
	//GoalListView
	GoalListView = app.GoalListView = Backbone.View.extend({
		el: '#leftpane',
		container: '#goalContainer',
		events: {
		  'click #createGoalBtn': 'createGoal'
		},

		initialize: function(){
		  _.bindAll(this, 'render', 'unrender', 'createGoal', 'addGoal'); // every function that uses 'this' as the current object should be in here

		  this.collection = new GoalList();
		  this.collection.bind('add', this.addGoal);

		  this.render();
		},

		render: function(){
			var self = this;

			_(this.collection.models).each(function(item){ self.appendItem(item); }, this);
			$(this.container).append("<ol id='goalList'></ol>");
			
			return this; // for chainable calls, like .render().el
		},

		createGoal: function(){
			var goal = new Goal();
			goal.set({
				progress: Math.floor(Math.random()*100),
				index: this.collection.length
			});
			this.collection.add(goal);
		},

		addGoal: function(newGoal){
			var goalView = new GoalView({ model: newGoal });
			$('ol', this.el).append(goalView.render().el);
		},
		
		//should rerender the goals after sorting
		updateGoals: function() {
			var ref = this.collection, $el;
			
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
		},

		initialize: function(){
			// every function that uses 'this' as the current object should be in here
			_.bindAll(this, 'render', 'unrender', 'up', 'down', 'swap', 'remove', 'hover', 'leave', 'removeGoalDown', 'removeGoalUp', 'removeGoal'); 

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);
			this.render();
		},

		render: function(){
			var self = this;

			$(this.el).html("<li class='goal-label' style='background-color:" 
			+ self.model.get('color') + "'>" 
			+ "<div class='removeGoalBtn'><i class='icon-remove icon-white'></i></div>"
			+ "<div class='upVoteBtn'><i class='icon-chevron-up'></i></div>"
			+ "<div class='downVoteBtn'><i class='icon-chevron-down'></i></div>"
			+ self.model.get('priority') + ". " 
			+ self.model.get('title') + ' '
			+ self.model.get('description') + ' ' 
			+ self.model.get('progress') + '. Index: '
			+ self.model.get('index')
			+ "</li>");

			return this; // for chainable calls, like .render().el
		},

		hover: function(){
			$('.removeGoalBtn, .upVoteBtn, .downVoteBtn', this.el).show();
		},
		leave: function(){
			$('.removeGoalBtn, .upVoteBtn, .downVoteBtn', this.el).hide();
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
				this.collection.sortGoals('priority');
				if (newVote == 0)
					this.model.removeGoalDown();
			}
		},

		up: function(){
		 	var newVote = this.model.get('priority') + 1;
			this.model.set({ priority: newVote });
			/*var currIndex = this.model.get('index');
			if (currIndex > 0)
				this.model.swap(this.collection.at(currIndex - 1));
			*/	
			this.collection.sortGoals('priority');
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
		  this.model.destroy();
		  $(this.el).remove();
		}
	  });
	  
})();