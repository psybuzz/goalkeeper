var app = app || {};
(function() {
	//checkpoint view
	CheckpointListView = app.CheckpointListView = Backbone.View.extend({
		el: '#checkpointPane',
		container: '#checkpointList'
		checkpointViews: [],
		events: {
			'click #checkpointPaneClose': 'closePane',
		},

		initialize: function() {
			_.bindAll(this, 'render', 'unrender', 'remove', 'createCheckpoint', 'addCheckpoint', 'closePane');
			this.collection = new CheckpointList();
			this.collection.bind('add', this.addCheckpoint);

			this.render();
		},

		render: function() {
			var self = this;
			$(this.container).html("<ol id='checkpointList'></ol>");
			_(this.checkpointViews).each(function(view){$('ol', this.el).append(view.el);}, this);

			return this;
		},

		closePane: function() {
			$(this.el).animate({
				'right': -200%
			});
			$(this.el).hide();
		},

		unrender: function() {},
	});

	CheckpointView = app.CheckpointView = Backbone.View.extend({

	});
})();