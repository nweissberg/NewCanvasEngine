function playSound(soundfile,loop) {
	if(loop == undefined)loop = false;
	var mp3 = document.createElement("audio");
	mp3.setAttribute('src', soundfile);
	//mp3.setAttribute('loop', loop);
	mp3.load();
	document.documentElement.appendChild(mp3);
	mp3.play();
}

function stopSound(){
	var mp3 = document.getElementById("audio");
	mp3.pause();
}