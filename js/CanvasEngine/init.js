/*<----------------------------------------------------->*/
/*<-\\%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//->*/
/*<--\\ Canvas Engine Created By Nycholas Weissberg //-->*/
/*<---\\%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%//--->*/
/*<-----------------\\ Revision 1.48 //----------------->*/
/*<------------------\\ 06 Oct 2015 //------------------>*/
/*<-------------------\\%%%%%%%%%%%//------------------->*/
/*<----------------------------------------------------->*/


function initRenderLoop(){
	(function() {
		var lastTime = 0;
		var vendors = ['ms', 'moz', 'webkit', 'o'];
		for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
			window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
			window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
		}

		if (!window.requestAnimationFrame)
			window.requestAnimationFrame = function(callback, element) {
				var currTime = new Date().getTime();
				var timeToCall = Math.max(0, 16 - (currTime - lastTime));
				var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
				lastTime = currTime + timeToCall;
				return id;
			};

		if (!window.cancelAnimationFrame)
			window.cancelAnimationFrame = function(id) {
				clearTimeout(id);
			};
	}());

	(function animloop() {
		setTimeout(function() {
			requestAnimationFrame(animloop);
			logic();
		}, 1000 / fps);
	})();
	console.log("<-- Init Render Loop -->")
}

function clearCanvas(canvasObj){
	// console.log("<-- Clear Canvas -->")
	canvasObj.clearRect( 0, 0, stageWidth*renderResolution, stageHeight*renderResolution);
}

function resizeScreen(){
	console.log("<-- Resize screen -->")
	refreshDraw();
	cursorInitX 	= -1;
	cursorInitY 	= -1;
	stageWidth 		= window.innerWidth;
	stageHeight 	= window.innerHeight;

	// Very Important!!!
	mainCanvas.width 	= stageWidth 	* renderResolution;
	mainCanvas.height 	= stageHeight 	* renderResolution;
	frontCanvas.width 	= stageWidth 	* renderResolution;
	frontCanvas.height 	= stageHeight 	* renderResolution;
	UICanvas.width 		= stageWidth 	* renderResolution;
	UICanvas.height 	= stageHeight 	* renderResolution;

	if (stageWidth > stageHeight){
		landscape = true;
	}else{
		landscape = false;
	}
	bgArea = [0, 0, stageWidth, stageHeight];
}

function loadImageArray(){
	console.log("<-- Load image array -->")
	if (maxImages == 0 || maxImages == undefined){
		for(var count = 0; count < imagePaths.length; count ++){
			maxImages += imagePaths[count][2];
		}
	}

	if(arrayImages.length >= imagePaths[partIndex][2] + resetI && partIndex < imagePaths.length -1){
		resetI += imagePaths[partIndex][2];
		partIndex += 1;
	}

	if(arrayImages.length < maxImages){
		var loadImage = new Image();
		var i = arrayImages.length;

		if(imagePaths[partIndex][2] > 1){
			var imgCount = String(i - resetI + 1);
		}else{
			var imgCount = "";
		}

		if (arrayImages.length < maxImages){
			loadImage.src = imagePaths[partIndex][0] + imgCount + imagePaths[partIndex][1];

			var fullPath = String(loadImage.src);
			var lastSep = fullPath.lastIndexOf('/');

			imageLoadName = fullPath.substr(lastSep+1).replace('%20',' ');
		}

		loadImage.addEventListener('load',function(){
			arrayImages.push(loadImage);
			refreshDraw();
			//debug(ctxUI,loadImage.src);
			//startDrawing();
			//setDrawStop();

			if (arrayImages.length == maxImages){
				doneLoadingImages = true;
				//lert("Done Loading!");
			}
			loadImageArray();
		}, false);
	}
}

