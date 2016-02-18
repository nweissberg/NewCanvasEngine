function mouseDown(event) {
	//event.preventDefault();
	tapCount += 1;
	setTapInterval();
	//startDrawing();
	isTouchStart = true;
	cursorInitX = event.pageX //* renderResolution
	cursorInitY = event.pageY //* renderResolution
	cursorX = event.pageX //* renderResolution
	cursorY = event.pageY //* renderResolution
	cursorDistanceX = 0;
	cursorDistanceY = 0;
	touchCount = 1;
}

function mouseMove(event) {

	if (event.pageX != cursorHoverX || event.pageY != cursorHoverY){
		refreshDraw();
	}
	cursorHoverX = event.pageX;
	cursorHoverY = event.pageY;

	if (isTouchStart == true){
		cursorX = cursorHoverX; //* renderResolution
		cursorY = cursorHoverY; //* renderResolution
		cursorDistanceX = cursorX - cursorInitX;
		cursorDistanceY = cursorY - cursorInitY;
		touchCount = 1;
	}
}

function mouseUp(event) {
	isTouchStart = false;
	//setDrawStop();
}

function MouseWheelHandler(e) {
	// cross-browser wheel delta
	refreshDraw();
	var e = window.event// || e; // old IE support
	scrollDelta = e.wheelDelta;//Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
	return false;
}

function mouseEvent(type, sx, sy, cx, cy) {
	var evt;
	var e = {
		bubbles: true,
		cancelable: (type != "mousemove"),
		view: window,
		detail: 0,
		screenX: sx,
		screenY: sy,
		clientX: cx,
		clientY: cy,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		button: 0,
		relatedTarget: undefined
	};
	if (typeof( document.createEvent ) == "function") {
		evt = document.createEvent("MouseEvents");
		evt.initMouseEvent(type,
			e.bubbles, e.cancelable, e.view, e.detail,
			e.screenX, e.screenY, e.clientX, e.clientY,
			e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
			e.button);
	} else if (document.createEventObject) {
		evt = document.createEventObject();
		for (prop in e) {
		evt[prop] = e[prop];
	}
		evt.button = { 0:1, 1:4, 2:2 }[evt.button] || evt.button;
	}
	return evt;
}