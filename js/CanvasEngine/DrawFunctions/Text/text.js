function drawText(canvasCtx,textColor,textString,textPosArray,fontSize,style, rotation){
	if(rotation == undefined){
		rotation = 0.0
	}
	if(style == undefined)style = "normal"
	var baseLine =	["top","hanging","middle","alphabetic","bottom"]
	var textAlign =	["left","center","right"]

	canvasCtx.fillStyle = colorCheck(textColor);
	canvasCtx.font =	style+" "+ fontSize +"px Arial";
	if (textPosArray.length == 4){
		canvasCtx.textBaseline = baseLine[textPosArray[2]];
		canvasCtx.textAlign = textAlign[textPosArray[3]];
	}else{
		canvasCtx.textBaseline = baseLine[0];
		canvasCtx.textAlign = textAlign[0];
	}
	canvasCtx.save();
	canvasCtx.translate(textPosArray[0]*renderResolution, textPosArray[1]*renderResolution);
	canvasCtx.rotate(rotation * TO_RADIANS);
	canvasCtx.fillText(textString, 0,0);

	canvasCtx.restore();


}

function drawTextBox(canvasCtx, colorArray, dimentions, text, size, style, showArea, fit){

	var textArray = text.split(" ");

	if (fit == undefined){
		fit = false;
	}

	if (showArea == true){
		drawPlane(canvasCtx,[0,0,0,0.1],dimentions,[2.1,[1,1,1,0.2]]);
	}

	if(dimentions.length < 6){
		dimentions.push(1);
		dimentions.push(0);
	}
	if(dimentions.length < 5){
		dimentions.push(1);
	}

	if(textArray.length > 1){
		text = text + " .";
	}
	var addToNextLine = 0;
	var maxCharInLine = Math.ceil(((dimentions[2])/(size/2)));
	var maxLines = Math.ceil((text.length)/maxCharInLine);
	var willFit = dimentions[3]/(size/2.1);
	//debug(ctxUI,willFit);

	if(fit == true){
		var Tsize = ((dimentions[2])/((text.length/willFit)));
		if(Tsize < size){ size = Tsize}
		maxCharInLine = Math.ceil(((dimentions[2])/(size/2)));
		maxLines = Math.ceil((text.length)/maxCharInLine);
		willFit = dimentions[3]/(size/2.1);
	}

	if(dimentions[5] == 1){
		dimentions[0] += dimentions[2]/2;
	}

	for(var i = 0; i < maxLines; i ++){
		var subFromLine = 0;
		var charAtSlice = text.charAt(maxCharInLine + (maxCharInLine*i));

		if(textArray.length > 1){
			while (charAtSlice != " "){
				subFromLine += 1;
				charAtSlice = text.charAt(maxCharInLine + (maxCharInLine*i) - subFromLine);
			}
		}

		var textLine = text.slice( i*maxCharInLine + addToNextLine, maxCharInLine + (maxCharInLine*i) - subFromLine);

		drawText(canvasCtx, colorArray, textLine, [dimentions[0], dimentions[1] + (size*i), dimentions[4], dimentions[5]], size, style);

		addToNextLine = -subFromLine +1;

		if (i > willFit){
			break;
		}

	}
	return(maxLines);
}