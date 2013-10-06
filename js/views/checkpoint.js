var app = app || {};
(function() {
	//checkpoint view
	CheckpointListView = app.CheckpointListView = Backbone.View.extend({
		el: '#checkpointPane',
		container: '#checkpointContainer',
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

		createCheckpoint: function() {
			var checkpoint = new Checkpoint();
			this.collection.add(checkpoint);
			return checkpoint;
		},

		addCheckpoint: function(newCheckpoint) {
			var checkpointView = new CheckpointView({ model: newCheckpoint });
			$('ol', this.el).append(checkpointView.render().el);
			this.checkpointViews.push(checkpointViews);
		},
	});

	CheckpointView = app.CheckpointView = Backbone.View.extend({
		events: {
			'click .removeCheckpointBtn': 'removeCheckpoint',
			'click .checkbox': 'checkToggle',
		},

		initialize: function() {
			_.bindAll(this, 'render', 'unrender', "removeCheckpoint", "remove", "checkToggle");

			this.model.bind('change', this.render);
			this.model.bind('remove', this.remove);
			return this.render();
		},

		render: function() {
			var self = this;

			$(this.el).html("<li class='checkpoint-label'>"
								+ "<div class='removeCheckpointBtn'><i class='icon-remove' style='display: none'></i></div>"
								+ "<div class='orderbox'></div>"
								+ "<div class='checkbox'><i class='icon-ok'></i></div>"
								+ "<div class='checkpoint-text'>"
									+ self.model.get('title') + '<br>'
									+ self.model.get('description')
								+ "</div>"
							+ "</li>");

			$(this.el).hide().fadeIn(100);

			return this;
		},

		unrender: function() {},

		checkToggle: function() {
			var self = this;
			if (self.model.get("complete") === 0) {
				self.model.set({ complete: 1 });
				/*$(self.el).css({
					"height": "48%",
					"width": "8.8%",
					"padding": "none",
				});*/
			} else {
				self.model.set({ complete: 0 })
				/*$(self.el).css({
					"padding": "2px 3.5px",
					"height": "none",
					"width": "none",
				});*/
			}

			$('i', self.el).toggle();
		},

		removeCheckpoint: function() {
			this.remove();
		},

		remove: function() {
			var self = this;
			var mypos = app.appView.checkpointList.checkpointViews.indexOf(this);
			app.appView.checkpointList.checkpointViews.splice( mypos, 1 );
		  	this.model.destroy();
		  	$(this.el).remove();
		}
	});
})();