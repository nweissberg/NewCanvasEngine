function ajaxObj(meth, url){
	var x = new XMLHttpRequest();
	x.open(meth, url, true);
	x.setRequestHeader("Content-type","application/x-www-form-urlencoded");
	return x;
}
function ajaxReturn (x) {
	if(x.readyState == 4 && x.status == 200){
		return true;
	}
}

function errorHandler(e) {
	var msg = '';

	switch (e.code) {
	case FileError.QUOTA_EXCEEDED_ERR:
		msg = 'QUOTA_EXCEEDED_ERR';
		break;

	case FileError.NOT_FOUND_ERR:
		msg = 'NOT_FOUND_ERR';
		break;

	case FileError.SECURITY_ERR:
		msg = 'SECURITY_ERR';
		break;

	case FileError.INVALID_MODIFICATION_ERR:
		msg = 'INVALID_MODIFICATION_ERR';
		break;

	case FileError.INVALID_STATE_ERR:
		msg = 'INVALID_STATE_ERR';
		break;

	default:
		msg = 'Unknown Error';
		break;

	};

	console.log('Error: ' + msg);
}