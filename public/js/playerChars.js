/*

************************
** Player characters  **
************************

Initialize game


// TODO: Create player characters, which are:
// 1.) instance of character array
// 2.) have list of character actions defined in charsActions.js

*/

function playerChars(playerType, isDebugging, debugType) { // Constructor

	// *** PUBLIC MEMBERS ***
	this.charType = playerType; // Type of character that has created
	this.debugType = debugType; // Debuging type => 0 = Console logging
	this.isDebugging = isDebugging; // 1=Debugging true, 0 = false
	
	// *** PUBLIC MEMBERS - Character properties ***
	this.oaa = 3; // In future JSON loaded - OrdersAndAssistance = Default orders that character have - change to json loader afterwards!
	this.energy = 25; // In future JSON loaded -  Default energy that character have - change to json loader afterwards!
	this.movementTimes = 0; // How many times character have moved in his/her turn <= is used to calculate movementUnits which is reducing all the time during turn  ie. 4,2,1,1, etc. (and is refreshed to next turn)
	this.movementUnits = 4; // In future JSON loaded -  How fast character is (default movement units for character)
	this.currentMovementUnits = this.movementUnits; // Character current movement units in any time in tactical mode
	
	this.shootingAbility = 4; // In future JSON loaded - Character shooting ability
	
	this.movementFlag = false; // MovementFlag only change after clicking change action or change turn
	this.actionFlag = false;
	this.isDestroyed = 0; // Is character destroyed - 0 = not destroyed
	
	// *** PRIVATE MEMBERS ***
	var _resData; // Holding resources that have defined for Wade
	
	var self = this; // By convention, we create a private variable self. This is used to make the object available to the private methods.
 
	// Constructor called private functions
	_resData = this.loadPlayerData(playerType);

	// *** PRIVATE FUNCTIONS ***
	// Use prototype functions always when it is possible - otherwise in every instance will carry separately same function codes (use a lot of memory)
	/*
	function loadPlayerData1(pType) {
			
		var playerData;
	
		return playerData;		
	}
	*/
	
	// *** PUBLIC FUNCTIONS ***
	// --- Return Wade resource data attached in character
	this.getWadeResourceData = function() {
		
		Debugger.log(_resData, this.isDebugging, this.debugType,'CharacterData - getWadeResourceData');
        
		return _resData;
	}

}  // end PlayerChars

// --- Check is character possible to move clicked cell and return true, if it is possible
playerChars.prototype.moveCharacter = function(charX, charZ, clickX, clickZ) {
	
	var tryToMove;
	
	var dist = this.calculateDist(charX, charZ, clickX, clickZ);
	
	var currMov = this.movementTimes+1;
	
	var enterfurther = false;
	
	// Checking, is some action already made before movement
	if (this.actionFlag === false && this.movementFlag === false) {
		enterfurther = true;
	}
	if (this.actionFlag === true && this.movementFlag === true) {
		enterfurther = true;
	}
	
	if (enterfurther === false) {
		tryToMove = 'Character action is already made! Character: '+this.charType;
	} else if (this.energy < dist) {
		tryToMove = 'Not enough energy to move that distance! Your energy: '+this.energy+' and energy needed'+dist;
	} else if (currMov > this.oaa && this.movementFlag === false) {
		tryToMove = 'Not enough OAA:s to move! Your OAA:s '+this.oaa+' and OAA:s needed: '+currMov;
	} else if (this.currentMovementUnits < dist) {
		tryToMove = 'Not enough movement units to move that distance! Your units are: '+this.currentMovementUnits+' and units needed: '+dist;
	} else {
		// Moving uses energy
		this.energy = this.energy - dist;
		Debugger.log(this.energy, this.isDebugging, this.debugType, 'Energy: ');

		// With first movement, reduces OAA:s and increases movementTimes
		if (this.movementFlag === false) 
		{
			this.movementFlag = true; // Movement flag can be refreshed after actionchanged
			this.actionFlag = true;
			this.movementTimes++;
			Debugger.log(this.movementTimes, this.isDebugging, this.debugType, 'Movement Times: ');
			this.oaa = this.oaa - this.movementTimes;
			Debugger.log(this.oaa, this.isDebugging, this.debugType, 'OAA:s: ');
		}
		
		// Moving reduces currentMovementUnits
		this.currentMovementUnits = this.currentMovementUnits - dist;
		Debugger.log(this.currentMovementUnits, this.isDebugging, this.debugType, 'Current Movement Units: ');
		
		tryToMove = true;
	}
	
	return tryToMove;
	
}

