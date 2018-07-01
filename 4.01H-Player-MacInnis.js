class Player {
	//INITIALIZATION: The constructor
	constructor(x,y, theta, speed, rotSpeed) {
		this.x = x;
		this.y = y;
		this.theta = theta;
		this.speed = speed;
		this.rotationSpeed = rotSpeed;
	}
	
	//PROCESSING: Move the player
	move() {
		//Move the player if there are no walls blocking them
		var simulatedXPosition = player.x 
								 + player.speed
								 * -1
								 *  Input.y 
								 *  Math.cos(player.theta * Math.PI / 180);
	
		var simulatedYPosition = player.y 
								 + player.speed
								 * Input.y
								 * Math.sin(player.theta * Math.PI / 180);

		//The player's position in the grid system.
		var simulatedPosInTileCoord = { 
			x: Math.floor(simulatedXPosition / gameProperties.CELL_SIZE),
			y: Math.floor(simulatedYPosition / gameProperties.CELL_SIZE)
		};

		//If the player wants to move to a 'walkable' tile, allow it.
		if (gameProperties.map[simulatedPosInTileCoord.y][simulatedPosInTileCoord.x] == 0) {
			player.x = simulatedXPosition;	
			player.y = simulatedYPosition;
		}
	}

	//PROCESSING: Rotate the player
	rotate() {
		//Increase the angle
		player.theta += Input.rotation * player.rotationSpeed;
		
		//Keep the players rotation between 0 and 360 degrees.
		if (player.theta > 360)
			player.theta = 0;
		else if (player.theta < 0)
			player.theta = 360;
	}
}

var player = new Player(
	16 * 2.5, //X
	16 * 2.5, //Y
	90, //Rotation
	1,1 //Speed, Rotation Speed
);
