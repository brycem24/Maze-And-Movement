//Abstract singleton class for storing input on a cartesian plane.
class Input {
    //PROCESSING: When an input key is pressed, save the input.
    static bindKey(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;
        
		//UP movement
        if (keyNumber == 87 || keyNumber == 38)
            Input.y = -1;
        //DOWN movement
        else if (keyNumber == 83 || keyNumber == 40)
            Input.y = 1;
		//LEFT movement (rotational)
        else if (keyNumber == 65 || keyNumber == 37)
            Input.rotation = -1;
        //RIGHT movement (rotational)
        else if (keyNumber == 68 || keyNumber == 39)
            Input.rotation = 1;
		else if (keyNumber == 32)
			console.log(player.theta);
        //NO movement
        else {
            Input.rotation = 0;
            Input.y = 0;
        }
    }

    //PROCESSING: When an input key is released, reset the input.
    static releaseKey(keyEvent) {
        var keyNumber = keyEvent.which || keyEvent.keyCode;

        //UP movement
        if (keyNumber == 87 || keyNumber == 38)
            Input.y = 0;
        //DOWN movement
        else if (keyNumber == 83 || keyNumber == 40)
            Input.y = 0;
        //LEFT movement
        if (keyNumber == 65 || keyNumber == 37)
        	Input.rotation = 0;
		//RIGHT movement
        else if (keyNumber == 68 || keyNumber == 39)
            Input.rotation = 0;
    }
}

//INITIALIZATION: Defines x,y input.
Input.y = 0;
Input.rotation = 0;
