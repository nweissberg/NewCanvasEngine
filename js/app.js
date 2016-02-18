// Vars
var world;
var scene;
var obj1;
var obj2;
// Classes

// End Classes
function onLoadApp(){
	console.log("<-- On load app -->");
	world = new worldClass();
	scene = new sceneClass("teste");
	obj1  = new charClass(100, scene, "obj1", new Color(1,0,0,1), 2, 1);
	obj2  = new objectClass(scene, "obj2", new Color(0,0,1,1), 3, 1, 2, 2);

	world.addScene(scene);
	scene.addObject(obj1);
	scene.addObject(obj2);
}

function renderLoop(){
	clearCanvas(ctxMain);
	world.update();
}