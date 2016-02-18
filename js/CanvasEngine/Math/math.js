function checkDecimal(i){
	if (i<10) i = "0" + i;
	return i;
}

function lerp2(num1,num2,fac){
	//interpolates num1 to num2
	//Precise method which guarantees num = num1 when time = 1
	return (1 - fac) * num1 + fac * num2
}
function lerpCor(cor1,cor2,fac){
	return ((cor1.multiply(1 - fac)).add(cor2.multiply(fac)));
}
function lerp(num1,num2,time){
	if (Math.abs((Math.abs(num2) - Math.abs(num1))) < 1/time){
		return (num2);
	}else{
		return (num1 + (num2 - num1) * time);
	}
}

function NXA(array,num,exept){
	copyArray = array.slice();

	for(var i = 0; i < copyArray.length; i++){
		if (exept != undefined){
			if (i != exept){
				copyArray[i] = copyArray[i]*num;
			}
		}else{
			copyArray[i] = copyArray[i]*num;
		}
	}
	return copyArray;
}

function lineDistance( point1, point2 ){
	var xs = 0;
	var ys = 0;

	xs = point2[0] - point1[0];
	xs = xs * xs;

	ys = point2[1] - point1[1];
	ys = ys * ys;

	return Math.sqrt( xs + ys );
}

function moveToBack( array, index ) {
	if (index < array.length-1){
		array.push( array.splice( index, 1 )[0] );
		return (array.slice());
	}
}

function moveToFront( array, index ) {
	if (index > 0){
		array.unshift( array.splice( index, 1 )[0] );
		return (array.slice());
	}
}

function contains(obj, array) {
	for (var i = 0; i < array.length; i++) {
		if (array[i] === obj) {
			return true;
			break;
		}
	}
	return false;
}

function gpn(num){//get num pos neg
	if(num > 0){
		return 1;
	}else if(num < 0){
		return -1;
	}else{
		return 0;
	}
}

function isIn(num,rangeMin,rangeMax){
	if(num>=rangeMin && num<=rangeMax){
		return true;
	}
	return false;
}

Array.prototype.contains = function(string,indexInArray,returnObject, objIndex) {
	//indexInArray is used if the items in the Array are Arrays as well

	var i = this.length;
	if (indexInArray == undefined){
		while (i--) {
			if (this[i] === string) {
				return true;
			}
		}
	}else if(returnObject == true){
		while (i--) {
			if (this[i][indexInArray] === string) {
				return this[i][objIndex];
			}
		}
	}else{
		while (i--) {
			if (this[i][indexInArray] === string) {
				return true;
			}
		}
	}

	return false;
}

function vec2D(x, y) {
	this.x = x;
	this.y = y;
	return([this.x,this.y])
}

vec2D.prototype.add = function(v) {
	return new vec2D(this.x + v.x, this.y + v.y);
}

vec2D.prototype.subtract = function(v) {
	return new vec2D(this.x - v.x, this.y - v.y);
}

vec2D.prototype.scale = function(v) {
	return new vec2D(this.x * v, this.y * v);
}

vec2D.prototype.length = function() {
	return Math.sqrt((this.x * this.x) + (this.y * this.y));
}

vec2D.prototype.normalize = function() {
	var iLen = 1 / this.length();
	return new vec2D(this.x * iLen, this.y * iLen);
}

function Vector(x, y, z) {
	this.x = x || 0;
	this.y = y || 0;
	this.z = z || 0;
}

