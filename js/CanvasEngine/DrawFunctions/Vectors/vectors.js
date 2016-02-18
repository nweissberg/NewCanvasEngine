
var canvasObj = Class({
	initialize: function(x,y,w,h,color,scale,rot,canvasCtx) {
		this.x = x || 0;
		this.y = y || 0;
		this.w = w || 100;
		this.h = h || 100;
		this.color = color || "#FFF";
		this.scale = scale || 1.0;
		this.rot = rot || 0.0;
		this.canvasCtx = canvasCtx || ctxMain;
	},
	draw:function(){
		
	},
	logic:function(){
		
	},
	update:function(){
		this.logic();
		this.draw();
	},
});

function drawPlane(canvasCtx, color, x, y, w, h, rot, pivot, stroke){
	canvasCtx ? canvasCtx = canvasCtx : canvasCtx = ctxMain;
	color ? color = color : color = "#FFF";
	x ? x = x : x = 0;
	y ? y = y : y = 0;
	w ? w = w : w = 100;
	h ? h = h : h = 100;
	rot ? rot = rot : rot = 0;
	pivot ? pivot = pivot : pivot = [0.0,0.0];

	canvasCtx.save();
	canvasCtx.translate(( (x - (w*pivot[0]) )*renderResolution) + ((w*renderResolution)*pivot[0]) , ((y - (h*pivot[1]) )*renderResolution) + ((h*renderResolution)*pivot[1]) );
	canvasCtx.rotate(rot * TO_RADIANS);

	canvasCtx.beginPath();
	canvasCtx.rect( -((w*renderResolution)*pivot[0]), -((h*renderResolution)*pivot[1]), w*renderResolution, h*renderResolution);
	canvasCtx.fillStyle = colorCheck(color);
	canvasCtx.fill();
	if (stroke != undefined){
		canvasCtx.lineWidth = stroke[0];
		canvasCtx.strokeStyle = colorCheck(stroke[1]);
		canvasCtx.stroke();
	}
	canvasCtx.restore();
}

function drawCircle(canvasCtx,colorArray,dimentions,stroke){
	color = colorCheck(colorArray);
	canvasCtx.beginPath();
	canvasCtx.arc(dimentions[0]*renderResolution, dimentions[1]*renderResolution, dimentions[2]*renderResolution, 0, (Math.PI*2), true);
	canvasCtx.closePath();
	canvasCtx.fillStyle = color;
	canvasCtx.fill();
	if (stroke != undefined){
		canvasCtx.lineWidth = stroke[0]*renderResolution;
		canvasCtx.strokeStyle = colorCheck(stroke[1]);
		canvasCtx.stroke();
	}
}

function drawRoundBox(canvasCtx,colorArray,dimentions,curve,lineSize,colorStroke){
	crv = curve;
	posx = (dimentions[0]+crv)*renderResolution;
	posy = (dimentions[1])*renderResolution;
	posw = (Math.abs(dimentions[2]-(crv*2)))*renderResolution;
	posh = (Math.abs(dimentions[3]-(crv*2)))*renderResolution;

	if (colorStroke == undefined){
		Col2 = colorCheck(NXA(colorArray,0.7,3));
		Col1 = colorCheck(colorArray);
	}
	else{
		Col1 = colorCheck(colorArray);
		Col2 = colorCheck(colorStroke);
	}
	if(lineSize == undefined){
		lineSize = 0
	}

	canvasCtx.beginPath();
	canvasCtx.lineWidth = lineSize;
	canvasCtx.strokeStyle = Col2;
	canvasCtx.moveTo(posx, posy);
	canvasCtx.lineTo(posx+posw, posy);
	canvasCtx.quadraticCurveTo(posx+posw+crv, posy, posx+posw+crv, posy+crv);
	canvasCtx.lineTo(posx+posw+crv, posy+posh+crv);
	canvasCtx.quadraticCurveTo(posx+posw+crv, posy+posh+(crv*2), posx+posw, posy+posh+(crv*2));
	canvasCtx.lineTo(posx, posy+posh+(crv*2));
	canvasCtx.quadraticCurveTo(posx-crv, posy+posh+(crv*2), posx-crv, posy+posh+crv);
	canvasCtx.lineTo(posx-crv, posy+crv);
	canvasCtx.quadraticCurveTo(posx-crv, posy, posx, posy);
	canvasCtx.fillStyle = Col1;
	canvasCtx.fill();
	if(lineSize != 0){
		canvasCtx.stroke();
	}
}

