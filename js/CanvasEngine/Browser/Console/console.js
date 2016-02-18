function debug(canvasCtx, displayText,clear,color){

	if(clear == true || clear == undefined){
		clearCanvas(canvasCtx);
	}

	if ( touchPlane( [0,0,stageWidth, 16*(debugArray.length + 1)] ) ){
		debugArray = [];
	}
	if (color != undefined){
		canvasCtx.fillStyle = pyColor(color);
	}else{
		drawPlane(canvasCtx,[0,0,0,0.75],[0,0,stageWidth, 16*(debugArray.length + 1),0.0,[0.5,0.5]]);
		color = [1,1,1,1];
	}

	if (displayText != undefined){
		debugArray.unshift(displayText);
	}

	if(debugArray.length > 10){
		debugArray.pop();
	}

	for(var i = debugArray.length-1; i >= 0; i --){
		if(i != 0){
			var drawColor = NXA(color,0.75,3);
		}else{
			var drawColor = color;
		}
		drawText(canvasCtx,drawColor, String(debugArray[i]),[20,(16*i),1,0],15);
	}
}