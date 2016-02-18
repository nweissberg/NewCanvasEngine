function insideVideoLoad(file,x,y,w,h){
	console.log("<-- Video load file -->")
	x ? x = (x.toString() + "px") : x = "10px";
	y ? y = (y.toString() + "px") : y = "10px";
	w ? w = (w.toString() + "px") : w = "400px";
	h ? h = (h.toString() + "px") : h = "200px";
	
	if (file != inPageVideo){
		if(file != undefined){

			// try{
			// 	inPageVideoHolder.removeChild(inVideo);
			// 	alert(file);
			// }catch(error){
			// 	pass
			// }
			inVideo = document.getElementById('inVideo');
			inPageVideo = file
			inVideo.src = "./media/videos/"+file + videoExtention;
			inVideo.type="video/"+videoType;
			//alert(inVideo.src);
			inVideo.style.visibility = "visible";
			inVideo.style.position = "absolute";
			inVideo.style.left = x;
			inVideo.style.top = y;
			inVideo.style.width = w;
			inVideo.style.height = h;
			
			touchPrevent = false;

			inVideo.controls = true;
			inVideo.autoplay = false;

			inVideo.preload = true;

			inVideo.addEventListener('ended',function(){inVideo.pause();},false);
			//inPageVideoHolder.appendChild(inVideo);
			if (file == 0){
				inVideo.addEventListener('ended',function(){
				pageNum = 1;
				storeVar("storePage",1);
				startDrawing();
				},false);
			}
			if(inVideo.readyState == 4){
				// Video is ready
				inVideo.play();
			}
		}else{
			//alert("Video undefined");
		}
	}
}
function messageBox(title,message,btnArray){
	//clearCanvas(canvasCtx);
	this.btnArray = btnArray;
	this.title = title;
	this.message = message;

	this.W = stageWidth/3;
	if(this.W>400)this.W=400;
	if(this.W<260)this.W=260;

	this.H = this.W/1.5;
	this.X = (stageWidth/2) - this.W/2;
	this.Y = (stageHeight/2)- this.H/2 - ((this.H/4)*(this.btnArray.length-1))/2;
	this.curve = (this.H/10);
	this.fontSize = this.W/15;
}
messageBox.prototype.draw = function(canvasCtx){
	var botPress = -1;

	if(messageBoxObj != null){
		clearCanvas(canvasCtx);
		drawPlane(canvasCtx,[0,0,0,0.5],bgArea);
		drawRoundBox(canvasCtx,[0,0,0,0.3],[this.X+5,this.Y+10,this.W,this.H+((this.H/4)*(this.btnArray.length-1))],this.curve);
		drawRoundBox(canvasCtx,"#EEE",[this.X,this.Y,this.W,this.H+((this.H/4)*(this.btnArray.length-1))],this.curve);
		drawTextBox(canvasCtx, "#000", [this.X+this.curve,this.Y+(this.curve/1.5),this.W-(this.curve*2),(this.H/3)-this.curve, 1, 1], this.title, this.fontSize, "bold",false,true);
		drawTextBox(canvasCtx, "#000", [this.X+this.curve,this.Y+(this.H/3),this.W-(this.curve*2),(this.H/3), 1, 1], this.message, this.fontSize*0.9, "normal",false,true);

		for (var i = 0; i < this.btnArray.length; i++) {
			var color = [0.8,0.8,0.8,1];

			var botPos = [this.X+(this.curve/8),this.Y+(this.H/1.5)+((this.H/4)*i)+(this.curve/3),this.W-(this.curve/4),(this.H/3)-this.curve];
			if(touchPlane(botPos) == true){
				if(isTouchStart == true){

					if(this.btnArray[i][1] != undefined){
						color = this.btnArray[i][1];
					}else{
						color = NXA(color,0.9,3);
					}
					drawPlane(canvasCtx, '#FFF',botPos);
				}else{
					messageBoxObj = null;
					//stopSound();
					cursorInitX = 0;
					cursorInitY = 0;
					botPress = i;
					break;
				}
			}
			drawPlane(canvasCtx, color,[botPos[0],botPos[1],botPos[2],3]);
			drawText(canvasCtx,"#0085BB",this.btnArray[i][0],[botPos[0]+(botPos[2]/2),botPos[1]+(botPos[3]/2),2,1],this.fontSize)
		}
	}
	return(botPress);

}

function drawMessageBox(canvasCtx){
	if(messageBoxObj != null){
		var boxReturn = messageBoxObj.draw(canvasCtx);
		if(boxReturn > -1){
			clearCanvas(canvasCtx);
			//debug(ctxUI,boxReturn);
		}
		return(boxReturn);
	}
}

function empty(value) {
	this.value = value
}