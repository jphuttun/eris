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
	this.orders = 3; // Default orders that character have - change to json loader afterwards!
	this.energy = 25; // Default energy that character have - change to json loader afterwards!
	
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




