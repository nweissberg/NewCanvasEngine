var worldClass = Class.extend({
	init: function(canvasCtx, x, y, w, h, background) {
		this.canvasCtx ? this.canvasCtx = canvasCtx : this.canvasCtx = ctxMain;
		this.x ? this.x = x : this.x = 0;
		this.y ? this.y = y : this.y = 0;
		this.w ? this.w = w : this.w = stageWidth;
		this.h ? this.h = h : this.h = stageHeight;
		background instanceof Color ? this.background = background : this.background = new Color(0.3, 0.3, 0.3, 1);
		this.scenes = [];
		this.activeScene = null;
	},
	update: function() {
		this.draw();
	},
	draw: function() {
		if (this.background instanceof Color) {
			drawPlane(this.canvasCtx, this.background, this.x, this.y, this.w, this.h);
		}
		if (this.activeScene instanceof sceneClass) {
			this.activeScene.update();
		}
	},
	addScene: function(scene) {
		this.scenes.push(scene);
		this.activeScene = this.scenes[0];
	}
});