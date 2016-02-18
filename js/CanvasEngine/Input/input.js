function touchPlane(a,bleed){
	if (bleed == undefined){
		bleed = 4;
	}
	if (a != undefined && touchCount == 1){
		if (cursorInitX >= a[0] - bleed && cursorInitY >= a[1] - bleed && cursorInitX <= a[2]+a[0] + bleed*2 && cursorInitY <= a[3]+a[1] + bleed*2){
			if (cursorX >= a[0] - bleed && cursorY >= a[1] - bleed && cursorX <= a[2]+a[0] + bleed*2 && cursorY <= a[3]+a[1] + bleed*2){
				return(true);
			}else{
				return(false);
			}
		}else{
			return(false);
		}
	}else{
		return(false);
	}
}

function touchCircle(a,bleed){
	if (bleed == undefined){
		var bleed = 4;
	}
	var dx = a[0] - cursorX;
	var dy = a[1] - cursorY;

	return(dx*dx + dy*dy < (a[2]+bleed)*(a[2]+bleed));
}

function setTapInterval(){
	tapInterval = setTimeout(resetTapCount,500);
}

function resetTapCount(){
	clearTimeout(tapInterval);
	tapCount = 0;
}

// Fix simulate event
function simulateClick(name) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window,
		0, 0, 0, 0, 0, false, false, false, false, 0, null);
	var cb = document.getElementById(name);
	//cb.focus();
	var canceled = cb.dispatchEvent(evt);
	if(canceled) {
		// A handler called preventDefault
		alert("canceled");
	}
}

function dispatchEvent (el, evt) {
	if (el.dispatchEvent) {
		el.dispatchEvent(evt);
	} else if (el.fireEvent) {
		el.fireEvent('on' + type, evt);
	}
	return evt;
}

function pointInPlane(a,_x,_y,bleed){
	if (bleed == undefined){
		bleed = 0;
	}
	if (a != undefined){
		if (_x >= a[0] - (bleed*renderResolution) && _y >= a[1] - (bleed*renderResolution) && _x <= a[2]+a[0] + (bleed*renderResolution)*2 && _y <= a[3]+a[1] + (bleed*renderResolution)*2){
			return(true);
		}else{
			return(false);
		}
	}else{
		return(false);
	}
}

function getCursorSpeed(){
	var dX = (cursorX - posCurOld[0]);
	var dY = (cursorY - posCurOld[1]);
	posCurOld[0] = cursorX;
	posCurOld[1] = cursorY;
	return([dX,dY]);
}