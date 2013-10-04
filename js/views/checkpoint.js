var app = app || {};
(function() {
	//checkpoint view
	CheckpointListView = app.CheckpointListView = Backbone.View.extend({
		el: '#checkpointPane',
		container: '#checkpointList',
		checkpointViews: [],
		events: {
			'click #checkpointPaneClose': 'closePane',
			'click #createCheckpointBtn': 'createCheckpoint',
		},

		initialize: function() {
			_.bindAll(this, 'render', 'unrender', 'createCheckpoint', 'addCheckpoint', 'closePane');
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
			var self = this;

			$(this.el).animate({
				'right': -400
			}, function() {
				$(self.el).hide();
			});
		},

		unrender: function() {},

		createCheckpoint: function(titletext, descriptext) {
			var checkpoint = new Checkpoint();
			goal.set({ 
				title: titletext,
				description: descriptext,
			});

			this.collection.add(checkpoint);
			return checkpoint;
		},

		addCheckpoint: function() {
			var checkpointView = new CheckpointView({ model: newCheckpoint });
			$('ol', this.el).append(goalView.render().el);
			this.checkpointViews.push(checkpointViews);
		},
	});

	CheckpointView = app.CheckpointView = Backbone.View.extend({
		events: {
			
		},

		initialize: function() {
			_.bindAll(this, 'render', 'unrender', "removeCheckpoint", "remove");

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);
			return this.render();
		},

		render: function() {
			var self = this;

			$(this.el).html("<li class='checkpoint-label'>"
								+ "<div class='checkbox'></div>"
								+ self.model.get('title') + ". "
								+ self.model.get('description') + ". "
							+"</li>");

			$(this.el).hide().fadeIn(50);

			return this;
		},

		unrender: function() {},

		removeCheckpoint: function() {

		},

		remove: function() {

		}
	});
})();