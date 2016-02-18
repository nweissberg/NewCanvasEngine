var sceneClass = worldClass.extend({
	init: function(parent, title, canvasCtx) {
		this._super(true);
		this.objects = [];
		this.scale = 1;
		this.tileSize = 50;
		this.tileI = 0;
		this.tileJ = 0;
		parent  != undefined ? this.parent = parent : this.parent = null;
		title != undefined ? this.title = title : this.title = "";
		canvasCtx != undefined ? this.canvasCtx = canvasCtx : this.canvasCtx = this.parent.canvasCtx;
	},
	update: function() {
		this.draw();
	},
	draw: function() {
		for (var i = this.objects.length - 1; i >= 0; i--) {
			this.objects[i].update();
		}
	},
	addObject: function(object) {
		this.objects.push(object);
	},
	tileToPixel: function(tileI, tileJ) {
		// var maxTileW = this.w/this.tileSize;
		// var maxTileH = this.h/this.tileSize;
		var posX = tileI*this.tileSize*this.scale;
		var posY = tileJ*this.tileSize*this.scale;
		return ([posX, posY]);
	}
});