function drawLoader(Col1,Col2,Col3,posArray){
	console.log("<-- draw Loader -->")
	//ctxMain.fillStyle = '#222';
	//ctxMain.fillRect(0,0,stageWidth,stageHeight);

	//drawCircle(ctxMain,[0.5,0.5,0.5,0.3],[posArray[0],posArray[1],posArray[2]+5]);

	ctxUI.fillStyle = pyColor(Col1);
	//ctxUI.fillRect(0,stageHeight/2-(stageHeight/200),((stageWidth/(maxImages))*arrayImages.length),stageHeight/100);
	ctxUI.beginPath();
	ctxUI.arc(posArray[0], posArray[1], posArray[2], -Math.PI/2, ( (Math.PI*2*(arrayImages.length/maxImages))-Math.PI/2 ), false);
	ctxUI.lineTo(posArray[0], posArray[1])

	ctxUI.closePath();
	ctxUI.lineWidth = 4;
	ctxUI.strokeStyle = Col2;
	ctxUI.stroke();
	ctxUI.fill();

	drawCircle(ctxUI,Col2,[posArray[0],posArray[1],posArray[2]-5]);
	var perCent = parseInt( (arrayImages.length * 100)/(maxImages) );
	drawText(ctxUI,Col1,perCent+"%",[posArray[0],posArray[1],2,1],15,"bold");
	//drawText(ctxUI,Col3,imageLoadName,[posArray[0],posArray[1]+posArray[2]+20,2,1],12,"bold");
}

function initVideo(){
	console.log("<-- Init video -->")
	if(browserName == 'firefox' || browserName == 'opera'){
		videoExtention = '.ogv';
		videoType = 'ogg';
	}else{
		videoExtention = '.mp4';
		videoType = 'mp4';
	}
	inPageVideoHolder = getID('inPageVideoHolder');
	inVideo = getID('inVideo');
}

function initCanvas(){
	console.log("<-- Init Canvas -->")
	mainCanvas 	= getID('mainCanvas');
	frontCanvas = getID('frontCanvas');
	UICanvas 	= getID('UICanvas');
	ctxMain 	= mainCanvas.getContext('2d');
	ctxFront 	= frontCanvas.getContext('2d');
	ctxUI 		= UICanvas.getContext('2d');

	window.addEventListener('resize', resizeScreen, false);
	window.addEventListener('orientationchange', resizeScreen, false);
}

function initEvents(){
	console.log("<-- Init Events -->")
	if(isMobile.any() == null){
		document.addEventListener("mousedown", 	mouseDown, 	false);
		document.addEventListener("mousemove", 	mouseMove, 	false);
		document.addEventListener("mouseup", 	mouseUp, 	false);
	}
	document.addEventListener("touchstart", startHandler, 	false);
	document.addEventListener("touchmove", 	moveHandler, 	false);
	document.addEventListener("touchend", 	endHandler, 	false);
	document.addEventListener("mousewheel", MouseWheelHandler, false);
	document.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
	document.addEventListener("scroll",		MouseWheelHandler,	false);
	document.addEventListener('keydown',getKeyDown,false);
	document.addEventListener('keyup',getKeyUp,false);

	var imageLoader = getID('upfile');
				imageLoader.addEventListener('change', handleImage, false);

	// To enable drag and drop
	document.addEventListener("dragover", function (evt) {
		evt.preventDefault();
	}, false);

	// Handle dropped image file - only Firefox and Google Chrome
	document.addEventListener("drop", function (evt) {
		var files = evt.dataTransfer.files;
		if (files.length > 0) {
			var file = files[0];
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				// Note: addEventListener doesn't work in Google Chrome for this event
				reader.onload = function (evt) {
					img = document.createElement("img"),
					img.src = evt.target.result;
					arrayImages.push(img);
					worldMessages.push(["addImage",img]);
					refreshDraw();
				};
				reader.readAsDataURL(file);
			}
		}
		evt.preventDefault();
	}, false);
	// To enable drag and drop
	document.addEventListener("dragover", function (evt) {
		evt.preventDefault();
	}, false);
}

function removeEvents(){
	console.log("<-- Remove Events -->")
	if(isMobile.any() == null){
		document.removeEventListener("mousedown", 	mouseDown, 	false);
		document.removeEventListener("mousemove", 	mouseMove, 	false);
		document.removeEventListener("mouseup", 	mouseUp, 	false);
	}
	document.removeEventListener("touchstart", 	startHandler, 	false);
	document.removeEventListener("touchmove", 	moveHandler, 	false);
	document.removeEventListener("touchend", 	endHandler, 	false);
	document.removeEventListener("mousewheel", MouseWheelHandler, false);
	document.removeEventListener("DOMMouseScroll", MouseWheelHandler, false);
}
