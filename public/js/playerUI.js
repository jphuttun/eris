/*

****************************
** Player User Interface  **
****************************

Initialize game


// TODO: Create player characters, which are:
// 1.) part of character array
// 2.) have list of character actions defined in charsActions.js

*/

function playerUI(characterIndex, characterData, isDebugging, debugType) { // Constructor

	// *** PUBLIC MEMBERS ***
	this.debugT = debugType; // Debuging type => 0 = Console logging
	this.isD = isDebugging; // 1=Debugging true, 0 = false 
	
	// *** PROPERTIES ***
	this.isTargeting = false; // Is UI mode targeting on?
	
	this.selectedCharacterIndex = characterIndex;
	this.characterData = characterData;
	
	var self = this;
	
	// create UI-button
		
	var uisprite = new Sprite('images/game/emptyIcon.jpg', 5);
	var uisprite2 = new Sprite('images/game/fullIcon.jpg', 5);
	
	this.UIbutton = new SceneObject(uisprite,0,wade.getScreenWidth(),wade.getScreenHeight());
	this.UIbutton2 = new SceneObject(uisprite2,0,wade.getScreenWidth(),wade.getScreenHeight());
	
	this.UIbutton.setAlignment('left', 'top');
	this.UIbutton2.setAlignment('left', 'top');
	
	var uisprite3 = new Sprite('images/game/iconOn.jpg', 5);
	var uisprite4 = new Sprite('images/game/iconOff.jpg', 5);	
	
	this.UIbutton3 = new SceneObject(uisprite3,0,wade.getScreenWidth()-256,wade.getScreenHeight());
	this.UIbutton4 = new SceneObject(uisprite4,0,wade.getScreenWidth()-256,wade.getScreenHeight());

	this.UIbutton3.setAlignment('left', 'top');
	this.UIbutton4.setAlignment('left', 'top');
	
	// create Text objects
	this.textsprite1 = new TextSprite('UI-text1', '32px Arial', 'blue', 'right',5);
    this.textobj1 = new SceneObject(this.textsprite1);
	wade.addSceneObject(this.textobj1);
	
	// add image to the scene
	if (!this.UIbutton.isInScene())
	{
		wade.addSceneObject(this.UIbutton2);
		this.UIbutton2.setVisible(false);
		wade.addSceneObject(this.UIbutton);
		Debugger.log('Create: Button1', this.isD, this.debugT);
		this.isTargeting = false;
	}
	
	// add image to the scene
	if (!this.UIbutton3.isInScene())
	{
		wade.addSceneObject(this.UIbutton4);
		this.UIbutton4.setVisible(false);
		wade.addSceneObject(this.UIbutton3);
		Debugger.log('Create: Button2', this.isD, this.debugT);
	}
	
	wade.setLayerTransform(5, 0, 0); // Set layer zooming and translating abilities => "none" that ui button do not zoom with the game area

	this.UIbutton.onClick = function()
	{
		//wade.removeSceneObject(this);
		this.setVisible(false);
		self.UIbutton2.setVisible(true);
		self.isTargeting = true;
		Debugger.log('Button1-on',self.isD, self.debugT, self.isTargeting);
		self.textsprite1.setText('Targeting is on!');
		//wade.fadeOutLayer(1,500);
		
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};

	this.UIbutton2.onClick = function()
	{
		this.setVisible(false);
		self.UIbutton.setVisible(true);
		self.isTargeting = false;
		Debugger.log('Button1-off',self.isD, self.debugT, self.isTargeting);
		self.textsprite1.setText('Targeting is off!');
	
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};		
	
	this.UIbutton3.onClick = function()
	{
		this.setVisible(false);
		self.UIbutton4.setVisible(true);
		Debugger.log('Button2-off',self.isD, self.debugT, self.isTargeting);
		self.textsprite1.setText('Change action!');
		//self.characterData[self.selectedCharacterIndex].changeAction();
		self.refreshActions();
	
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};	
	
	this.UIbutton4.onClick = function()
	{
		this.setVisible(false);
		self.UIbutton3.setVisible(true);
		Debugger.log('Button2-on',self.isD, self.debugT, self.isTargeting);
		self.textsprite1.setText('Change action!');
		//self.characterData[self.selectedCharacterIndex].changeAction();
		self.refreshActions();
	
		return true; // This stops event propagation - return true lopettaa klikkausjatkumon, sillä muuten painaisu rekisteröitäisiin myös alemmilla layereillä!
	};		
	
	// set UI object to listen for onClick events
	wade.addEventListener(this.UIbutton, 'onClick');
	wade.addEventListener(this.UIbutton2, 'onClick');
	
	wade.addEventListener(this.UIbutton3, 'onClick');
	wade.addEventListener(this.UIbutton4, 'onClick');
	
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

playerUI.prototype.refreshActions = function() {

	var i;
	
	for (i=0; i < self.characterData.length; i++) {
		self.characterData[i].changeAction();
	}

};

// For Chrome Debugging
//@ sourceURL=playerUI.js