function drawGradientBox(canvasCtx,colorArray,gStart,gEnd,rectDim){

	var gWidth = gStart[0] + gEnd[0];
	var gHeight = gStart[1] + gEnd[1];
	var grad = canvasCtx.createLinearGradient(gStart[0], gStart[1], gWidth, gHeight);

	for(var col = 0; col < colorArray.length; col++){
		grad.addColorStop( colorCheck(colorArray[col][0]), colorCheck(colorArray[col][1]) );
	}

	canvasCtx.fillStyle = grad;
	canvasCtx.fillRect(rectDim[0], rectDim[1], rectDim[2], rectDim[3]);
}

function drawShape(canvasCtx,color,pointArray,deslocate,scale,stroke){
	s = scale || 0;
	d = deslocate || [0,0]

	canvasCtx.beginPath();
	for(var v = 0; v < pointArray.length; v++){
		canvasCtx.lineTo(((pointArray[v][0]*s) + d[0])*renderResolution, ((pointArray[v][1]*s) + d[1])*renderResolution)
	}
	canvasCtx.closePath();
	if (stroke != undefined){
		canvasCtx.lineWidth = stroke[0];
		canvasCtx.strokeStyle = colorCheck(stroke[1]);
		canvasCtx.stroke();
	}

	canvasCtx.fillStyle = colorCheck(color);
	canvasCtx.fill();

}

function drawLine(canvasCtx,color,pointArray,size){
	canvasCtx.beginPath();
	for(var v = 0; v < pointArray.length; v++){
		canvasCtx.lineTo(pointArray[v][0]*renderResolution, pointArray[v][1]*renderResolution)
	}
	canvasCtx.closePath();
	canvasCtx.lineWidth = size;
	canvasCtx.strokeStyle = colorCheck(color);
	canvasCtx.stroke();
}

function e_drawShapeB2D(canvasCtx,obj,parent,shape,vertices,deslocate,scale,stroke){
	var poly = shape;
	s = scale || 0;
	d = deslocate || [0,0]

	canvasCtx.beginPath();

	if (parent.scale <= 0.995){
		for(var v = 0; v < vertices.length; v++){
			canvasCtx.lineTo(((vertices[v][0] *s) + d[0])*renderResolution, ((vertices[v][1]*s) + d[1])*renderResolution)
		}
	}else if (shape.m_type == b2Shape.e_circleShape) {
		for(var v = 0; v < vertices.length; v++){
			canvasCtx.lineTo(((vertices[v][0] *s) + d[0])*renderResolution, ((vertices[v][1]*s) + d[1])*renderResolution)
		}
	}else if (shape.m_type == b2Shape.e_polyShape) {
		var tV = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[0]));
		canvasCtx.moveTo(tV.x*renderResolution, tV.y*renderResolution);
		for (var i = 0; i < poly.m_vertexCount; i++) {

			poly.m_vertices[i].Set(vertices[i][0]*s, vertices[i][1]*s);
			//poly.QuickSync();


			var v = b2Math.AddVV(poly.m_position, b2Math.b2MulMV(poly.m_R, poly.m_vertices[i]));
			canvasCtx.lineTo(v.x*renderResolution, v.y*renderResolution);
		}
	}


	canvasCtx.closePath();
	canvasCtx.fillStyle = colorCheck(obj.color);
	canvasCtx.fill();
	if (stroke != undefined){
		canvasCtx.lineWidth = stroke[0];
		canvasCtx.strokeStyle = colorCheck(stroke[1]);
		canvasCtx.stroke();
	}

}