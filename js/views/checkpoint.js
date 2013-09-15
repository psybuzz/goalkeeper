var app = app || {};
(function() {
	//checkpoint view
	CheckpointListView = app.CheckpointListView = Backbone.View.extend({
		el: '#checkpointPane',
		checkpointViews: [],
		events: {
			'click #checkpointPaneClose: close'
		}

		initialize: function() {
			_.bindAll(this, 'render', 'unrender', 'remove', 'createCheckpoint', 'addCheckpoint', 'close');
			this.collection = new CheckpointList();
			this.collection.bind('add', this.addCheckpoint);

			this.render();
		},

		render: function() {
			var self = this;
			$(this.container).html("<ol id='checkpointList'></ol>");
			_(this.checkpointViews).each(function(view){$('ol', this.el).append(view.el);}, this);

			var newhtml = "<div class='icon-remove' id='checkpointPaneClose'></div>"
			$(this.el).html(newhtml);
			return this;
		},

		close: function() {
			$(this.el).animate({
				'right': -200
			});
			$(this.el).hide();
		}

		unrender: function() {}
	});

	CheckpointView = app.CheckpointView = Backbone.View.extend({

	});
})();