function startHandler(event) {

	tapCount += 1;
	setTapInterval();
	//startDrawing();
	touchCount = event.touches.length;

	event.preventDefault();

	if (touchCount == 2){
		if(event.touches[0].pageY < event.touches[1].pageY){
			lastTouch = 0;
		}else{
			lastTouch = 1;
		}
	}else{
		lastTouch = touchCount-1;
	}

	cursorInitX = event.touches[lastTouch].pageX;
	cursorInitY = event.touches[lastTouch].pageY;
	cursorY = event.touches[lastTouch].pageY;
	cursorX = event.touches[lastTouch].pageX;
	cursorDistanceX = 0;
	cursorDistanceY = 0;

	if (touchCount == 2){
		var T1 = [event.touches[0].pageX, event.touches[0].pageY]
		var T2 = [event.touches[1].pageX, event.touches[1].pageY]

		startPintchDistance = lineDistance(T1,T2);
	}

	isTouchStart = true;
}

function moveHandler(event) {
	if (isTouchStart){
		// Evita que o app trave ao tentar minimizar
		if(browserName == "safari"){
			if (touchCount == 1 || touchCount >= 3){
				event.preventDefault();
			}
		}else{
			//event.preventDefault();
		}
		if (event.touches.length != touchCount){
			cursorInitX = event.touches[lastTouch].pageX;
			cursorInitY = event.touches[lastTouch].pageY;
			cursorY = event.touches[lastTouch].pageY;
			cursorX = event.touches[lastTouch].pageX;
		}

		if (touchCount == 2){
			if(event.touches[0].pageY < event.touches[1].pageY){
				lastTouch = 0;
			}else{
				lastTouch = 1;
			}

			var T1 = [event.touches[0].pageX, event.touches[0].pageY]
			var T2 = [event.touches[1].pageX, event.touches[1].pageY]

			pintchDistance = lineDistance(T1,T2);
			pageScale += (pintchDistance-startPintchDistance)/3;
			startPintchDistance = pintchDistance;


		}else{
			lastTouch = touchCount-1;
		}

		cursorDistanceY = event.touches[lastTouch].pageY - cursorInitY;
		cursorDistanceX = event.touches[lastTouch].pageX - cursorInitX;

		cursorY = event.touches[lastTouch].pageY;
		cursorX = event.touches[lastTouch].pageX;

	}
}

function endHandler(event){
	isTouchStart = false;
	//startDrawing();
	//setDrawStop();
}