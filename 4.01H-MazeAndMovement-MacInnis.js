//MAIN: Called once at the beginning of the game.
function start() {
	console.log("Game has started...");
}

//OUTPUT: Draw a strip of the screen
function drawStrip(stripIndex, projectedSliceHeight) {
		gameProperties.context.beginPath();
			gameProperties.context.moveTo(stripIndex, 50 - projectedSliceHeight / 2);
			gameProperties.context.lineTo(stripIndex, projectedSliceHeight + 50);
			gameProperties.context.closePath();
		gameProperties.context.stroke();
}

function performHorizontalCollisionCheck(theta) {
	//Record which quadrant the angle falls in.
	var angleFacesRight = theta < 90 || theta > 270 ? true : false;
	var angleFacesUp = theta > 0 && theta < 180 ? true : false;

	//The step values
	var horizontalStepY;
	var horizontalStepX;

	//Adjust the step values according to the quadrant the angle is in.
	if (angleFacesUp) {
		horizontalStepY = (gameProperties.CELL_SIZE) * -1;
		horizontalStepX = (gameProperties.CELL_SIZE / Math.tan(theta * Math.PI / 180));
	}
	else {
		horizontalStepY  = (gameProperties.CELL_SIZE);
		horizontalStepX = (gameProperties.CELL_SIZE / Math.tan(theta * Math.PI / 180)) * -1;
	}

	//Horizontal collision point
	var collision = {}
	collision.x = 0;
	collision.y = 0;
	collision.foundWall = false;

	//Find the y-coordinate of the collision point.
	if (angleFacesUp)	
		collision.y = (Math.floor(player.y / gameProperties.CELL_SIZE) * gameProperties.CELL_SIZE) - 1; 
	else
		collision.y = (Math.floor(player.y / gameProperties.CELL_SIZE) * gameProperties.CELL_SIZE) + gameProperties.CELL_SIZE;

	//Find the x-coordinate of the collision point.
	collision.x = player.x + ((player.y - collision.y) / Math.tan(theta * Math.PI / 180));

	//If there was no collision yet, keep trying.
	while (!collision.foundWall) {

		//The current collision point in terms of the map grid.
		collision.tile = { x: Math.floor(collision.x / gameProperties.CELL_SIZE),
						   y: Math.floor(collision.y / gameProperties.CELL_SIZE) };

		//If the collision point is in bounds.
		if (collision.tile.x > -1 && collision.tile.x < gameProperties.MAP_WIDTH)
			collision.validX = true;
		else
			collision.validX = false;

		if (collision.tile.y > -1 && collision.tile.y < gameProperties.MAP_HEIGHT)
			collision.validY = true;
		else
			collision.validY = false;

		//The collision is only valid if both X and Y coordinates
		//are within the screen boundaries.
		collision.isValid = collision.validX && collision.validY;

		//When the ray hits a wall, you found the collision point!
		if (collision.isValid)
			collision.foundWall = gameProperties.map[collision.tile.y][collision.tile.x] != 0;
		else
			break;

		//If the ray found a wall, stop extending the ray.
		if (collision.foundWall) {
			break;
		}

		//No wall found, so extend the ray one more step.
		collision.x += horizontalStepX;
		collision.y += horizontalStepY;
	}

	//The distance from the collision point to the player.
	collision.distance = Math.sqrt(
		Math.pow((collision.x - player.x), 2)
		+ Math.pow((collision.y - player.y),2)
	);

	return collision;
}

