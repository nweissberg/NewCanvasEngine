function grayCanvas(canvasCtx,area) {
	var imageData = canvasCtx.getImageData(area[0],area[1],area[2],area[3]);
	var data = imageData.data;

	for (var i = 0, n = data.length; i < n; i += 4) {
		var grayscale = data[i]/3 + data[i+1]/3 + data[i+2]/3;
		data[i]	 = grayscale; // red
		data[i+1] = grayscale; // green
		data[i+2] = grayscale; // blue
	}
	canvasCtx.putImageData(imageData, area[0],area[1]);
}

function blurCanvas(canvasCtx) {
	var imageData = canvasCtx.getImageData(0,0, stageWidth, stageHeight);
	var data = imageData.data;

	for (br = 0; br < 4; br += 1) {
		for (var i = 0, n = data.length; i < n; i += 4) {

			iMW = 4 * stageWidth;
			iSumOpacity = iSumRed = iSumGreen = iSumBlue = 0;
			iCnt = 0;

			// data of close pixels (from all 8 surrounding pixels)
			aCloseData = [
				i - iMW - 4, i - iMW, i - iMW + 4, // top pixels
				i - 4, i + 4, // middle pixels
				i + iMW - 4, i + iMW, i + iMW + 4 // bottom pixels
			];

			// calculating Sum value of all close pixels
			for (e = 0; e < aCloseData.length; e += 1) {
				if (aCloseData[e] >= 0 && aCloseData[e] <= data.length - 3) {
					iSumOpacity += data[aCloseData[e]];
					iSumRed += data[aCloseData[e] + 1];
					iSumGreen += data[aCloseData[e] + 2];
					iSumBlue += data[aCloseData[e] + 3];
					iCnt += 1;
				}
			}

			// apply average values
			data[i] = (iSumOpacity / iCnt);
			data[i+1] = (iSumRed / iCnt);
			data[i+2] = (iSumGreen / iCnt);
			data[i+3] = (iSumBlue / iCnt);
		}
	}
	canvasCtx.drawImage(imageData, 0, 0);
}