//--- Change Action / change character action (but not turn) ---
playerChars.prototype.changeAction = function() {

	this.movementFlag = false; // Refresh movement
	this.actionFlag = false; // Refresh actions
	
	var lu = Math.pow(2, this.movementTimes);
	var matka = this.movementUnits / lu;
	
	if (matka < 1) {
		matka = 1;
	}
	
	// Increase current movement units
	this.currentMovementUnits = this.currentMovementUnits + matka;
	
	if (this.currentMovementUnits > this.movementUnits) {
		this.currentMovementUnits = this.movementUnits;
	}
	
	Debugger.log(matka, this.isDebugging, this.debugType, 'Added distance: '+this.charType+' : ');
	Debugger.log(this.currentMovementUnits, this.isDebugging, this.debugType, 'Current Movement Units: '+this.charType+' : ');

}

// *** shootTarget ***
// Checking is shooting possible and shoot target, if it is
// Return: true if hit, false if miss, and message, if shooting is not possible
playerChars.prototype.shootTarget = function(charX, charZ, clickX, clickZ, charind) {

	// charX = character X or basepoint X coordinate
	// charZ = character Z or basepoint Z coordinate
	// clickX = clicked cell X coordinate
	// clickZ = clicked cell Z coordinate

	var trytoshoot = false; // Result of shooting
	
	var dist = this.calculateDist(charX, charZ, clickX, clickZ);
	Debugger.log(dist, this.isDebugging, this.debugType, 'Distance: ');
	
	var diceroll = this.dice(2,6,0);
	
	var treshold = this.shootingAbility + dist;
	
	var currMov = this.movementTimes+1;		
	
	if (this.actionFlag === false) {
		if (currMov > this.oaa) {
			trytoshoot = 'Not enough OAA:s to move! Your OAA:s '+this.oaa+' and OAA:s needed: '+currMov;
		} else {
			this.movementTimes++;
			this.oaa = this.oaa - this.movementTimes;
			this.actionFlag = true;
		
			if (diceroll > treshold) {
				Debugger.log(diceroll, this.isDebugging, this.debugType, 'You hit (treshold): '+treshold);
				trytoshoot = true;
			} else {
				Debugger.log(diceroll, this.isDebugging, this.debugType, 'You miss (treshold): '+treshold);
				trytoshoot = false;
			}
		}
	} else {
		trytoshoot = 'Character action is already made! Character: chars'+charind;
	}
	
	return trytoshoot;
	
}

// *** dice ***
// --- Dice generator 
playerChars.prototype.dice = function(x, y, plus) {
	
	// Dice generator x d y + plus (ie. 2d6+1)
	var res = 0;
	
	for (var i=1; i<=x; i++) {
		res = res + Math.floor((Math.random() * y) + 1);
	}
	res = res + plus;
	
	return res;
}

// *** calculateDist ***
// --- Calculate distance between 2 cells (cell coordinates)
playerChars.prototype.calculateDist = function(charX, charZ, clickX, clickZ) {

	// charX = character X (or basepoint X) coordinate
	// charZ = character Z (or basepoint Z) coordinate
	// clickX = clicked cell X coordinate
	// clickZ = clicked cell Z coordinate

	var dX = clickX - charX;
	var dZ = clickZ - charZ;
	var dist = (dX*dX) + (dZ*dZ);
	dist = Math.pow(dist, 0.5);
	
	return dist;
};

// *** loadPlayerData ***
// --- Loading animations and properties that wade iso uses