function performVerticalCollisionCheck(theta) {
	//Record which quadrant the angle falls in.
	var angleFacesRight = theta < 90 || theta > 270 ? true : false;
	var angleFacesUp = theta > 0 && theta < 180 ? true : false;

	//point B
	var verticalStepX;
	var verticalStepY;

	//Adjust the step values according to the quadrant the angle is in.
	if (angleFacesRight)	
		verticalStepX = gameProperties.CELL_SIZE;
	else
		verticalStepX = gameProperties.CELL_SIZE * -1;

	if (angleFacesRight)
		verticalStepY = (gameProperties.CELL_SIZE * Math.tan(theta * Math.PI / 180)) * -1;	
	else
		verticalStepY = (gameProperties.CELL_SIZE * Math.tan(theta * Math.PI / 180));

	//Vertical collision point
	var collision = {}
	collision.x = 0;
	collision.y = 0;
	collision.foundWall = false;

	//Find the x-coordinate of the collision point.
	if (angleFacesRight)
		collision.x = (Math.floor(player.x / gameProperties.CELL_SIZE) * gameProperties.CELL_SIZE) + gameProperties.CELL_SIZE;
	else
		collision.x = (Math.floor(player.x / gameProperties.CELL_SIZE) * gameProperties.CELL_SIZE) - 1;

	//Find the y-coordinate of the collision point.
	collision.y = player.y + ((player.x - collision.x) * Math.tan(theta * Math.PI / 180));

	while (!collision.foundWall) {

		//Check if A or B collided with a wall.	
		collision.tile = { x: Math.floor(collision.x / gameProperties.CELL_SIZE),
			y: Math.floor(collision.y / gameProperties.CELL_SIZE)	};	

		//If the collision point is within the boundaries of the map.
		collision.validX = collision.tile.x > -1 && collision.tile.x < gameProperties.MAP_WIDTH ? true : false;
		collision.validY = collision.tile.y > -1 && collision.tile.y < gameProperties.MAP_HEIGHT ? true : false;
		collision.isValid = collision.validX && collision.validY;

		//We found the wall!
		if (collision.isValid)
			collision.foundWall = gameProperties.map[collision.tile.y][collision.tile.x] != 0;
		else
			break;

		//Stop! We don't need to keep extending the line.
		if (collision.foundWall) {
			break;
		}	

		//We do need to extend the line!
		collision.x += verticalStepX;
		collision.y += verticalStepY;
	}

	//Calculate the distance from the player to the collision point.
	collision.distance = Math.sqrt(
		Math.pow((collision.x - player.x), 2)
		+ Math.pow((collision.y - player.y),2)
	);

	return collision;
}

function startRaycasting() {
	//Record the number of strips drawn.
	var stripIndex = 0;

	//For the full field of view of the player.
	for (var i = -30; i < 30; i += 60/160) {	
	
		//The angle we're casting the ray at.
		var theta = player.theta + i;

		if (theta > 360)
			theta -= 360;
		else if (theta < 0)
			theta += 360;

		var horizontalCollisionPoint = performHorizontalCollisionCheck(theta);
		var verticalCollisionPoint = performVerticalCollisionCheck(theta);
		
		//Get the closest collision point to us.
		var nearestPoint = verticalCollisionPoint.distance < horizontalCollisionPoint.distance ? verticalCollisionPoint : horizontalCollisionPoint;
		
		//Modify the distance to remove distortion causing a fish-eye effect.
		var correctDistance = Math.abs(nearestPoint.distance) * Math.cos(i * Math.PI / 180);

		//The height we draw the walls at.
		var projectedSliceHeight = 16 / correctDistance * 128;

		//Record that we just drew another wall-strip.
		stripIndex ++;

		//Add depth by changing the colour of vertical and horizontal collisions.
		if (nearestPoint == horizontalCollisionPoint)
			gameProperties.context.strokeStyle = "green";
		else
			gameProperties.context.strokeStyle = "#006400";

		//Draw each strip
		drawStrip(stripIndex, projectedSliceHeight);
	}	
}

//MAIN: Called every frame (at 60fps)
function tick() {
	
	//Fill the screen with a black background
	gameProperties.context.fillStyle = "black"
	
	//Refresh the screen
	gameProperties.context.fillRect(0,0, 
		gameProperties.canvas.width,
		gameProperties.canvas.height );

	//Bring the player to life.
	player.rotate();
	player.move();

	startRaycasting();
}
