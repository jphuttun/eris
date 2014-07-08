/*

************************
** Player characters  **
************************

Initialize game


// TODO: Create player characters, which are:
// 1.) part of character array
// 2.) have list of character actions defined in charsActions.js

*/

function playerChars(playerType) { // Constructor

	// *** PUBLIC MEMBERS ***
	this.charType = playerType; // Type of character that has created

	// *** PRIVATE MEMBERS ***
	var resData; // Holding resources that have defined for Wade
 
	// Constructor called private functions
	resData = loadPlayerData(playerType);

	// *** PRIVATE FUNCTIONS ***
	function loadPlayerData(pType) {
			
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
						{ name: 'Idle_iso_s',   image: '../images/game/derrin_Idle_iso_s.png',   autoResize: true },
						{ name: 'Idle_iso_e',   image: '../images/game/derrin_Idle_iso_e.png',   autoResize: true },
						{ name: 'Idle_iso_n',   image: '../images/game/derrin_Idle_iso_n.png',   autoResize: true },
						{ name: 'Idle_iso_w',   image: '../images/game/derrin_Idle_iso_w.png',   autoResize: true },
						{ name: 'Idle_iso_se',  image: '../images/game/derrin_Idle_iso_se.png',  autoResize: true },
						{ name: 'Idle_iso_sw',  image: '../images/game/derrin_Idle_iso_sw.png',  autoResize: true },
						{ name: 'Idle_iso_ne',  image: '../images/game/derrin_Idle_iso_ne.png',  autoResize: true },
						{ name: 'Idle_iso_nw',  image: '../images/game/derrin_Idle_iso_nw.png',  autoResize: true },
						{ name: 'Walk_iso_e',   image: '../images/game/derrin_Walk_iso_e.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_n',   image: '../images/game/derrin_Walk_iso_n.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_w',   image: '../images/game/derrin_Walk_iso_w.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_s',   image: '../images/game/derrin_Walk_iso_s.png',   autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_se',  image: '../images/game/derrin_Walk_iso_se.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_sw',  image: '../images/game/derrin_Walk_iso_sw.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_ne',  image: '../images/game/derrin_Walk_iso_ne.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Walk_iso_nw',  image: '../images/game/derrin_Walk_iso_nw.png',  autoResize: true,   numCells: {x: 4, y: 2}, looping: true },
						{ name: 'Crouch_iso_ne',image: '../images/game/witch_Crouch_iso_ne.png', autoResize: true,   numCells: {x: 3, y: 3} }                 
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
						{ name: 'Idle_iso_s',   image: '../images/game/witch_Idle_iso_s.png',   autoResize: true },
						{ name: 'Idle_iso_e',   image: '../images/game/witch_Idle_iso_e.png',   autoResize: true },
						{ name: 'Idle_iso_n',   image: '../images/game/witch_Idle_iso_n.png',   autoResize: true },
						{ name: 'Idle_iso_w',   image: '../images/game/witch_Idle_iso_w.png',   autoResize: true },
						{ name: 'Idle_iso_se',  image: '../images/game/witch_Idle_iso_se.png',  autoResize: true },
						{ name: 'Idle_iso_sw',  image: '../images/game/witch_Idle_iso_sw.png',  autoResize: true },
						{ name: 'Idle_iso_ne',  image: '../images/game/witch_Idle_iso_ne.png',  autoResize: true },
						{ name: 'Idle_iso_nw',  image: '../images/game/witch_Idle_iso_nw.png',  autoResize: true },
						{ name: 'Walk_iso_e',   image: '../images/game/witch_Walk_iso_e.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
						{ name: 'Walk_iso_n',   image: '../images/game/witch_Walk_iso_n.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Walk_iso_w',   image: '../images/game/witch_Walk_iso_w.png',   autoResize: true,   numCells: {x: 4, y: 4}, looping: true },
						{ name: 'Walk_iso_s',   image: '../images/game/witch_Walk_iso_s.png',   autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Walk_iso_se',  image: '../images/game/witch_Walk_iso_se.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Walk_iso_sw',  image: '../images/game/witch_Walk_iso_sw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Walk_iso_ne',  image: '../images/game/witch_Walk_iso_ne.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Walk_iso_nw',  image: '../images/game/witch_Walk_iso_nw.png',  autoResize: true,   numCells: {x: 8, y: 2}, looping: true },
						{ name: 'Crouch_iso_ne',image: '../images/game/witch_Crouch_iso_ne.png',autoResize: true,   numCells: {x: 3, y: 3} }
					]
				},
				behaviors: IsoCharacter,
				collisionMap: [{x: 0, z: 0}]
			};
		}
		
		console.log('1--------');
		console.log(playerData);
		
		return playerData;
		
	}
	
	// *** PUBLIC FUNCTIONS ***
	this.getWadeResourceData = function() {
		
		console.log(resData);
		return resData;
		
	}
	
}  // end PlayerChars

// For Chrome Debugging
//@ sourceURL=PlayerChars.js




