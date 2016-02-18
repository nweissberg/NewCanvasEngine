function colorCheck(color){
	if (typeof(color) == 'string'){
		return(color)
	}else if(color instanceof Color){
		return('rgba('+Math.floor(color.r*255)+','+Math.floor(color.g*255)+','+Math.floor(color.b*255)+','+color.a+')');
	}
}


function Color(r, g, b, a) {
	this.r = r || 0.0;
	this.g = g || 0.0;
	this.b = b || 0.0;
	this.a = a || 0.0;
}

Color.prototype = {
	add: function(v) {
		if (v instanceof Color) return new Color(this.r + v.r, this.g + v.g, this.b + v.b, this.a + v.a);
		else return new Color(this.r + v, this.g + v, this.b + v, this.a + v);
	},
	subtract: function(v) {
		if (v instanceof Color) return new Color(this.r - v.r, this.g - v.g, this.b - v.b, this.a - v.a);
		else return new Color(this.r - v, this.g - v, this.b - v, this.a - v);
	},
	multiply: function(v) {
		if (v instanceof Color) return new Color(this.r * v.r, this.g * v.g, this.b * v.b, this.a * v.a);
		else return new Color(this.r * v, this.g * v, this.b * v, this.a * v);
	},
	divide: function(v) {
		if (v instanceof Color) return new Color(this.r / v.r, this.g / v.g, this.b / v.b, this.a / v.a);
		else return new Color(this.r / v, this.g / v, this.b / v, this.a / v);
	},
	equals: function(v) {
		return this.r == v.r && this.g == v.g && this.b == v.b && this.a == v.a;
	},
	toArray: function(n) {
		return [this.r, this.g, this.b, this.a].slice(0, n || 4);
	},
	clone: function() {
		return new Color(this.r, this.g, this.b, this.a);
	},
	init: function(r, g, b, a) {
		this.r = r; this.g = g; this.b = b; this.a = a;
		return this;
	}
};