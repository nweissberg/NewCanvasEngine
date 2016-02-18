// Input Vars
var cursorInitY         = 0;
var cursorInitX         = 0;
var cursorY             = 0;
var cursorX             = 0;
var cursorHoverY        = 0;
var cursorHoverX        = 0;
var cursorDistanceY     = 0;
var cursorDistanceX     = 0;
var isTouchStart        = false;
var touchCount          = 0;
var touchTime           = 0.0;
var touchMoved          = false;
var lastTouch           = 0;
var pintchDistance      = 0;
var startPintchDistance = 0;
var startDrag           = undefined;
var pageScale           = 0;
var tapCount            = 0;
var setTapInterval;
var touchState          = 0;
var scrollDelta         = 0.0;
var isCaps              = false;
var isUppercase         = false;
var str                 = -1;
var asd;
var posCurOld           = [0,0];
var keyArray			= {};

// Loader vars
var imagePaths = [['./media/images/TileExemple','.png',1],['./media/images/backGround','.jpg',1]];
var doneLoadingImages = false;
var arrayImages = new Array(0);
var maxImages = 0;
var imageLoadName = '';
var partIndex = 0;
var resetI = 0;

//Video vars;
var inPageVideoHolder;
var inVideo;
var inPageVideo = null;
var videoExtention = '.mp4';
var videoType = 'mp4'

// Canvas vars
var mainArea;
var mainCanvas;
var ctxMain;
var frontCanvas;
var ctxFront;
var UICanvas;
var ctxUI;

// Document vars
var stageWidth = window.innerWidth;
var stageHeight = window.innerHeight;
var inputText;
var userText;
var confirmReturn =  false;
var pagePosition = [0,0];

// UI Vars
var bgArea = [0, 0, stageWidth, stageHeight];
var currentImage;
var doneLoadingImages = false;
//var messageBox_0 = null;

// Engine vars
var debugArray = new Array(11);
var renderResolution = 1.0;
var maxResolution = 2.0;
var minResolution = 0.7;
var showFPS = true;
var bodiesMap = {};
var TO_RADIANS = Math.PI/180;

// Run Vars
var lastDelta = 0.0;
var delta = 0.0;
var deltaSum = 0.0;
var fps = 60;
var canStop = true;
var stopDraw = 60;//Logic Tics
var timeOutDraw = stopDraw;
var lastRenderResolution = renderResolution;
var lastCalledTime;
var fpsD;//draw
var fpsP;//physics
var lastCalledTime;

// Document vars
var landscape;
var bgArea;

// Cache Vars
var isCached = false;
var appCache = window.applicationCache;

//Browser Vars
var nAgt = navigator.userAgent;
var browserName	= navigator.appName;

// Object Vars
var messageBoxObj = null;

var keyDictionary = {
	"7":"ESC",

	"192":"~",
	"49":"1",
	"50":"2",
	"51":"3",
	"52":"4",
	"53":"5",
	"54":"6",
	"55":"7",
	"56":"8",
	"57":"9",
	"48":"0",
	"189":"-",
	"187":"=",
	"8":"DEL",

	"9":"TAB",
	"81":"Q",
	"87":"W",
	"69":"E",
	"82":"R",
	"84":"T",
	"89":"Y",
	"85":"U",
	"73":"I",
	"79":"O",
	"80":"P",
	"219":"[",
	"221":"]",
	"220":"|",

	"20":"CAPS",
	"65":"A",
	"83":"S",
	"68":"D",
	"70":"F",
	"71":"G",
	"72":"H",
	"74":"J",
	"75":"K",
	"76":"L",
	"186":";",
	"222":"'",
	"13":"RETURN",

	"16":"SHIFT",
	"90":"Z",
	"88":"X",
	"67":"C",
	"86":"V",
	"66":"B",
	"78":"N",
	"77":"M",
	"188":"<",
	"190":">",
	"191":"?",

	"17":"CONTROL",
	"18":"ALT",
	"91":"LEFTCOMMAND",
	"32":"SPACE",
	"93":"RIGHTCOMMAND",
	"37":"LEFT",
	"38":"UP",
	"40":"DOWN",
	"39":"RIGHT"
	}