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
			this.checkpointViews.push(checkpointView);
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
								+ "<div class='removeCheckpointBtn'><i class='icon-remove'></i></div>"
								+ "<div class='orderbox'></div>"
								+ "<div class='checkbox'><i class='unchecked icon-ok'></i></div>"
								+ "<div class='checkpoint-text' contentEditable='true'>"
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
			//$('i', self).toggle();
			if (self.model.get("complete") === 0) {
				self.model.set({ complete: 1 });
				$(".icon-ok", self.el).removeClass("unchecked");
				$(".checkpoint-text", self.el).css({
					"text-decoration": "line-through",
					"color": "grey",
				});

			} else {
				self.model.set({ complete: 0 })
				$(".icon-ok", self.el).addClass("unchecked");
				$(".checkpoint-text", self.el).css({
					"text-decoration": "none",
					"color": "black",
				});
			}
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