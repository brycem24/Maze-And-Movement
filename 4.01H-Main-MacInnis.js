//A container object that holds the program's meta data.
var gameProperties = {}

function mainProcedure() {

	//INITIALIZE THE CANVAS
	gameProperties.canvas = document.getElementById("canvasID");
	gameProperties.context = gameProperties.canvas.getContext("2d");

	//SET IMPORTANT VALUES FOR THE GAME
	gameProperties.TARGET_FPS = 60;
	gameProperties.VIRTUAL_WIDTH = 160;
	gameProperties.VIRTUAL_HEIGHT = 120;
	gameProperties.SCREEN_SCALE = 1;

	//SCALE THE SCENE FOR THE BROWSER
	gameProperties.canvas.width = gameProperties.VIRTUAL_WIDTH 
								  * gameProperties.SCREEN_SCALE
	
	gameProperties.canvas.height = gameProperties.VIRTUAL_HEIGHT
								   * gameProperties.SCREEN_SCALE

	//INITIALIZE THE MAP
	gameProperties.map = [
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
		[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,1,1,1,1,0,0,1,0,0,0,0,0,0,0,1,1,1,1,0,1],
		[1,0,0,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,1,1,1,1,1,1,1,1,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,1,1,1,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,1,0,0,1,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,1,1,1,0,0,1,1,1,1,1,1,1],
		[1,1,1,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
		[1,0,0,1,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,1],
		[1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
		[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
	];
						 
	//Get the dimensions of the 2D array
	gameProperties.MAP_WIDTH = gameProperties.map[0].length;
	gameProperties.MAP_HEIGHT = gameProperties.map.length;

	//The size of each cell when drawn
	gameProperties.CELL_SIZE = 16;

	//Call the tick function every frame	
	setInterval(tick, 1000 / gameProperties.TARGET_FPS);

	//Start the game
	start();
}

//When the window loads start the game.
window.onload = mainProcedure;

//Input handlers
window.onkeydown = Input.bindKey;
window.onkeyup = Input.releaseKey;
