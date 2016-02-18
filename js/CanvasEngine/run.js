/*<--------------------------------------------------\ Startup Functions /------------------------------------------------->*/
window.onload = function(){
	getBrowser();
	initVideo();
	onLoadApp();
	initCanvas();
	resizeScreen();
	initEvents();
	loadImageArray();
	initRenderLoop();
}

function logic(){
	if(!lastCalledTime) {
		lastCalledTime = Date.now();
		fpsD = 0;
		fpsP = 0;
		return;
	}
	delta = (new Date().getTime() - lastCalledTime)/1000;
	var difDelta = Math.abs(lastDelta - delta);
	//if
	lastDelta = delta;

	lastCalledTime = Date.now();
	if(deltaSum >= 0.01){
		fpsD = Math.ceil( ( (1/delta) * 0.1) ) * 10;
		deltaSum = 0.0;

	}
	if(difDelta < fpsD/1000 || difDelta > fpsD/500){
		deltaSum += difDelta;
		//fpsD = Math.ceil(1/delta);
		//deltaSum = 0.0;

	}

	if(isTouchStart == true){
		if(touchState == 0){
			touchState = 1;
		}else if(touchState == 1){
			touchState = 2;
		}
	}else{
		if(touchState == 2){
			touchState = 3;
		}else if(touchState == 3){
			touchState = 0;
		}
	}

	if(Math.abs(fpsP - fpsD) > 5){
		fpsP = fpsD;
	}

	if(fpsP < 20 + renderResolution*10 && renderResolution > minResolution){
		lastRenderResolution -= 0.025;
	}
	if ((fpsP > 30 - renderResolution*10 && renderResolution < 1.0) || (fpsP > 50 - renderResolution*10 && renderResolution < maxResolution)){
		lastRenderResolution += 0.025;
	}
	lastRenderResolution = Math.ceil(lastRenderResolution*10)/10;

	if(lastRenderResolution != lastRenderResolution){
		renderResolution = lastRenderResolution;
		resizeScreen();
	}

	//console.log(fpsD);

	//debug(ctxUI,timeOutDraw);
	fpsP = Math.ceil(fpsP*0.666)

	if(touchState != 0){
		touchTime += fpsD/30;
	}else{
		touchTime = 0.0;
	}

	if(canStop){
		timeOutDraw -= 1;
	}

	if(timeOutDraw > 0){

		if(showFPS){
			clearCanvas(ctxUI);

			drawText(ctxUI,new Color(0.5,0.5,0.5,1),fpsD + " FPS || " + fpsP + " TPS || " +Math.round(renderResolution*100) + "% || " + Math.round(deltaSum*1000) + " Delta || Cached " + isCached,[stageWidth/2,stageHeight-15,2,1],12*renderResolution,"bold")
		}
		renderLoop();
	}
	if(isTouchStart == true){
		refreshDraw()
	}
}

function refreshDraw(){
	timeOutDraw = stopDraw;
}
/*<-----------------------------------------------------\ END Startup /---------------------------------------------------->*/