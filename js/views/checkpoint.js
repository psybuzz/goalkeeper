var app = app || {};
(function() {
	//checkpoint view
	CheckpointListView = app.CheckpointListView = Backbone.View.extend({
		el: '#checkpointPane',
		checkpointViews: [],
		events: {
			'click: ',
		}

		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'remove', 'createCheckpoint', 'addCheckpoint');
			this.collection = new CheckpointList();
		}
	});
})();