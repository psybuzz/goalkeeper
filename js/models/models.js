var app = app || {};

(function(){
	//Models: Goal, Heading, Dateset, Card
	Goal = app.Goal = Backbone.Model.extend({
		defaults: {
			title: 'stop being sad.',
			description: ' start being awesome.',
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

	Heading = app.Heading = Backbone.Model.extend({
		defaults: {
			visibility: 'private',
			forehead: 'carpe diem motto',
			backhead: 'life set',
			message: 'started 3 years ago<br>some awesome goals to strive for'
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