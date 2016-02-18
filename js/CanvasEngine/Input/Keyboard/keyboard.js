function getKey(code,state){
	ret = false
	if(keyArray[code] ==  state){
		ret = true
	}
	if(keyArray[code] == 1){
		keyArray[code] = 2
	}
	return(ret)

	//return(keyDictionary[code] in keyArray)
	//return(keyArray.contains(keyDictionary[k]))
}

function getKeyDown(e) {
	refreshDraw()
	var code = e.keyCode.toString();
	var state = 0

	if(keyDictionary[code] in keyArray == false){
		state = 1
	}
	if (keyDictionary[code] in keyArray){
		state = 2
	}

	keyArray[keyDictionary[code]] = state
	console.log(keyArray)

}

function getKeyUp(e) {
	refreshDraw()
	var code = e.keyCode.toString();

	//if(keyArray[keyDictionary[code]]){
		//state = 0

	delete keyArray[keyDictionary[code]];
	//}

	
}

function capsDetection(e) {
	refreshDraw();
	var s = String.fromCharCode(e.which);
	isCaps = isUppercase;
	isUppercase = (s.toUpperCase() === s && s.toLowerCase() !== s && !e.shiftKey);
	isCaps = isCaps && isUppercase;
	if (isUppercase && !isCaps) {
		str = 0;
	}
	else if (isCaps) {
		str = 1;
	} else {
		str = -1;
	}

	var charCode = e.which;

	if(asd != undefined){
		charCode = parseInt(asd);
	}

	var charStr = String.fromCharCode(charCode);
	console.log(charCode)
	
	if (str != -1 || e.shiftKey){
		charStr = charStr.toUpperCase();
	}else{
		charStr = charStr.toLowerCase();
	}
	if(charCode === 13){
		confirmReturn = true;
	}else{
		
		if(inputText.type == 'password'){
			chatValue = charStr;
			charStr = '\u25CF';

			if(charCode != 13 && charCode != 9 && charCode != 16){
				passCode += chatValue;
				//debug(ctxUI,passCode);
			}
		}
		if(inputText.text.length < 200){
			if(charCode != 13 && charCode != 9	&& charCode != 16){
				inputText.text += charStr;
				//userText = inputText.text
			}else{
				/*
				if(passCode != '' && passCode != undefined){
					checkUser(userText,passCode);
					//inputText.text = '';
					inputText.value = '';
					inputText.blur();//unfocus from BOX!
				}else{
					if (userText != '' || userText != undefined) {
						userWriteText('password');
					}
				}*/
			}
		}
	}

}

function userWriteText(textType, toVar, maxLen){
	

	if (inputText == undefined){
		inputText = document.createElement('input');
		inputText.value = '';
		inputText.text = '';
		inputText.type = textType;
		inputText.style.opacity = 0;
		inputText.style.position = 'absolute';
		inputText.style.top = this.yPos + 'px';
		inputText.style.left = this.xPos + 'px';
		inputText.style.width = inputText.style.height = 0;
		document.body.appendChild(inputText);
		inputText.focus();

		// NEVER TOUCH THIS!!!
		this.onkeydown = function(e2) {
			asd = e2.which;
			if(asd == '8' && isMobile.any() != null){
				capsDetection(e2);
			}
		}
		inputText.addEventListener('keypress', capsDetection);

	}
	// else{
	// 	if (inputText.type != textType){
	// 		inputText.type = textType;
	// 		if(userText == ''){
	// 			userText = undefined;
	// 		}
	// 		if(passText == ''){
	// 			passText = undefined;
	// 		}
	// 	}
	// 	if (!inputText.focus()){
	// 		inputText.text = '';
	// 		inputText.focus();

	// 	}
	// }

	if (inputText != undefined){
		if(inputText.type == 'password'){
			passText = inputText.text;
			if(passText === ''){
				passCode ='';
			}
		}else if (inputText.type == 'text'){
			userText = inputText.text;
			//toVar = userText;
		}
	}
	if(getKey("DEL")){
		console.log("teste")
		inputText.text = inputText.text.slice(0,-1);
		passCode = passCode.slice(0,-1);
	}
	console.log(inputText.text)
	return(inputText.text)
}