playerChars.prototype.loadPlayerData = function(pType) {
		
	var playerData;
	
	if (pType=='derrin') {
		// create a Derrin
		playerData =
		{
			sprites:
			{
				scale: 0.57,
				offset: {y: 0.05},
				animations:
				[
					{ name: 'Idle_iso_s',   image: 'images/game/derrin_Idle_iso_s.png',   autoResize: true },
					{ name: 'Idle_iso_e',   image: 'images/game/derrin_Idle_iso_e.png',   autoResize: true },
					{ name: 'Idle_iso_n',   image: 'images/game/derrin_Idle_iso_n.png',   autoResize: true },
					{ name: 'Idle_iso_w',   image: 'images/game/derrin_Idle_iso_w.png',   autoResize: true },
					{ name: 'Idle_iso_se',  image: 'images/game/derrin_Idle_iso_se.png',  autoResize: true },
					{ name: 'Idle_iso_sw',  image: 'images/game/derrin_Idle_iso_sw.png',  autoResize: true },
					{ name: 'Idle_iso_ne',  image: 'images/game/derrin_Idle_iso_ne.png',  autoResize: true },
					{ name: 'Idle_iso_nw',  image: 'images/game/derrin_Idle_iso_nw.png',  autoResize: true },
					{ name: 'Walk_iso_e',   image: 'images/game/derrin_Walk_iso_e.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_n',   image: 'images/game/derrin_Walk_iso_n.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_w',   image: 'images/game/derrin_Walk_iso_w.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_s',   image: 'images/game/derrin_Walk_iso_s.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_se',  image: 'images/game/derrin_Walk_iso_se.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_sw',  image: 'images/game/derrin_Walk_iso_sw.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_ne',  image: 'images/game/derrin_Walk_iso_ne.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Walk_iso_nw',  image: 'images/game/derrin_Walk_iso_nw.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
					{ name: 'Crouch_iso_ne',image: 'images/game/witch_Crouch_iso_ne.png', autoResize: true,   numCells: {x: 3, y: 3} }                 
				 ]
			},
			behaviors: IsoCharacter,
			collisionMap: [{x: 0, z: 0}]
		};
	}

	if (pType=='witch') {
		// create a witch
		playerData =
       // create a witch
        {
            sprites:
            {
                scale: 0.57,
                offset: {y: 0.05},
                animations:
                [
                    { name: 'Idle_iso_s',   image: 'images/game/witch_Idle_iso_s.png',   autoResize: true },
                    { name: 'Idle_iso_e',   image: 'images/game/witch_Idle_iso_e.png',   autoResize: true },
                    { name: 'Idle_iso_n',   image: 'images/game/witch_Idle_iso_n.png',   autoResize: true },
                    { name: 'Idle_iso_w',   image: 'images/game/witch_Idle_iso_w.png',   autoResize: true },
                    { name: 'Idle_iso_se',  image: 'images/game/witch_Idle_iso_se.png',  autoResize: true },
                    { name: 'Idle_iso_sw',  image: 'images/game/witch_Idle_iso_sw.png',  autoResize: true },
                    { name: 'Idle_iso_ne',  image: 'images/game/witch_Idle_iso_ne.png',  autoResize: true },
                    { name: 'Idle_iso_nw',  image: 'images/game/witch_Idle_iso_nw.png',  autoResize: true },
                    { name: 'Walk_iso_e',   image: 'images/game/witch_Walk_iso_e.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
                    { name: 'Walk_iso_n',   image: 'images/game/witch_Walk_iso_n.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_w',   image: 'images/game/witch_Walk_iso_w.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
                    { name: 'Walk_iso_s',   image: 'images/game/witch_Walk_iso_s.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_se',  image: 'images/game/witch_Walk_iso_se.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_sw',  image: 'images/game/witch_Walk_iso_sw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_ne',  image: 'images/game/witch_Walk_iso_ne.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Walk_iso_nw',  image: 'images/game/witch_Walk_iso_nw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
                    { name: 'Crouch_iso_ne',image: 'images/game/witch_Crouch_iso_ne.png',autoResize: true,   numCells: {x: 3, y: 3} }
                ]
            },
            behaviors: IsoCharacter,
            collisionMap: [{x: 0, z: 0}]
        };
	}
	
    Debugger.log(playerData, this.isDebugging, this.debugType, 'CharacterData - loadPlayerData:');
	
	return playerData;
	
};

// For Chrome Debugging
//@ sourceURL=PlayerChars.js




