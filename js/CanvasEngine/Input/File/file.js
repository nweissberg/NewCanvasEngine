function getFile() {
	var evObj = document.createEvent('MouseEvents');
	evObj.initMouseEvent('click', true, true, document);
	setTimeout(function(){
		document.getElementById('upfile').dispatchEvent(evObj);
	},10);
}

function handleImage(e){
		var reader = new FileReader();
		reader.onload = function(event){
				var img = new Image();
				img.onload = function(){
						// imgData = getBase64Image(img);
						arrayImages.push(img);
						worldMessages.push(["addImage",img]);
						refreshDraw();
				}
				img.src = event.target.result;
		}
		reader.readAsDataURL(e.target.files[0]);
}

function sub(obj){
	var file = obj.value;
	var fileName = file.split("\\");
	document.getElementById("yourBtn").innerHTML = fileName[fileName.length-1];
	document.myForm.submit();
	//event.preventDefault();
}