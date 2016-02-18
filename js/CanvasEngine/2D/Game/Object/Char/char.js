var charClass = objectClass.extend({
	init: function(life, parent, id, background, tileI, tileJ, tileW, tileH) {
		this._super( false );
		this.life = life;
		parent != undefined ? this.parent = parent : this.parent = null;
		background instanceof Color ? this.background = background : this.background = new Color(0, 0, 0, 1);
	},
	update: function() {
		if (getKey("UP", 1)) {
			this.tileJ -= 1;
		}
		if (getKey("DOWN", 1)) {
			this.tileJ += 1;
		}
		if (getKey("RIGHT", 1)) {
			this.tileI += 1;
		}
		if (getKey("LEFT", 1)) {
			this.tileI -= 1;
		}
		this.draw();
	}
});