var objectClass = Class.extend( {
	init: function(parent, id, background, tileI, tileJ, tileW, tileH) {
		parent  != undefined ? this.parent = parent : this.parent = null;
		this.id = id;
		background instanceof Color ? this.background = background : this.background = new Color(0, 0, 0, 1);
		tileI    != undefined ? this.tileI = tileI : this.tileI = 0;
		tileJ    != undefined ? this.tileJ = tileJ : this.tileJ = 0;
		tileW    != undefined ? this.tileW = tileW : this.tileW = 1;
		tileH    != undefined ? this.tileH = tileH : this.tileH = 1;
	},
	update: function() {
		this.draw();
	},
	draw: function() {
		var pos = this.parent.tileToPixel(this.tileI, this.tileJ);
		if (this.background instanceof Color) {
			drawPlane(this.parent.canvasCtx, this.background, pos[0], pos[1], (this.parent.tileSize*this.parent.scale)*this.tileW, (this.parent.tileSize*this.parent.scale)*this.tileH);
		} else {
			// Imagem.
		}
	}
});