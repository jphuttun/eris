/* -- charsActions.js --

T�nne on sis�llytetty toistaiseksi kaikki hahmojen osaamat Actionit yms. 

*/

CharsActions = function() {
	
};	// end charsActions

CharsActions.prototype.walkToObject = function(heroCharacter, targetObject) {
	if (heroCharacter.canMove)
	{
		heroCharacter.goToObject(targetObject);
	}
};	// end walkToObject

CharsActions.prototype.talk = function(heroCharacter, speechBubble, text, time) {
	// if we're talking already, cancel the talk timeout
	if (heroCharacter.talkTimeout)
	{
		clearTimeout(heroCharacter.talkTimeout);
	}

	// set text
	speechBubble.getSprite(1).setText(text);

	// add bubble to the scene
	if (!speechBubble.isInScene())
	{
		wade.addSceneObject(speechBubble);
	}

	// set a timeout to hide the bubble
	heroCharacter.talkTimeout = setTimeout(function()
	{
		wade.removeSceneObject(speechBubble);
		heroCharacter.talkTimeout = 0;
	}, time);
	
	return speechBubble;
}; // end talk

CharsActions.prototype.reachObjectOccurEvents = function(heroCharacter, eventData, numFlowersLeft) {

	if (eventData.object.getName() == 'cauldron')
	{
		// T�ss� kohdassa ladataan tietoa serverilt� ja l�hetet��n tietoa serverille (esim. peliobjective saavutettu ja sit�
		// vastaavat tiedot ladataan serverilt�, samalla kun l�hetet��n serverille tiedot kent�n edistymisest� tiettyyn pisteeseen)
		
		// Serveri voisi palauttaa esim. alta l�ytyv�n JSON tiedoston
		
		//   {
		//		"testString" : "We reach the object! Should we continue attack or secure this location?",
		//		"testScore" : 42
		//	}
		
		//this.serverResponse = {};
		//var dataToSend = "ReachObject�cauldron";
		//var url = 'http://www.example.com/doSomething.php?';
		//url = url + encodeURIComponent(dataToSend);
		//wade.preloadJson(url, this.serverResponse, 0, 1);
		
		//var puhuFraasi = this.serverResponse.data.testString;
		
		//witch.talk('I need to find 5 Marigold\nFlowers for my potion.\nWill you help me?#'+puhuFraasi, 4000);
		heroCharacter.talk('I need to find 5 Marigold\nFlowers for my potion.\nWill you help me?', 4000);
		heroCharacter.canMove = true;
	}
	
	if (eventData.object.isFlower)
	{
		heroCharacter.owner.playAnimation('Crouch_iso_ne', 'ping-pong');
		heroCharacter.canMove = false;

		this.particleEffect(eventData);

		setTimeout(function()
		{
			wade.iso.deleteObject(eventData.object);
		}, 300);
		
		numFlowersLeft--;
	}
	
	return numFlowersLeft;

}; // end reachObjectOccurEvents

CharsActions.prototype.particleEffect = function(eventData) {
	// show a particle effect
	var sprite = new Sprite(null, wade.iso.getObjectsLayerId());
	var animation = new Animation('images/game/sparkle.png', 8, 4, 30);
	sprite.addAnimation('sparkle', animation);
	sprite.setSize(100, 100);
	var pos = eventData.object.getPosition();
	var sparkle = new SceneObject(sprite, 0, pos.x, pos.y);
	wade.addSceneObject(sparkle);
	sparkle.playAnimation('sparkle');
	sparkle.onAnimationEnd = function()
	{
		wade.removeSceneObject(sparkle);
	};
}; // end particleEffect

CharsActions.prototype.afterAnimation = function(heroCharacter, speechBubble, numFlowersLeft, eventData) {
	if (eventData.name == 'Crouch_iso_ne')
	{
		// face south
		heroCharacter.setDirection('s');

		// if the bubble isn't near the center of the screen, move the camera
		var text = (numFlowersLeft? 'Excellent! Only ' + numFlowersLeft + '\nmore to go!' : "Great job!\nThat's all of them.\nThanks so much!");
		if (numFlowersLeft == 4)
		{
			text = 'You can pan and zoom\naround the map';
		}
		var pos = speechBubble.getPosition();
		var screenWidth = wade.getScreenWidth();
		var screenHeight = wade.getScreenHeight();
		if (Math.abs(pos.x) - screenWidth / 2 < screenWidth / 4 || Math.abs(pos.y) - screenHeight / 2 < screenHeight / 4)
		{
			pos = wade.screenPositionToWorld(wade.iso.getObjectsLayerId(), pos);
			pos.z = wade.getCameraPosition().z;
			wade.moveCamera(pos, 300);
			wade.app.onCameraMoveComplete = function()
			{
				// say something
				heroCharacter.talk(text, 3000);
				// feel free to move again
				heroCharacter.canMove = true;
			};
		}
		else
		{
			// say something
			heroCharacter.talk(text, 3000);
			// feel free to move again
			heroCharacter.canMove = true;
		}
	}
}; // end afterAnimation
// For Chrome Debugging
//@ sourceURL=charsActions.js