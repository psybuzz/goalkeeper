var app = app || {};

(function(){
	//Collections
	GoalList = app.GoalList = Backbone.Collection.extend({ 
		model: Goal,
		sortAttribute: 'priority',
		initialize: function(){},
		//should help sort based on priority, called by collection.sort()
		comparator: function(goal) {
			return goal.get('priority');
		},
		//sorts the list of goals based off of the given attribute
		sortGoals: function(attr) {
			this.sortAttribute = attr;
			this.sort();
		}
	});
	DatesetList = app.DatesetList = Backbone.Collection.extend({ model: Dateset });
	CardList = app.CardList = Backbone.Collection.extend({ model: Card });
})();