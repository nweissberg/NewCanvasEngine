var objectClass = Class.extend( {
	init: function(parent, id, background, colision, tileI, tileJ, tileW, tileH) {
		parent  != undefined ? this.parent = parent : this.parent = null;
		this.id = id;
		background instanceof Color ? this.background = background : this.background = new Color(0, 0, 0, 1);
		tileI    != undefined ? this.tileI = tileI : this.tileI = 0;
		tileJ    != undefined ? this.tileJ = tileJ : this.tileJ = 0;
		tileW    != undefined ? this.tileW = tileW : this.tileW = 1;
		tileH    != undefined ? this.tileH = tileH : this.tileH = 1;
		//var pos = this.parent.tileToPixel(this.tileI, this.tileJ);
		this.x = 0 
		this.y = 0 
		colision != undefined ? this.colision = colision : this.colision = false;

	},
	update: function() {

		this.draw();
		this.colisionFunc(this.colision);
	},
	draw: function() {
		var pos = this.parent.tileToPixel(this.tileI, this.tileJ);
		this.x = pos[0]
		this.y = pos[1]
		if (this.background instanceof Color) {
			drawPlane(this.parent.canvasCtx, this.background, pos[0], pos[1], (this.parent.tileSize*this.parent.scale)*this.tileW, (this.parent.tileSize*this.parent.scale)*this.tileH);
		} else {
			// Imagem.
		}
	},
	colisionFunc: function(colision) {
		if (colision) {
			var sceneObjs = this.parent.objects;
			var objPos = [this.tileI, this.tileJ];
			if (sceneObjs.length > 1) {
				for (var i = sceneObjs.length - 1; i >= 0; i--) {
					if (this.id != sceneObjs[i].id) {
						if (pointInPlane([sceneObjs[i].x, sceneObjs[i].y, (this.parent.tileSize*this.parent.scale), (this.parent.tileSize*this.parent.scale) ],this.x + (this.parent.tileSize*this.parent.scale), this.y + (this.parent.tileSize*this.parent.scale), 0)) {
							console.log("colision");
						}
					}
				}
			}
		}
	}
});