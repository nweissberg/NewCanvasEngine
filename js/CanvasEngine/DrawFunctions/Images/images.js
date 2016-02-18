function drawImage(canvasCtx, image, positionArea, areaImg, style, center, showArea){
	if (style == undefined){
		style = "fit";
	}
	if (typeof(areaImg) != 'object' || areaImg == undefined){
		areaImg = [0,0,image.width,image.height];
	}

	var imageX = areaImg[0];
	var imageY = areaImg[1];
	var imageW = areaImg[2];
	var imageH = areaImg[3];

	if(showArea == true){
		drawPlane(canvasCtx,[1,0,1,0.3],positionArea);
	}

	if (style == "fit"){//fit
		var ratioW = positionArea[2] / imageW;
		var ratioH = positionArea[3] / imageH;
		var ratio = ratioW < ratioH?ratioW:ratioH;
		var newImageWidth = imageW*ratio;
		var newImageHeight = imageH*ratio;
	}
	if (style == "fill"){//fill
		var newImageWidth = positionArea[2];
		var newImageHeight = positionArea[3];
	}
	if (style == "expand"){//expand
		var ratioW = positionArea[2] / imageW;
		var ratioH = positionArea[3] / imageH;
		var ratio = ratioW > ratioH?ratioW:ratioH;
		var newImageWidth = imageW*ratio;
		var newImageHeight = imageH*ratio;
	}


	var screenCenterX = (positionArea[2]/2 - newImageWidth/2);
	var screenCenterY = (positionArea[3]/2 - newImageHeight/2);

	var imagePosX = screenCenterX + positionArea[0];
	var imagePosY = screenCenterY + positionArea[1];

	var sX = 0;
	var sY = 0;

	if(imageH+imageY > image.height){
		imageY = image.height - imageH - 1;
		sY = 2;
	}else if (imageY == image.height - imageH - 1){
		sY = 1;
	}

	if(imageY < 0){
		imageY = 0;
		sY = -2;
	}else if(imageY == 0){
		sY = -1;
	}
	if(center == true){
		centerX = -(newImageWidth/2)*renderResolution;
		centerY = -(newImageHeight/2)*renderResolution;
	}else{
		centerX = 0.0;
		centerY = 0.0;
	}

	canvasCtx.save();
	canvasCtx.translate(imagePosX*renderResolution, imagePosY*renderResolution);
	canvasCtx.rotate(positionArea[4]);//* TO_RADIANS);
 	canvasCtx.drawImage(image, imageX, imageY, imageW, imageH, centerX, centerY,	newImageWidth*renderResolution, newImageHeight*renderResolution );
	canvasCtx.restore();


	return([imagePosX,imagePosY,newImageWidth,newImageHeight,ratio,screenCenterX,screenCenterY]);
}

function moveTile(arrayTilePos, maxX, MaxY, frameStep, skipLast){
	arrayTilePos[0] += frameStep;

	if(arrayTilePos[0] >= maxX){
		arrayTilePos[0] -= maxX;
		arrayTilePos[1] += 1;
	}

	if (skipLast != undefined){
		if(arrayTilePos[1] == MaxY-1 && arrayTilePos[0] >= maxX - skipLast){
			arrayTilePos[1] = 0;
			arrayTilePos[0] = 0;
		}
	}

	if(arrayTilePos[1] >= MaxY){
		arrayTilePos[1] = 0;
		arrayTilePos[0] = 0;
	}
	return(arrayTilePos);
}

function drawTile(canvasCtx, image, dimentions, tileArray, tilePos, style){
	if(style == undefined){style = 1}
	tileX = image.width / tileArray[0];
	tileY = image.height / tileArray[1];
	drawImage(canvasCtx, image, dimentions, [tileX*(tilePos[0]), tileY*(tilePos[1]), tileX, tileY], style, false);
	if(tileArray[2] > 0){
		moveTile(tilePos,tileArray[0] ,tileArray[1] ,tileArray[2] ,tileArray[3]);
	}
}

function imageBox(image, positionArea, areaImg, mode){
		this.image = image;
		this.mode = mode;

		if (this.mode == undefined){
			this.mode = 0;
		}
		if (typeof(areaImg) != 'object' || areaImg == undefined){
			areaImg = [0,0,this.image.width,this.image.height];
		}

		this.x = areaImg[0];
		this.y = areaImg[1];
		this.w = areaImg[2];
		this.h = areaImg[3];

		if (this.mode == 0){
			var ratioW = positionArea[2] / this.w;
			var ratioH = positionArea[3] / this.h;
			this.ratio = ratioW < ratioH?ratioW:ratioH;
			this.newImageWidth = this.w * this.ratio;
			this.newImageHeight = this.h * this.ratio;
		}
		if (this.mode == 1){
			this.newImageWidth = positionArea[2];
			this.newImageHeight = positionArea[3];
		}

		if (this.mode == 2){
			var ratioW = positionArea[2] / this.w;
			var ratioH = positionArea[3] / this.h;
			this.ratio = ratioW > ratioH?ratioW:ratioH;
			this.newImageWidth = this.w * this.ratio;
			this.newImageHeight = this.h * this.ratio;
		}


		this.screenCenterX = (positionArea[2]/2 - this.newImageWidth/2);
		this.screenCenterY = (positionArea[3]/2 - this.newImageHeight/2);

		this.imagePosX = this.screenCenterX + positionArea[0];
		this.imagePosY = this.screenCenterY + positionArea[1];
		this.resetPos = [this.imagePosX,this.imagePosY];
}

imageBox.prototype.draw = function(canvasCtx,showArea){

	if(showArea == true){
		drawPlane(canvasCtx,[0,0,0,0.1],[this.x,this.y,this.w,this.h]);
	}

	canvasCtx.drawImage(this.image, this.x, this.y, this.w, this.h, this.imagePosX, this.imagePosY,	this.newImageWidth, this.newImageHeight );
}

imageBox.prototype.refresh = function(positionArea, areaImg){

	if (typeof(areaImg) != 'object' || areaImg == undefined){
		areaImg = [0,0,this.image.width,this.image.height];
	}

	this.x = areaImg[0];
	this.y = areaImg[1];
	this.w = areaImg[2];
	this.h = areaImg[3];

	if (this.mode == 0){
		var ratioW = positionArea[2] / this.w;
		var ratioH = positionArea[3] / this.h;
		this.ratio = ratioW < ratioH?ratioW:ratioH;
		this.newImageWidth = this.w * this.ratio;
		this.newImageHeight = this.h * this.ratio;
	}
	if (this.mode == 1){
		this.newImageWidth = positionArea[2];
		this.newImageHeight = positionArea[3];
	}
	if (this.mode == 2){
		var ratioW = positionArea[2] / this.w;
		var ratioH = positionArea[3] / this.h;
		this.ratio = ratioW > ratioH?ratioW:ratioH;
		this.newImageWidth = this.w * this.ratio;
		this.newImageHeight = this.h * this.ratio;
	}

	this.screenCenterX = (positionArea[2]/2 - this.newImageWidth/2);
	this.screenCenterY = (positionArea[3]/2 - this.newImageHeight/2);

	this.imagePosX = this.screenCenterX + positionArea[0];
	this.imagePosY = this.screenCenterY + positionArea[1];
	this.resetPos = [this.imagePosX,this.imagePosY];
}