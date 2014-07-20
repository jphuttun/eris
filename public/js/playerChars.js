/*

************************
** Player characters  **
************************

Initialize game


// TODO: Create player characters, which are:
// 1.) part of character array
// 2.) have list of character actions defined in charsActions.js

*/

function playerChars(playerType, isDebugging, debugType) { // Constructor

	// *** PUBLIC MEMBERS ***
	this.charType = playerType; // Type of character that has created
	this.debugType = debugType; // Debuging type => 0 = Console logging
	this.isDebugging = isDebugging; // 1=Debugging true, 0 = false
	
	// *** PUBLIC MEMBERS - Character properties ***
	this.oaa = 3; // OrdersAndAssistance = Default orders that character have - change to json loader afterwards!
	this.energy = 25; // Default energy that character have - change to json loader afterwards!
	this.movementTimes = 0;
	this.movementUnits = 4;
	this.currentMovementUnits = 4;
	
	// *** PRIVATE MEMBERS ***
	var _resData; // Holding resources that have defined for Wade
	
	var that = this; // By convention, we create a private variable that. This is used to make the object available to teh private methods.
 
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
	// Return Wade resource data attached in character
	this.getWadeResourceData = function() {
		
		Debugger.log(_resData, this.isDebugging, this.debugType,'CharacterData - getWadeResourceData');
        
		return _resData;
	}
	
	// Check is character possible to move clicked cell and return true, if it is possible
	this.moveCharacter = function(charX, charZ, clickX, clickZ) {
		
		var tryToMove;
		
		var dX = clickX - charX;
		var dZ = clickZ - charZ;
		var dist = (dX*dX) + (dZ*dZ);
		dist = Math.pow(dist, 0.5);
		
		var currMov = this.movementTimes+1;
		
		if (this.energy < dist) {
			tryToMove = 'Not enough energy to move that distance! Your energy: '+this.energy+' and energy needed'+dist;
		} else if (currMov > this.oaa) {
			tryToMove = 'Not enough OAA:s to move! Your OAA:s '+this.oaa+' and OAA:s needed: '+currMov;
		} else if (this.currentMovementUnits < dist) {
			tryToMove = 'Not enough movement units to move that distance! Your units are: '+this.currentMovementUnits+' and units needed: '+dist;
		} else {
			this.energy = this.energy - dist;
			Debugger.log(this.energy, this.isDebugging, this.debugType, 'Energy: ');
			this.movementTimes++;
			Debugger.log(this.movementTimes, this.isDebugging, this.debugType, 'Movement Times: ');
			this.oaa = this.oaa - this.movementTimes;
			Debugger.log(this.oaa, this.isDebugging, this.debugType, 'OAA:s: ');
			this.currentMovementUnits = this.currentMovementUnits - dist;
			Debugger.log(this.currentMovementUnits, this.isDebugging, this.debugType, 'Current Movement Units: ');
			
			tryToMove = true;
		}
		
		return tryToMove;
		
	}
	
}  // end PlayerChars

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