Vector.prototype = {
	negative: function() {
		return new Vector(-this.x, -this.y, -this.z);
	},
	add: function(v) {
		if (v instanceof Vector) return new Vector(this.x + v.x, this.y + v.y, this.z + v.z);
		else return new Vector(this.x + v, this.y + v, this.z + v);
	},
	subtract: function(v) {
		if (v instanceof Vector) return new Vector(this.x - v.x, this.y - v.y, this.z - v.z);
		else return new Vector(this.x - v, this.y - v, this.z - v);
	},
	multiply: function(v) {
		if (v instanceof Vector) return new Vector(this.x * v.x, this.y * v.y, this.z * v.z);
		else return new Vector(this.x * v, this.y * v, this.z * v);
	},
	divide: function(v) {
		if (v instanceof Vector) return new Vector(this.x / v.x, this.y / v.y, this.z / v.z);
		else return new Vector(this.x / v, this.y / v, this.z / v);
	},
	equals: function(v) {
		return this.x == v.x && this.y == v.y && this.z == v.z;
	},
	dot: function(v) {
		return this.x * v.x + this.y * v.y + this.z * v.z;
	},
	cross: function(v) {
		return new Vector(
			this.y * v.z - this.z * v.y,
			this.z * v.x - this.x * v.z,
			this.x * v.y - this.y * v.x
		);
	},
	length: function() {
		return Math.sqrt(this.dot(this));
	},
	unit: function() {
		return this.divide(this.length());
	},
	min: function() {
		return Math.min(Math.min(this.x, this.y), this.z);
	},
	max: function() {
		return Math.max(Math.max(this.x, this.y), this.z);
	},
	toAngles: function() {
		return {
			theta: Math.atan2(this.z, this.x),
			phi: Math.asin(this.y / this.length())
		};
	},
	angleTo: function(a) {
		return Math.acos(this.dot(a) / (this.length() * a.length()));
	},
	toArray: function(n) {
		return [this.x, this.y, this.z].slice(0, n || 3);
	},
	clone: function() {
		return new Vector(this.x, this.y, this.z);
	},
	init: function(x, y, z) {
		this.x = x; this.y = y; this.z = z;
		return this;
	}
};

Vector.negative = function(a, b) {
	b.x = -a.x; b.y = -a.y; b.z = -a.z;
	return b;
};
Vector.add = function(a, b, c) {
	if (b instanceof Vector) { c.x = a.x + b.x; c.y = a.y + b.y; c.z = a.z + b.z; }
	else { c.x = a.x + b; c.y = a.y + b; c.z = a.z + b; }
	return c;
};
Vector.subtract = function(a, b, c) {
	if (b instanceof Vector) { c.x = a.x - b.x; c.y = a.y - b.y; c.z = a.z - b.z; }
	else { c.x = a.x - b; c.y = a.y - b; c.z = a.z - b; }
	return c;
};
Vector.multiply = function(a, b, c) {
	if (b instanceof Vector) { c.x = a.x * b.x; c.y = a.y * b.y; c.z = a.z * b.z; }
	else { c.x = a.x * b; c.y = a.y * b; c.z = a.z * b; }
	return c;
};
Vector.divide = function(a, b, c) {
	if (b instanceof Vector) { c.x = a.x / b.x; c.y = a.y / b.y; c.z = a.z / b.z; }
	else { c.x = a.x / b; c.y = a.y / b; c.z = a.z / b; }
	return c;
};
Vector.cross = function(a, b, c) {
	c.x = a.y * b.z - a.z * b.y;
	c.y = a.z * b.x - a.x * b.z;
	c.z = a.x * b.y - a.y * b.x;
	return c;
};
Vector.unit = function(a, b) {
	var length = a.length();
	b.x = a.x / length;
	b.y = a.y / length;
	b.z = a.z / length;
	return b;
};
Vector.fromAngles = function(theta, phi) {
	return new Vector(Math.cos(theta) * Math.cos(phi), Math.sin(phi), Math.sin(theta) * Math.cos(phi));
};
Vector.randomDirection = function() {
	return Vector.fromAngles(Math.random() * Math.PI * 2, Math.asin(Math.random() * 2 - 1));
};
Vector.min = function(a, b) {
	return new Vector(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
};
Vector.max = function(a, b) {
	return new Vector(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
};
Vector.lerp = function(a, b, fraction) {
	return b.subtract(a).multiply(fraction).add(a);
};
Vector.fromArray = function(a) {
	return new Vector(a[0], a[1], a[2]);
};
Vector.angleBetween = function(a, b) {
	return a.angleTo(b);
};