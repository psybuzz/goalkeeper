var app = app || {};

(function(){
	//Models: Goal, Heading, Dateset, Card
	Goal = app.Goal = Backbone.Model.extend({
		defaults: {
			title: 'start being awesome.',
			description: ' life is just too short.',
			progess: 0,
			total: 100,
			priority: 0,
			index: -1
		},

		initialize: function(){
			this.set({
				color: 'rgb('+Math.floor(128*Math.random()+127)+','+Math.floor(128*Math.random()+127)+','+Math.floor(128*Math.random()+127)+')',
			})
		}
	});

	Checkpoint = app.Checkpoint = Backbone.Model.extend({
		defaults: {
			title: 'get on this!',
			index: -1,
			complete: 0,
			created: 0,
			deadline: 0
		}
	});

	Heading = app.Heading = Backbone.Model.extend({
		defaults: {
			visibility: 'private',
			forehead: "it's adventure time",
			backhead: username,
			message: 'some awesome goals to strive for  |  started 3 years ago',
			sets: ["fitness","study","friends","family","games"],
		}
	});

	Dateset = app.Dateset = Backbone.Model.extend({
		defaults: {
			date: (new Date()),
			dateName: 'today',
			cards: [],
		}
	});

	Card = app.Card = Backbone.Model.extend({
		defaults: {
			text: 'ipsum lorem',
		}
	});
})();