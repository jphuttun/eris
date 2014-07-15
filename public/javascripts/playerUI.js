/*

************************
** Player characters  **
************************

Initialize game


// TODO: Create player characters, which are:
// 1.) part of character array
// 2.) have list of character actions defined in charsActions.js

*/

function playerUI(isDebugging, debugType) { // Constructor

	// *** PUBLIC MEMBERS ***
	this.debugT = debugType; // Debuging type => 0 = Console logging
	this.isD = isDebugging; // 1=Debugging true, 0 = false 
	
	self = this;
	
		// create UI-button
	this.UIbutton = new SceneObject(new Sprite('../images/game/emptyIcon.jpg', 3),0,100,100);
	this.UIbutton2 = new SceneObject(new Sprite('../images/game/fullIcon.jpg', 3),0,100,100);
	// add image to the scene
	if (!this.UIbutton.isInScene())
	{
		wade.addSceneObject(this.UIbutton2);
		this.UIbutton2.setVisible(false);
		wade.addSceneObject(this.UIbutton);
		Debugger.log('Create: Button1', this.isD, this.debugT);
	}
	
	wade.setLayerTransform(4, 0, 0);


	this.UIbutton.onClick = function()
	{
		Debugger.log('Button1-on',self.isD, self.debugT);
		//wade.removeSceneObject(this);
		this.setVisible(false);
		self.UIbutton2.setVisible(true);
		//wade.fadeOutLayer(1,500);
		
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};

	this.UIbutton2.onClick = function()
	{
		Debugger.log('Button1-off',self.isD, self.debugT);
		this.setVisible(false);
		self.UIbutton.setVisible(true);
		
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};		
	
	// set our text object to listen for onClick events
	wade.addEventListener(this.UIbutton, 'onClick');
	wade.addEventListener(this.UIbutton2, 'onClick');
	
	// *** PRIVATE MEMBERS ***
	//var _resData; // Holding resources that have defined for Wade
	
	//var that = this; // By convention, we create a private variable that. This is used to make the object available to teh private methods.
 
	// Constructor called private functions
	//_resData = this.loadPlayerData(playerType);

	// *** PRIVATE FUNCTIONS ***
	// Use prototype functions always when it is possible - otherwise in every instance will carry separately same function codes (use a lot of memory)
	/*
	function loadPlayerData1(pType) {
			
		var playerData;
	
		return playerData;		
	}
	*/
	
	// *** PUBLIC FUNCTIONS ***
	// Return true if some UI element is clicked
	/*
	this.getisD = function() {
	
		return _isD;
	}
	*/
}  // end PlayerUI

// For Chrome Debugging
//@ sourceURL=playerUI.js




