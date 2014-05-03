/* -- charsActions.js --

Tänne on sisällytetty toistaiseksi kaikki hahmojen osaamat Actionit yms. 

*/

charsActions = function() {
	
};	// end charsActions

charsActions.prototype.walkToObject = function(heroCharacter, targetObject) {
	if (heroCharacter.canMove)
	{
		heroCharacter.goToObject(targetObject);
	}
};	// end walkToObject

// For Chrome Debugging
//@ sourceURL=charsActions.js