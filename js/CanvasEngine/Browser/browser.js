/*<----------------------------------------------------\ Cache Handler /--------------------------------------------------->*/
appCache.addEventListener('cached', handleCacheEvent, false);
appCache.addEventListener('checking', handleCacheEvent, false);
appCache.addEventListener('downloading', handleCacheEvent, false);
appCache.addEventListener('error', handleCacheError, false);
appCache.addEventListener('noupdate', handleCacheEvent, false);
appCache.addEventListener('obsolete', handleCacheEvent, false);
appCache.addEventListener('progress', handleCacheEvent, false);
appCache.addEventListener('updateready', handleCacheEvent, false);

function handleCacheEvent(e) {
	switch (appCache.status) {
		case 0: // UNCACHED
			console.log('Uncached');
			isCached = false;
			appCache.update();
			break;

		case 1: // IDLE
			console.log('Idle');
			isCached = true;
			break;

		case 2: // CHECK
			console.log('Checking');
			break;

		case 3: // DOWNLOAD
			console.log('Downloading');
			break;

		case 4: // UPDATEREADY
			if (confirm('Application updated. The app must restart to continue.')) {
				window.location.reload();
				appCache.swapCache();
			}
			break;

		case 5: // DOWNLOAD
			console.log('Obsolete');
			break;

		default:
			init();
			console.log('appCache status: '+appCache.status);
	}
}

function handleCacheError(e) {
	switch(window.applicationCache.status) {
		case 0:
			console.log('Application failed to cache essential files. Please check you do not have private browsing enabled, and try again.');
			break;
		default:
			console.log('Error: cache status: '+window.applicationCache.status);
			init();
	}
}

//function handleCacheError(e){
	//alert('Error: handleCacheError called. It is OK if this is called in OFFLINE mode. If this is called while online something is wrong.');
//}

/*<--------------------------------------------------\ END Cache Handler /------------------------------------------------->*/

var isMobile = {
	Android: function() {
		return nAgt.match(/Android/i);
	},
	BlackBerry: function() {
		return nAgt.match(/BlackBerry/i);
	},
	iOS: function() {
		return nAgt.match(/iPhone|iPad|iPod/i);
	},
	Opera: function() {
		return nAgt.match(/Opera Mini/i);
	},
	Windows: function() {
		return nAgt.match(/IEMobile/i);
	},
	any: function() {
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
	}
};

function getBrowser(){
	// In Opera, the true version is after "Opera" or after "Version"
	if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
		browserName = "opera";
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "ie";
	}
	// In Chrome, the true version is after "Chrome"
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "chrome";
	}
	// In Safari, the true version is after "Safari" or after "Version"
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "safari";
	}
	// In Firefox, the true version is after "Firefox"
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "firefox";
	}
	// In most other browsers, "name/version" is at the end of userAgent
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < (verOffset=nAgt.lastIndexOf('/')) ) {
		browserName = nAgt.substring(nameOffset,verOffset);
	}
	//alert(browserName);
}

function storeVar(name, value){
	try {
		if (name != undefined){
			if (typeof(Storage) !== "undefined"){
				localStorage[name] = String(value);
			}
		}
	} catch(e) {
		debug(ctxUI,"Error "+e+".");
	}
}

function loadVar(name){
	try{
		if (name != undefined){
			if (typeof(Storage) !== "undefined"){
				return (localStorage[name]);
			}else{
				return false;
			}
		}else{
			return false;
		}
	} catch(e) {
		debug(ctxUI,"Error "+e+".");
		return false;
	}
}

function storeArray(name, value){
	try {
		if (name != undefined){
			if (typeof(Storage) !== "undefined"){
				localStorage[name] = JSON.stringify(value);
			}
		}
	} catch(e) {
		debug(ctxUI,"Error "+e+".");
	}
}

function loadArray(name){
	try{
		if (name != undefined){
			if (typeof(Storage) !== "undefined"){
				return (JSON.parse(localStorage[name]));
			}else{
				return false;
			}
		}
	} catch(e) {
		debug(ctxUI,"Error "+e+".");
		return false;
	}
}

// LZW-compress a string
function lzw_encode(s) {
		var dict = {};
		var data = (s + "").split("");
		var out = [];
		var currChar;
		var phrase = data[0];
		var code = 256;
		for (var i=1; i<data.length; i++) {
				currChar=data[i];
				if (dict[phrase + currChar] != null) {
						phrase += currChar;
				}
				else {
						out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
						dict[phrase + currChar] = code;
						code++;
						phrase=currChar;
				}
		}
		out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
		for (var i=0; i<out.length; i++) {
				out[i] = String.fromCharCode(out[i]);
		}
		return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
		var dict = {};
		var data = (s + "").split("");
		var currChar = data[0];
		var oldPhrase = currChar;
		var out = [currChar];
		var code = 256;
		var phrase;
		for (var i=1; i<data.length; i++) {
				var currCode = data[i].charCodeAt(0);
				if (currCode < 256) {
						phrase = data[i];
				}
				else {
					 phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
				}
				out.push(phrase);
				currChar = phrase.charAt(0);
				dict[code] = oldPhrase + currChar;
				code++;
				oldPhrase = phrase;
		}
		return out.join("");
}

function getBase64Image(img) {
		var canvas = document.createElement("canvas");
		canvas.width = img.width;
		canvas.height = img.height;

		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var dataURL = canvas.toDataURL("image/png");

		return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function getID(name){
	return(document.getElementById(name))
}